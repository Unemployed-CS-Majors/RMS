import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDelivery, setIsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [collectionMethod, setCollectionMethod] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toggleState, setToggleState] = useState({
    1: true,
    2: true,
    3: true,
  });

  const toggleContent = step => {
    setToggleState(prevState => ({
      ...prevState,
      [step]: !prevState[step],
    }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleBackToMenu = () => navigate("/menu");

  const getTotal = () => {
    let total = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    if (isDelivery) {
      total += 5;
    }
    return total;
  };

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

  const handleCollectionMethodChange = method => {
    setCollectionMethod(method);
    setIsDelivery(method === "home_delivery");
  };

  const handlePaymentMethodChange = method => {
    setPaymentMethod(method);
  };

  const validateCheckoutInputs = () => {
    setError(null);

    if (!collectionMethod) {
      setError("Please select a collection method.");
      return false;
    }

    if (collectionMethod === "home_delivery") {
      if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
        setError("Please fill in all address fields for home delivery.");
        return false;
      }
    }
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateCheckoutInputs()) {
      alert("invalid address inputs");
      return;
    }
    console.log("Valid inputs", collectionMethod, paymentMethod);

    const orderData = {
      items: cartItems.map(item => ({
        id: `${item.id}`,
        quantity: Number(item.quantity),
        price: Number(item.price),
        name: item.name,
      })),
      deliveryMethod: collectionMethod,
      paymentMethod: paymentMethod,
      deliveryAddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      },
    };
    console.log("yo", orderData);

    try {
      const ACCESS_TOKEN = "m";
      const response = await fetch("https://api-d4o6tbc5fq-uc.a.run.app/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Order placed successfully!");
        console.log(data);
      } else {
        const data = await response.json();
        alert("Error placing order: " + data.message);
        console.log(data, response.status);
      }
    } catch (error) {
      alert("Error sending request: " + error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className={`checkout-wrapper ${!isLoggedIn ? "blurred" : ""}`}>
        <div className='checkout-left-section'>
          {["Personal Details", "Collection Method", "Payment Method"].map((title, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            return (
              <div key={stepNumber} className='checkout-step'>
                <div className='step-header'>
                  <div className={`step-circle ${isActive ? "active" : ""}`}>{stepNumber}</div>
                  <h3 className='step-title'>{title}</h3>
                </div>
                <button className='toggle-button' onClick={() => toggleContent(stepNumber)}>
                  {toggleState[stepNumber] ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </button>
                <div
                  className={`step-content ${toggleState[stepNumber] ? "open" : ""} ${
                    stepNumber === 1 ? "personal-info-form" : ""
                  }`}>
                  {stepNumber === 1 && (
                    <>
                      <div className='input-grid'>
                        <div className='input-field'>
                          <label className='input-label'>Name</label>
                          <input type='text' value={"example"} readOnly />
                        </div>
                        <div className='input-field'>
                          <label className='input-label'>Email</label>
                          <input type='email' value={"example@gmail.com"} readOnly />
                        </div>
                        <div className='input-field'>
                          <label className='input-label'>Phone Number</label>
                          <input type='text' placeholder='Enter your phone number' />
                        </div>
                      </div>
                    </>
                  )}

                  {stepNumber === 2 && (
                    <div className='collection-method-container' style={{ paddingBottom: 1.5 + "rem" }}>
                      <div className='radio-group'>
                        <div className='radio-option'>
                          <label htmlFor='pickup'>
                            <span style={{ color: "rgb(98, 98, 98)" }}>Pickup</span>
                          </label>
                          <input
                            type='radio'
                            id='pickup'
                            name='collectionMethod'
                            value='pickup'
                            checked={collectionMethod === "pickup"}
                            onChange={() => handleCollectionMethodChange("pickup")}
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        </div>

                        <div className='radio-option'>
                          <label htmlFor='home_delivery'>
                            <span style={{ color: "rgb(98, 98, 98)" }}>Home Delivery</span>
                          </label>
                          <input
                            type='radio'
                            id='home_delivery'
                            name='collectionMethod'
                            value='home_delivery'
                            checked={collectionMethod === "home_delivery"}
                            onChange={() => handleCollectionMethodChange("home_delivery")}
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        </div>
                      </div>

                      {isDelivery && (
                        <div className='address-fields'>
                          <div className='input-grid'>
                            <div className='input-field'>
                              <label className='input-label'>Street</label>
                              <input
                                type='text'
                                value={address.street}
                                onChange={e => setAddress({ ...address, street: e.target.value })}
                              />
                            </div>
                            <div className='input-field'>
                              <label className='input-label'>City</label>
                              <input
                                type='text'
                                value={address.city}
                                onChange={e => setAddress({ ...address, city: e.target.value })}
                              />
                            </div>
                            <div className='input-field'>
                              <label className='input-label'>County</label>
                              <input
                                type='text'
                                value={address.state}
                                onChange={e => setAddress({ ...address, state: e.target.value })}
                              />
                            </div>
                            <div className='input-field'>
                              <label className='input-label'>Eircode</label>
                              <input
                                type='text'
                                value={address.zipCode}
                                onChange={e => setAddress({ ...address, zipCode: e.target.value })}
                              />
                            </div>
                            <div className='input-field'>
                              <label className='input-label'>Country</label>
                              <input
                                type='text'
                                value={address.country}
                                onChange={e => setAddress({ ...address, country: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {stepNumber === 3 && (
                    <div className='payment-method-container' style={{ paddingBottom: 1.5 + "rem" }}>
                      {collectionMethod === "pickup" && (
                        <div className='radio-group'>
                          <div className='radio-option'>
                            <span style={{ color: "rgb(98, 98, 98)" }}>Online</span>
                            <input
                              type='radio'
                              id='online_pickup'
                              name='paymentMethod'
                              value='online'
                              checked={paymentMethod === "online"}
                              onChange={() => handlePaymentMethodChange("online")}
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </div>
                          <div className='radio-option'>
                            <label htmlFor='in_store_pickup'>
                              <span style={{ color: "rgb(98, 98, 98)" }}>In-store</span>
                            </label>
                            <input
                              type='radio'
                              id='in_store_pickup'
                              name='paymentMethod'
                              value='in_store'
                              checked={paymentMethod === "in_store"}
                              onChange={() => handlePaymentMethodChange("in_store")}
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {collectionMethod === "home_delivery" && (
                        <div className='radio-group'>
                          <div className='radio-option'>
                            <label htmlFor='online_delivery'>
                              <span style={{ color: "rgb(98, 98, 98)" }}>Online</span>
                            </label>
                            <input
                              type='radio'
                              id='online_delivery'
                              name='paymentMethod'
                              value='online'
                              checked={paymentMethod === "online"}
                              onChange={() => handlePaymentMethodChange("online")}
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </div>
                          <div className='radio-option'>
                            <label htmlFor='cash_on_delivery'>
                              <span style={{ color: "rgb(98, 98, 98)" }}>Cash on Delivery</span>
                            </label>
                            <input
                              type='radio'
                              id='cash_on_delivery'
                              name='paymentMethod'
                              value='cash_on_delivery'
                              checked={paymentMethod === "cash_on_delivery"}
                              onChange={() => handlePaymentMethodChange("cash_on_delivery")}
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className='checkout-page'>
          <a className='back-link' onClick={handleBackToMenu}>
            <MdOutlineKeyboardArrowLeft size={20} />
            Back
          </a>

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
                <div className='ordered-total-container-checkout'>
                  <div className='total-line'>
                    <span className='total-label'>Subtotal</span>
                    <span className='total-value-2'>
                      {isDelivery ? `€${(getTotal().toFixed(2) - 5).toFixed(2)}` : `€${getTotal().toFixed(2)}`}
                    </span>
                  </div>

                  {isDelivery && (
                    <div className='total-line'>
                      <span className='total-label'>Delivery Fee</span>
                      <span className='total-value-2'>€5.00</span>
                    </div>
                  )}
                  <div className='total-line'>
                    <span className='total-label'>
                      <b>Total</b>
                    </span>
                    <span className='total-value'>€{getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className='place-order-button-container'>
                  <button
                    className='place-order-button'
                    disabled={!collectionMethod || !paymentMethod}
                    onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
