import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from '../components/PersonalDetails/PersonalDetails';
import CollectionMethod from '../components/CollectionMethod/CollectionMethod';
import PaymentMethod from '../components/PaymentMethod/PaymentMethod';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import LoginOverlay from '../components/LoginOverlay/LoginOverlay';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import OrderProcessingModal from '../components/OrderProcessingModal/OrderProcessingModal';
import useCart from '../hooks/useCart';
import useCheckout from '../hooks/useCheckout';
import useUserDetails from '../hooks/useUserDetails';
import styles from './Checkout.module.css';

/**
 * Checkout component handles the checkout process, including displaying personal details,
 * collection method, payment method, and order summary. It also manages the state and operations
 * related to the checkout process.
 *
 * @returns {JSX.Element} The rendered Checkout component.
 */
const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    menuItems,
    addToCart,
    removeFromCart,
    getTotal,
    clearCart
  } = useCart();

  const {
    isLoggedIn,
    userDetails,
    handleLoginRedirect
  } = useUserDetails();

  const {
    isDelivery,
    paymentMethod,
    collectionMethod,
    loading,
    error,
    address,
    toggleState,
    modalOpen,
    orderStatus,
    redirectUrl,
    setAddress,
    toggleContent,
    handleCollectionMethodChange,
    handlePaymentMethodChange,
    addressIsComplete,
    handlePlaceOrder,
    closeModal
  } = useCheckout(cartItems, clearCart);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to menu if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/menu');
    }
  }, [cartItems, navigate]);

  /**
   * Handles navigation back to the menu page.
   */
  const handleBackToMenu = () => {
    if (cartItems.length !== 0) {
      navigate('/menu');
    }
  };

  return (
      <div className={styles.myCheckoutContainer}>
        <div className={styles.container}>
          <h1 className={`${styles.pageTitle} ${!isLoggedIn ? styles.blurred : ''}`}>Checkout</h1>

          <div className={`${styles.wrapper} ${!isLoggedIn ? styles.blurred : ''}`}>
            <ErrorMessage message={error} />

            <div className={styles.main}>
              <div className={styles.steps}>
                <PersonalDetails
                    userDetails={userDetails}
                    isOpen={toggleState[1]}
                    toggleContent={toggleContent}
                    isCompleted={isLoggedIn}
                />

                <CollectionMethod
                    isOpen={toggleState[2]}
                    toggleContent={toggleContent}
                    isCompleted={collectionMethod === 'pickup' || (collectionMethod === 'home_delivery' && addressIsComplete())}
                    collectionMethod={collectionMethod}
                    isDelivery={isDelivery}
                    address={address}
                    setAddress={setAddress}
                    handleCollectionMethodChange={handleCollectionMethodChange}
                />

                <PaymentMethod
                    isOpen={toggleState[3]}
                    toggleContent={toggleContent}
                    isCompleted={paymentMethod}
                    collectionMethod={collectionMethod}
                    paymentMethod={paymentMethod}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                />
              </div>

              <OrderSummary
                  cartItems={cartItems}
                  menuItems={menuItems}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  getTotal={getTotal}
                  loading={loading}
                  collectionMethod={collectionMethod}
                  paymentMethod={paymentMethod}
                  handlePlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>

          {/* Order Processing Modal */}
          <OrderProcessingModal
              isOpen={modalOpen}
              orderStatus={orderStatus}
              paymentMethod={paymentMethod}
              redirectUrl={redirectUrl}
              onClose={closeModal}
          />

          {!isLoggedIn && (
              <LoginOverlay
                  handleLoginRedirect={handleLoginRedirect}
                  handleBackToMenu={handleBackToMenu}
              />
          )}
        </div>
      </div>
  );
};

export default Checkout;