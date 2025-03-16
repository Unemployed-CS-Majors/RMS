import React, { useEffect, useRef } from "react";
import { FaShoppingCart, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CartItem from "../CartItem/CartItem";
import styles from "./MobileCart.module.css";

const MobileCart = ({
                        cart,
                        showMobileCart,
                        toggleMobileCart,
                        addToCart,
                        removeFromCart,
                        getTotal,
                        getItemTotalPrice,
                        goToCheckout
                    }) => {
    const cartContentRef = useRef(null);

    // Close mobile cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showMobileCart &&
                cartContentRef.current &&
                !cartContentRef.current.contains(event.target) &&
                !event.target.closest(`.${styles.mobileCartToggle}`)
            ) {
                toggleMobileCart();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMobileCart, toggleMobileCart]);

    // Prevent scrolling of body when mobile cart is open
    useEffect(() => {
        if (showMobileCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showMobileCart]);

    // Total number of items in cart
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <div className={styles.mobileCartToggle} onClick={toggleMobileCart}>
                <div className={styles.mobileCartInfo}>
                    <FaShoppingCart className={styles.mobileCartIcon} />
                    <span className={styles.mobileCartTotal}>
                        &euro;{getTotal().toFixed(2)} • {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className={styles.mobileCartToggleIcon}>
                    {showMobileCart ? <FaChevronDown /> : <FaChevronUp />}
                </div>
            </div>

            {showMobileCart && (
                <div className={styles.mobileCartVisible}>
                    <div className={styles.mobileCartContent} ref={cartContentRef}>
                        <div className={styles.cartHeaderContainer}>
                            <FaShoppingCart className={styles.cartIcon} />
                            <h3 className={styles.cartTitle}>Your Order</h3>
                        </div>

                        <div className={styles.cartItemsContainer}>
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                        getItemTotalPrice={getItemTotalPrice}
                                    />
                                ))
                            ) : (
                                <div className={styles.emptyCart}>
                                    Your cart is empty
                                </div>
                            )}
                        </div>

                        <div className={styles.cartTotalContainer}>
                            <span className={styles.totalLabel}>Total</span>
                            <span className={styles.totalValue}>&euro;{getTotal().toFixed(2)}</span>
                        </div>

                        <button
                            className={styles.checkoutBtn}
                            onClick={goToCheckout}
                            disabled={cart.length === 0}
                        >
                            Proceed to Checkout
                            <MdOutlineKeyboardArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileCart;