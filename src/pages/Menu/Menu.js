// Menu.jsx - Main Component with CSS Modules
import React from "react";
import useMenuState from "./hooks/useMenuState";
import SearchBar from "../../components/Menu/SearchBar/SearchBar";
import CategoryFilter from "../../components/Menu/CategoryFilter/CategoryFilter";
import AllergenFilter from "../../components/Menu/AllergenFilter/AllergenFilter";
import AllergenTags from "../../components/Menu/AllergenTags/AllergenTags";
import MenuItemsList from "../../components/Menu/MenuItemsList/MenuItemsList";
import ItemDetailsModal from "../../components/Menu/ItemDetailsModal/ItemDetailsModal";
import CartSidebar from "../../components/Menu/CartSidebar/CartSidebar";
import MobileCart from "../../components/Menu/MobileCart/MobileCart";
import LoadingIndicator from "../../components/Dashboard/Loading/LoadingIndicator";
import styles from "./Menu.module.css";

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
        goToCheckout,
        orderEnabled,

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

    return (
        <div className={styles.menuPage}>
            <div className={styles.menuLayout}>
                <div
                    className={styles.menuContainer}
                    style={{
                        width: !isMobile && cart.length > 0 ? "calc(100% - 350px)" : "100%",
                    }}
                >
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

                    <h2 className={styles.menuSectionTitle}>Our Menu</h2>

                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <LoadingIndicator text="Loading menu items..." />
                        </div>
                    ) : error ? (
                        <div className={styles.errorContainer}>
                            <p className={styles.errorMessage}>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className={styles.retryButton}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <MenuItemsList
                            filteredItems={filteredItems}
                            openItemDetails={openItemDetails}
                            addToCart={addToCart}
                            orderEnabled={orderEnabled}
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
                        orderEnabled={orderEnabled}
                    />
                )}

                {!isMobile && cart.length > 0 && (
                    <CartSidebar
                        cart={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        getTotal={getTotal}
                        getItemTotalPrice={getItemTotalPrice}
                        goToCheckout={goToCheckout}
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
                        goToCheckout={goToCheckout}
                    />
                )}
            </div>
        </div>
    );
};

export default Menu;