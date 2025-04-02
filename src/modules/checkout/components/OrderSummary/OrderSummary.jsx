import React, { useState } from 'react';
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSummary.module.css';

const OrderSummary = ({
  cartItems,
  menuItems,
  addToCart,
  removeFromCart,
  getTotal,
  loading,
  collectionMethod,
  paymentMethod,
  handlePlaceOrder,
}) => {
  const navigate = useNavigate();

  // State to manage image loading status for each item
  const [loadingImages, setLoadingImages] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {})
  );

  // Handles navigation back to the menu if there are items in the cart
  const handleBackToMenu = () => {
    if (cartItems.length !== 0) {
      navigate('/menu');
    }
  };

  // Handles image load event to update loading state
  const handleImageLoad = itemId => {
    setLoadingImages(prevState => ({
      ...prevState,
      [itemId]: false,
    }));
  };

  return (
    <div className={styles.summary}>
      <button
        className={styles.backButton}
        onClick={handleBackToMenu}>
        <FiArrowLeft /> Back to Menu
      </button>

      <h2 className={styles.summaryTitle}>Your Order</h2>

      <div className={styles.cartItems}>
        {cartItems.map(item => {
          const imageUrl = menuItems.find(menuItem => menuItem.id === item.id)?.imageUrl;
          const loadingImage = loadingImages[item.id];

          return (
            <div
              key={item.id}
              className={styles.cartItem}>
              <div className={styles.imageWrapper}>
                {loadingImage && <div className={styles.spinner}></div>}
                <img
                  src={imageUrl}
                  alt={item.name}
                  className={`${styles.itemImage} ${loadingImage ? styles.hidden : ''}`}
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => removeFromCart(item)}>
                      <FiMinus />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => addToCart(item)}>
                      <FiPlus />
                    </button>
                  </div>
                  <span className={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.orderTotal}>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Subtotal</span>
          <span className={styles.totalValue}>€{getTotal().toFixed(2)}</span>
        </div>
        <button
          className={styles.placeOrderButton}
          disabled={!collectionMethod || !paymentMethod || loading}
          onClick={handlePlaceOrder}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
