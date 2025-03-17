import React from 'react';
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSummary.module.css';

/**
 * OrderSummary component displays the summary of the user's order, including cart items, total price, and actions to place the order.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.cartItems - The list of items in the cart.
 * @param {Array} props.menuItems - The list of menu items available.
 * @param {Function} props.addToCart - Function to add an item to the cart.
 * @param {Function} props.removeFromCart - Function to remove an item from the cart.
 * @param {Function} props.getTotal - Function to calculate the total price of the items in the cart.
 * @param {boolean} props.loading - Flag indicating if the order is being processed.
 * @param {string} props.collectionMethod - The selected collection method for the order.
 * @param {string} props.paymentMethod - The selected payment method for the order.
 * @param {Function} props.handlePlaceOrder - Function to handle placing the order.
 * @returns {JSX.Element} The rendered OrderSummary component.
 */
const OrderSummary = ({
                          cartItems,
                          menuItems,
                          addToCart,
                          removeFromCart,
                          getTotal,
                          loading,
                          collectionMethod,
                          paymentMethod,
                          handlePlaceOrder
                      }) => {
    const navigate = useNavigate();

    /**
     * Handles navigation back to the menu if there are items in the cart.
     */
    const handleBackToMenu = () => {
        if (cartItems.length !== 0) {
            navigate('/menu');
        }
    };

    return (
        <div className={styles.summary}>
            <button className={styles.backButton} onClick={handleBackToMenu}>
                <FiArrowLeft /> Back to Menu
            </button>

            <h2 className={styles.summaryTitle}>Your Order</h2>

            <div className={styles.cartItems}>
                {cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <img
                            src={menuItems.find(menuItem => menuItem.id === item.id)?.imageUrl}
                            alt={item.name}
                            className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <div className={styles.itemActions}>
                                <div className={styles.quantityControl}>
                                    <button className={styles.quantityBtn} onClick={() => removeFromCart(item)}>
                                        <FiMinus />
                                    </button>
                                    <span className={styles.quantity}>{item.quantity}</span>
                                    <button className={styles.quantityBtn} onClick={() => addToCart(item)}>
                                        <FiPlus />
                                    </button>
                                </div>
                                <span className={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.orderTotal}>
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Subtotal</span>
                    <span className={styles.totalValue}>€{getTotal().toFixed(2)}</span>
                </div>
                <button
                    className={styles.placeOrderButton}
                    disabled={!collectionMethod || !paymentMethod || loading}
                    onClick={handlePlaceOrder}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;