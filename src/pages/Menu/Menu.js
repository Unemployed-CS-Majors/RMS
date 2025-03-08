import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import { FaRegClock, FaSearch, FaShoppingCart, FaChevronUp, FaChevronDown, FaTimes, FaFilter } from "react-icons/fa";
import { IoFlameOutline } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight, MdClose } from "react-icons/md";
import menuService from "../../services/menuItem.service";
import LoadingIndicator from "../../components/Dashboard/Loading/LoadingIndicator";

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allAllergens, setAllAllergens] = useState([]);
  const [excludedAllergens, setExcludedAllergens] = useState([]);
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);
  const detailsRef = useRef(null);
  const filterRef = useRef(null);

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

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const addToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(
          cart.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = itemId => {
    setCart(
        cart
            .map(item => (item.id === itemId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item))
            .filter(item => item.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const toggleMobileCart = () => {
    setShowMobileCart(!showMobileCart);
  };

  const getItemTotalPrice = item => {
    return (Number(item.price) * item.quantity).toFixed(2);
  };

  // Handle opening item details
  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  // Handle toggle for allergen filter
  const toggleAllergenFilter = () => {
    setShowAllergenFilter(!showAllergenFilter);
  };

  // Handle toggle for individual allergen in filter
  const toggleAllergen = (allergen) => {
    if (excludedAllergens.includes(allergen)) {
      setExcludedAllergens(excludedAllergens.filter(a => a !== allergen));
    } else {
      setExcludedAllergens([...excludedAllergens, allergen]);
    }
  };

  // Clear all allergen filters
  const clearAllergenFilters = () => {
    setExcludedAllergens([]);
  };

  // Format allergen name for display
  const formatAllergenName = (allergen) => {
    return allergen.charAt(0).toUpperCase() + allergen.slice(1);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.querySelector(".sticky-searchbar");
      if (stickyElement && window.scrollY > 48) {
        // 3rem in pixels
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

  // Display allergen information as badges
  const renderAllergens = (item, inline = false) => {
    if (!item.allergens || item.allergens.length === 0) return null;

    return (
        <div className={`allergen-badges ${inline ? 'allergen-badges-inline' : ''}`}>
          {item.allergens.map((allergen, index) => (
              <span key={index} className="allergen-badge" title={`Contains ${formatAllergenName(allergen)}`}>
          <span>{inline ? formatAllergenName(allergen) : allergen.charAt(0).toUpperCase()}</span>
        </span>
          ))}
        </div>
    );
  };

  return (
      <div className='menu-page'>
        <div
            style={{
              display: "flex",
              gap: "2rem",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 1rem",
              position: "relative",
            }}>
          <div
              className='menu-container'
              style={{
                width: !isMobile && cart.length > 0 ? "calc(100% - 350px)" : "100%",
              }}>
            <div className='sticky-searchbar'>
              <div className='searchbar-container'>
                <div className='search-input-wrapper'>
                  <FaSearch className='search-icon' />
                  <input
                      type='text'
                      placeholder='Search for food, category, or allergens...'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='food-searchbar'
                  />
                  {searchTerm && (
                      <button
                          className="clear-search-button"
                          onClick={() => setSearchTerm('')}
                          aria-label="Clear search"
                      >
                        <FaTimes />
                      </button>
                  )}
                </div>
                <button
                    className="filter-toggle-button"
                    onClick={toggleAllergenFilter}
                    aria-label="Filter by allergens"
                    data-active={showAllergenFilter}
                >
                  <FaFilter />
                  {excludedAllergens.length > 0 && (
                      <span className="filter-badge">{excludedAllergens.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Allergen Filter Panel */}
            {showAllergenFilter && (
                <div className="allergen-filter-overlay">
                  <div className="allergen-filter-panel" ref={filterRef}>
                    <div className="filter-header">
                      <h3>Exclude Allergens</h3>
                      <button className="close-button" onClick={toggleAllergenFilter}>
                        <MdClose />
                      </button>
                    </div>
                    <div className="filter-description">
                      Select allergens to exclude dishes containing them from the menu.
                    </div>
                    <div className="allergen-filter-options">
                      {allAllergens.map(allergen => (
                          <label key={allergen} className="allergen-filter-option">
                            <input
                                type="checkbox"
                                checked={excludedAllergens.includes(allergen)}
                                onChange={() => toggleAllergen(allergen)}
                            />
                            <span className="allergen-name">{formatAllergenName(allergen)}</span>
                          </label>
                      ))}
                    </div>
                    {excludedAllergens.length > 0 && (
                        <button className="clear-filters-button" onClick={clearAllergenFilters}>
                          Clear All Filters
                        </button>
                    )}
                    <div className="applied-filters-summary">
                      {excludedAllergens.length > 0 ? (
                          <span>Excluding {excludedAllergens.length} allergen{excludedAllergens.length !== 1 ? 's' : ''}</span>
                      ) : (
                          <span>No allergens excluded</span>
                      )}
                    </div>
                    <button className="apply-filters-button" onClick={toggleAllergenFilter}>
                      Apply Filters
                    </button>
                  </div>
                </div>
            )}

            <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  overflow: "auto",
                  padding: "0.5rem 0 1.5rem",
                  gap: "0.75rem",
                  scrollbarWidth: "none",
                }}>
              {categories.map(category => (
                  <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        border: "none",
                        backgroundColor: activeCategory === category ? "var(--primary)" : "var(--white)",
                        color: activeCategory === category ? "white" : "var(--text-medium)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontWeight: activeCategory === category ? "600" : "normal",
                        boxShadow: activeCategory === category ? "0 4px 10px rgba(255, 125, 5, 0.2)" : "var(--shadow-soft)",
                        transition: "var(--transition)",
                      }}>
                    {category}
                  </button>
              ))}
            </div>


            {excludedAllergens.length > 0 && (
            <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  overflow: "auto",
                  padding: "0.5rem 0 1.5rem",
                  gap: "0.75rem",
                  scrollbarWidth: "none",
                }}>
              <span>Excluding:</span>
              {excludedAllergens.map(allergen => (
                  <button
                      key={allergen}
                      onClick={() => toggleAllergen(allergen)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        border: "none",
                        backgroundColor: "var(--white)",
                        color:  "var(--text-medium)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontWeight:  "normal",
                        boxShadow:  "var(--shadow-soft)",
                        transition: "var(--transition)",
                      }}>
                    {allergen} <FaTimes  style={{padding: "0rem 0rem 0rem 0.3rem"}}/>
                  </button>
              ))}
            </div>
            )}

            <h2 className='menu-section-title'>Our Menu</h2>

            {loading ? (
                <div className="loading-container">
                  <LoadingIndicator text="Loading menu items..." />
                </div>
            ) : error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <button onClick={() => window.location.reload()} className="retry-button">
                    Try Again
                  </button>
                </div>
            ) : (
                <div className='menuItems-container'>
                  {filteredItems.length > 0 ? (
                      filteredItems.map(item => (
                          <div key={item.id} className='menu-item' onClick={() => openItemDetails(item)}>
                            <div className='item-image-container'>
                              <img
                                  src={item.image}
                                  alt={item.name}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder-food-image.jpg";
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    objectFit: "cover",
                                  }}
                              />
                            </div>
                            <div className='menu-item-content'>
                              <h3 className='menu-item-name'>{item.name}</h3>
                              <div className='menu-item-badges'>
                                <span className='menu-item-badge'>{item.category}</span>
                                {renderAllergens(item)}
                              </div>
                              <div className='menu-item-details-container'>
                                <div className='menu-item-info-container'>
                                  <div className='menu-item-info'>
                                    <FaRegClock className='info-icon' /> {item.time}
                                  </div>
                                  <div className='menu-item-info'>
                                    <IoFlameOutline className='info-icon' /> {item.kcal} kcal
                                  </div>
                                </div>
                                <div className='menu-item-btn-container'>
                                  <div className='menu-item-price'>&euro;{Number(item.price).toFixed(2)}</div>
                                  <button
                                      className='item-btn'
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent opening the details modal
                                        addToCart(item);
                                      }}
                                  >
                                    <FiPlus />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))
                  ) : (
                      <div
                          style={{
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            padding: "3rem 0",
                            color: "var(--text-light)",
                          }}>
                        No items found. Try adjusting your search or filters.
                      </div>
                  )}
                </div>
            )}
          </div>

          {/* Item Detail Modal */}
          {selectedItem && (
              <div className="item-detail-overlay" onClick={() => setSelectedItem(null)}>
                <div className="item-detail-modal" ref={detailsRef} onClick={(e) => e.stopPropagation()}>
                  <button className="close-detail-button" onClick={() => setSelectedItem(null)}>
                    <MdClose />
                  </button>

                  <div className="item-detail-content">
                    <div className="item-detail-image-container">
                      <img
                          src={selectedItem.image}
                          alt={selectedItem.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-food-image.jpg";
                          }}
                      />
                    </div>

                    <div className="item-detail-info">
                      <h2 className="item-detail-name">{selectedItem.name}</h2>

                      <div className="item-detail-category-container">
                        <span className="item-detail-category">{selectedItem.category}</span>
                        <div className="item-detail-price">&euro;{Number(selectedItem.price).toFixed(2)}</div>
                      </div>

                      <p className="item-detail-description">{selectedItem.description}</p>

                      <div className="item-detail-specifications">
                        <div className="item-detail-spec">
                          <span className="spec-label">Preparation Time</span>
                          <span className="spec-value">{selectedItem.time}</span>
                        </div>

                        <div className="item-detail-spec">
                          <span className="spec-label">Calories</span>
                          <span className="spec-value">{selectedItem.kcal} kcal</span>
                        </div>

                        <div className="item-detail-spec allergen-spec">
                          <span className="spec-label">Allergens</span>
                          <div className="spec-value">
                            {selectedItem.allergens && selectedItem.allergens.length > 0 ? (
                                renderAllergens(selectedItem, true)
                            ) : (
                                <span className="no-allergens">No allergens</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="item-detail-actions">
                        <div className="item-quantity-controls">
                          <button
                              className="quantity-control-btn minus-btn"
                              onClick={() => removeFromCart(selectedItem.id)}
                              disabled={!cart.find(item => item.id === selectedItem.id)}
                          >
                            <FiMinus />
                          </button>

                          <span className="quantity-display">
                        {cart.find(item => item.id === selectedItem.id)?.quantity || 0}
                      </span>

                          <button
                              className="quantity-control-btn plus-btn"
                              onClick={() => addToCart(selectedItem)}
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <button className="add-to-cart-btn" onClick={() => {
                          addToCart(selectedItem);
                          setSelectedItem(null);
                        }}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {!isMobile && cart.length > 0 && (
              <div className='checkout-container'>
                <div className='checkout-header-container'>
                  <FaShoppingCart className='cart-icon' />
                  <h3 className='checkout-title'>Your Order</h3>
                </div>
                <div className='ordered-items-container'>
                  {cart.map(item => (
                      <div key={item.id} className='ordered-item'>
                        <div className='ordered-item-header'>
                          <div className='ordered-name-container'>
                            <p className='ordered-name'>{item.name}</p>
                          </div>
                          <span className='ordered-item-price'>&euro;{getItemTotalPrice(item)}</span>
                        </div>
                        <div className='ordered-btn-container'>
                          <button className='quantity-btn' onClick={() => removeFromCart(item.id)}>
                            <FiMinus size={14} />
                          </button>
                          <span className='quantity-value'>{item.quantity}</span>
                          <button className='quantity-btn' onClick={() => addToCart(item)}>
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
                <div className='ordered-total-container'>
                  <span className='total-label'>Total</span>
                  <span className='total-value'>&euro;{getTotal().toFixed(2)}</span>
                </div>
                <button className='checkout-btn'>
                  Proceed to Checkout
                  <MdOutlineKeyboardArrowRight size={20} />
                </button>
              </div>
          )}

          {isMobile && cart.length > 0 && (
              <div className='mobile-cart-toggle' onClick={toggleMobileCart}>
                <div className='mobile-cart-info'>
                  <FaShoppingCart className='mobile-cart-icon' />
                  <span className='mobile-cart-total'>
                &euro;{getTotal().toFixed(2)} • {cart.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
                </div>
                <div className='mobile-cart-toggle-icon'>{showMobileCart ? <FaChevronDown /> : <FaChevronUp />}</div>
              </div>
          )}

          {isMobile && showMobileCart && (
              <div
                  className='mobile-cart-visible'
                  onClick={e => {
                    if (e.target === e.currentTarget) {
                      setShowMobileCart(false);
                    }
                  }}>
                <div className='mobile-cart-content'>
                  <div className='checkout-header-container'>
                    <FaShoppingCart className='cart-icon' />
                    <h3 className='checkout-title'>Your Order</h3>
                  </div>
                  <div className='ordered-items-container'>
                    {cart.map(item => (
                        <div key={item.id} className='ordered-item'>
                          <div className='ordered-item-header'>
                            <div className='ordered-name-container'>
                              <p className='ordered-name'>{item.name}</p>
                            </div>
                            <span className='ordered-item-price'>&euro;{getItemTotalPrice(item)}</span>
                          </div>
                          <div className='ordered-btn-container'>
                            <button className='quantity-btn' onClick={() => removeFromCart(item.id)}>
                              <FiMinus size={14} />
                            </button>
                            <span className='quantity-value'>{item.quantity}</span>
                            <button className='quantity-btn' onClick={() => addToCart(item)}>
                              <FiPlus size={14} />
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className='ordered-total-container'>
                    <span className='total-label'>Total</span>
                    <span className='total-value'>&euro;{getTotal().toFixed(2)}</span>
                  </div>
                  <button className='checkout-btn'>
                    Proceed to Checkout
                    <MdOutlineKeyboardArrowRight size={20} />
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Menu;