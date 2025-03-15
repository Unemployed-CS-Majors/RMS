import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FiMinus, FiPlus} from "react-icons/fi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {useAuth} from "../../contexts/AuthContext";
import "./Checkout.css";
import orderService from "../../services/order.service";
import userService from "../../services/user.service";

const Checkout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDelivery, setIsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [collectionMethod, setCollectionMethod] = useState("");
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

  const [userDetails, setUserDetails] = useState({
    name: "N/A",
    email: "N/A",
    phoneNumber: "N/A",
  });

  const [toggleState, setToggleState] = useState({
    1: true,
    2: true,
    3: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await userService.userDetails();
        setUserDetails({
          name: data.firstName + " " + data.lastName || "N/A",
          email: data.email || "N/A",
          phoneNumber: data.phoneNumber || "N/A",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

  const toggleContent = step => {
    setToggleState(prevState => ({
      ...prevState,
      [step]: !prevState[step],
    }));
  };

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
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!validateCheckoutInputs()) {
      setLoading(false);
      return;
    }

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
    console.log(orderData);

    try {
      const response = await orderService.createOrder(orderData);

      if (response && response.id) {
        if (paymentMethod !== "online") {
          setCartItems([]);
          localStorage.removeItem("cart");
          setSuccess("Order placed successfully!");
        } else {
          window.location.href = response.redirectUrl;
        }
      }
    } catch (error) {
      setError("Failed to place order. Please try again.");
      console.error("Order error:", error);
    } finally {
      setLoading(false);
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
                          <input type='text' value={userDetails.name} readOnly />
                        </div>
                        <div className='input-field'>
                          <label className='input-label'>Email</label>
                          <input type='email' value={userDetails.email} readOnly />
                        </div>
                        <div className='input-field'>
                          <label className='input-label'>Phone Number</label>
                          <input type='text' value={userDetails.phoneNumber} readOnly />
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
                <div className='ordered-total-container'>
                  <span className='total-label'>
                    <b>Subtotal</b>
                  </span>
                  <span className='total-value'>€{getTotal().toFixed(2)}</span>
                </div>

                <div className='place-order-button-container'>
                  <button
                    className='place-order-button'
                    disabled={!collectionMethod || !paymentMethod || loading}
                    onClick={handlePlaceOrder}>
                    {loading ? "Processing..." : "Place Order"}
                    <MdOutlineKeyboardArrowRight size={24} />
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
          <a href='#' className='go-to-menu-link' onClick={handleBackToMenu}>
            Back to Menu
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
