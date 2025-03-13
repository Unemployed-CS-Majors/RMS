import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import "./Checkout.css";
import bottomImg from "../../assets/bottomimg.png";

const Checkout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isDelivery, setIsDelivery] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleBackToMenu = () => navigate("/menu");

  const getTotal = () => cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const addToCart = item => {
    setCartItems(
      cartItems.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    );
  };

  const removeFromCart = item => {
    setCartItems(
      cartItems
        .map(cartItem =>
          cartItem.id === item.id && cartItem.quantity > 0 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0)
    );
  };

  const handleLoginRedirect = () => {
    navigate("/auth", { state: { from: "/checkout" } });
  };

  return (
    <div>
      <div className={`checkout-wrapper ${!isLoggedIn ? "blurred" : ""}`}>
        <div className='checkout-page'>
          <button className='back-btn' onClick={handleBackToMenu}>
            <MdOutlineKeyboardArrowLeft size={20} />
            Back to Menu
          </button>

          <h2 className='checkout-title'>Review Your Order</h2>

          {cartItems.length === 0 ? (
            handleBackToMenu()
          ) : (
            <div className='order-details-container'>
              <div className='order-items'>
                {cartItems.map(item => (
                  <div key={item.id} className='order-item'>
                    <img src={item.image} alt={item.name} className='item-image' />
                    <div className='item-info'>
                      <h3 className='item-name'>{item.name}</h3>
                      <div className='item-quantity'>
                        <div className='ordered-btn-container'>
                          <button className='quantity-btn' onClick={() => removeFromCart(item)}>
                            <FiMinus size={14} />
                          </button>
                          <span className='quantity-value'>{item.quantity}</span>
                          <button className='quantity-btn' onClick={() => addToCart(item)}>
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className='item-price'>€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className='order-summary'>
                <div className='ordered-total-container'>
                  <span className='total-label'>
                    <b>Total</b>
                  </span>
                  <span className='total-value'>€{getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className='checkout-bottom-image'>
            <img src={bottomImg} alt='Checkout Illustration' />
          </div>
        </div>

        {/* Payment Section */}
        <div className='payment-page'>
          <div className='payment-container'>
            <div className='payment-header'>
              <span
                className={`payment-tab takeout ${!isDelivery ? "active" : ""}`}
                onClick={() => setIsDelivery(false)}>
                Takeout
              </span>
              <div className='vertical-divider'></div>
              <span
                className={`payment-tab delivery ${isDelivery ? "active" : ""}`}
                onClick={() => setIsDelivery(true)}>
                Delivery
              </span>
            </div>
            <div className='payment-divider'></div>
            {isDelivery && (
              <div className='address-form'>
                <h3>Enter Your Address</h3>
                <input type='text' placeholder='Street' />
                <input type='text' placeholder='City' />
                <input type='text' placeholder='County' />
                <input type='text' placeholder='Eircode' />
                <input type='text' placeholder='Country' />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Login prompt (only if user is not logged in) */}
      {!isLoggedIn && (
        <div className='login-prompt'>
          <p>Please Login to Order</p>
          <button className='checkout-login-btn' onClick={handleLoginRedirect}>
            Login here
          </button>
          <a href='#' className='go-to-menu-link' onClick={handleBackToMenu()}>
            Back to Menu
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
