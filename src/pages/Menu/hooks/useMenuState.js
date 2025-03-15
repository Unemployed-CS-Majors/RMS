// hooks/useMenuState.js
import { useState, useEffect, useRef } from "react";
import menuService from "../../../services/menuItem.service";
import { useViewport } from "./useViewport";
import useCart from "./useCart";
import useAllergens from "./useAllergens";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../../constants/routes";

const useMenuState = () => {
    // State for menu data
    const [searchTerm, setSearchTerm] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
// Update localStorage whenever the cart is modified

    // State for item details
    const [selectedItem, setSelectedItem] = useState(null);
    const detailsRef = useRef(null);



    // Import functionality from custom hooks
    const { isMobile } = useViewport();
    const {
        cart,
        addToCart,
        removeFromCart,
        getTotal,
        getItemTotalPrice,
        showMobileCart,
        toggleMobileCart,
        goToCheckout
    } = useCart();

    const {
        allAllergens,
        setAllAllergens,
        excludedAllergens,
        setExcludedAllergens,
        showAllergenFilter,
        setShowAllergenFilter,
        toggleAllergenFilter,
        toggleAllergen,
        clearAllergenFilters,
        filterRef
    } = useAllergens();

    // Fetch menu items from the API
    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const items = await menuService.getAll();
                console.log("Menu items from API:", items);

                let allergenOptions = [];
                try {
                    const options = await menuService.getOptions();
                    allergenOptions = options.allergens.map(a => a.value) || [];
                } catch (err) {
                    console.error("Error fetching allergen options:", err);
                }

                // Transform API data to match expected format
                const transformedItems = items.map(item => ({
                    id: item.id,
                    name: item.name,
                    category: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                    price: item.price.toString(),
                    time: item.avgWaitTime ? `${item.avgWaitTime} min` : "15-20 min",
                    kcal: item.calories || "N/A",
                    image: item.imageUrl || "/placeholder-food-image.jpg",
                    allergens: item.allergens || [],
                    description: item.description || "A delicious dish prepared with the finest ingredients."
                }));

                setMenuItems(transformedItems);
                setFilteredItems(transformedItems);
                setLoading(false);

                // Extract categories once we have the menu items
                const uniqueCategories = ["All", ...new Set(transformedItems.map(item => item.category))];
                setCategories(uniqueCategories);

                // Extract all unique allergens
                const uniqueAllergens = new Set();

                // First add all from the API options if available
                allergenOptions.forEach(allergen => uniqueAllergens.add(allergen));

                // Then add any additional ones found in menu items
                transformedItems.forEach(item => {
                    if (item.allergens && Array.isArray(item.allergens)) {
                        item.allergens.forEach(allergen => {
                            uniqueAllergens.add(allergen);
                        });
                    }
                });

                setAllAllergens(Array.from(uniqueAllergens).sort());

            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("Failed to load menu items. Please try again later.");
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    // Filter items based on search, category, and excluded allergens
    useEffect(() => {
        let filtered = menuItems;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (item.time && item.time.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.allergens && item.allergens.some(allergen =>
                        allergen.toLowerCase().includes(searchTerm.toLowerCase())
                    ))
            );
        }

        // Apply category filter
        if (activeCategory !== "All") {
            filtered = filtered.filter(item => item.category === activeCategory);
        }

        // Apply allergen exclusion filter
        if (excludedAllergens.length > 0) {
            filtered = filtered.filter(item => {
                // Keep item only if it doesn't contain any excluded allergens
                return !item.allergens ||
                    !item.allergens.some(allergen => excludedAllergens.includes(allergen));
            });
        }

        setFilteredItems(filtered);
    }, [searchTerm, activeCategory, excludedAllergens, menuItems]);

    // Handle clicks outside the details modal and filter panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                setSelectedItem(null);
            }

            if (filterRef.current && !filterRef.current.contains(event.target) &&
                !event.target.closest('.filter-toggle-button')) {
                setShowAllergenFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (selectedItem || showAllergenFilter) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedItem, showAllergenFilter]);

    // Add scroll event listener for sticky searchbar
    useEffect(() => {
        const handleScroll = () => {
            const stickyElement = document.querySelector(".sticky-searchbar");
            if (stickyElement && window.scrollY > 48) {
                stickyElement.classList.add("sticky-padding");
            } else if (stickyElement) {
                stickyElement.classList.remove("sticky-padding");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Item details functions
    const openItemDetails = (item) => {
        setSelectedItem(item);
    };

    // Return all state and functions
    return {
        // Search & filtering
        searchTerm,
        setSearchTerm,
        categories,
        activeCategory,
        setActiveCategory,
        filteredItems,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        getTotal,
        getItemTotalPrice,
        goToCheckout,

        // Allergens
        allAllergens,
        excludedAllergens,
        toggleAllergen,
        clearAllergenFilters,
        showAllergenFilter,
        setShowAllergenFilter,
        toggleAllergenFilter,
        filterRef,

        // Item details
        selectedItem,
        setSelectedItem,
        openItemDetails,
        detailsRef,

        // Mobile state
        isMobile,
        showMobileCart,
        toggleMobileCart,

        // Loading state
        loading,
        error
    };
};

export default useMenuState;