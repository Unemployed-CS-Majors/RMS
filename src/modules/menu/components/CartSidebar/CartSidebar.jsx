import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CartItem from "../CartItem/CartItem";
import styles from "./CartSidebar.module.css";

/**
 * CartSidebar component
 *
 * Renders the sidebar for the shopping cart, displaying the items in the cart,
 * the total price, and a button to proceed to checkout.
 *
 * @param {Object} props - The component props
 * @param {Array} props.cart - The list of items in the cart
 * @param {Function} props.addToCart - Function to add an item to the cart
 * @param {Function} props.removeFromCart - Function to remove an item from the cart
 * @param {Function} props.getTotal - Function to get the total price of the items in the cart
 * @param {Function} props.getItemTotalPrice - Function to get the total price of a single item
 * @param {Function} props.goToCheckout - Function to proceed to the checkout page
 * @returns {JSX.Element} The CartSidebar component
 */
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