import React from "react";
import {FiMinus, FiPlus} from "react-icons/fi";
import styles from "./CartItem.module.css";

/**
 * CartItem component
 *
 * Renders a cart item with its name, quantity, and total price.
 * Allows increasing or decreasing the quantity of the item.
 *
 * @param {Object} props - The component props
 * @param {Object} props.item - The cart item object
 * @param {Function} props.addToCart - Function to add the item to the cart
 * @param {Function} props.removeFromCart - Function to remove the item from the cart
 * @param {Function} props.getItemTotalPrice - Function to get the total price of the item
 * @returns {JSX.Element} The CartItem component
 */
const CartItem = ({item, addToCart, removeFromCart, getItemTotalPrice}) => {
    return (
        <div className={styles.orderedItem}>
            <div className={styles.orderedItemHeader}>
                <div className={styles.orderedNameContainer}>
                    <p className={styles.orderedName}>{item.name}</p>
                </div>
                <span className={styles.orderedItemPrice}>&euro;{getItemTotalPrice(item)}</span>
            </div>
            <div className={styles.orderedBtnContainer}>
                <button
                    className={styles.quantityBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Decrease quantity"
                >
                    <FiMinus size={14}/>
                </button>
                <span className={styles.quantityValue}>{item.quantity}</span>
                <button
                    className={styles.quantityBtn}
                    onClick={() => addToCart(item)}
                    aria-label="Increase quantity"
                >
                    <FiPlus size={14}/>
                </button>
            </div>
        </div>
    );
};

export default CartItem;