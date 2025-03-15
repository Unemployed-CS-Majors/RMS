// Menu.jsx - Main Component
import React from "react";
import "./Menu.css";
import useMenuState from "./hooks/useMenuState";
import SearchBar from "../../components/Menu/SearchBar";
import CategoryFilter from "../../components/Menu/CategoryFilter";
import AllergenFilter from "../../components/Menu/AllergenFilter";
import AllergenTags from "../../components/Menu/AllergenTags";
import MenuItemsList from "../../components/Menu/MenuItemsList";
import ItemDetailsModal from "../../components/Menu/ItemDetailsModal";
import CartSidebar from "../../components/Menu/CartSidebar";
import MobileCart from "../../components/Menu/MobileCart";
import LoadingIndicator from "../../components/Dashboard/Loading/LoadingIndicator";

const Menu = () => {
  const {
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

    // Allergens
    allAllergens,
    excludedAllergens,
    toggleAllergen,
    clearAllergenFilters,
    showAllergenFilter,
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
  } = useMenuState();
// Load cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    // Update localStorage whenever the cart is modified
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
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

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showAllergenFilter={showAllergenFilter}
                toggleAllergenFilter={toggleAllergenFilter}
                excludedAllergens={excludedAllergens}
            />

            <AllergenFilter
                showAllergenFilter={showAllergenFilter}
                toggleAllergenFilter={toggleAllergenFilter}
                allAllergens={allAllergens}
                excludedAllergens={excludedAllergens}
                toggleAllergen={toggleAllergen}
                clearAllergenFilters={clearAllergenFilters}
                filterRef={filterRef}
            />

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            {excludedAllergens.length > 0 && (
                <AllergenTags
                    excludedAllergens={excludedAllergens}
                    toggleAllergen={toggleAllergen}
                />
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
                <MenuItemsList
                    filteredItems={filteredItems}
                    openItemDetails={openItemDetails}
                    addToCart={addToCart}
                />
            )}
          </div>

          {selectedItem && (
              <ItemDetailsModal
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  detailsRef={detailsRef}
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
              />
          )}

          {!isMobile && cart.length > 0 && (
              <CartSidebar
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  getTotal={getTotal}
                  getItemTotalPrice={getItemTotalPrice}
              />
          )}

          {isMobile && cart.length > 0 && (
              <MobileCart
                  cart={cart}
                  showMobileCart={showMobileCart}
                  toggleMobileCart={toggleMobileCart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  getTotal={getTotal}
                  getItemTotalPrice={getItemTotalPrice}
              />
          )}
        </div>
      </div>
  );
};

export default Menu;