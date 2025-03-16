import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CartItem from "../CartItem/CartItem";
import styles from "./CartSidebar.module.css";

const CartSidebar = ({ cart, addToCart, removeFromCart, getTotal, getItemTotalPrice, goToCheckout }) => {
    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutHeaderContainer}>
                <FaShoppingCart className={styles.cartIcon} />
                <h3 className={styles.checkoutTitle}>Your Order</h3>
            </div>

            <div className={styles.orderedItemsContainer}>
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

            <div className={styles.orderedTotalContainer}>
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
    );
};

export default CartSidebar;