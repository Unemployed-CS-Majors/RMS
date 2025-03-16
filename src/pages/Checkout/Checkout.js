import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiArrowLeft, FiCheck, FiMinus, FiPlus} from 'react-icons/fi';
import {
  MdCreditCard,
  MdLocalShipping,
  MdOutlineDone,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineShoppingBag,
  MdOutlineStore,
  MdPerson
} from 'react-icons/md';
import {useAuth} from '../../contexts/AuthContext';
import orderService from '../../services/order.service';
import userService from '../../services/user.service';
import menuService from '../../services/menuItem.service';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [isDelivery, setIsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [collectionMethod, setCollectionMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    county: '',
    eirCode: '',
    country: '',
  });

  const [userDetails, setUserDetails] = useState({
    name: 'N/A',
    email: 'N/A',
    phoneNumber: 'N/A',
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
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await menuService.getAll();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await userService.userDetails();
        setUserDetails({
          name: data.firstName + ' ' + data.lastName || 'N/A',
          email: data.email || 'N/A',
          phoneNumber: data.phoneNumber || 'N/A',
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
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

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/menu');
    }
  }, [cartItems, navigate]);

  const handleBackToMenu = () => {
    if (cartItems.length !== 0) {
      navigate('/menu');
    }
  };

  const getTotal = () => cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const addToCart = item => {
    setCartItems(
        cartItems.map(cartItem => (cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem))
    );
  };

  const removeFromCart = item => {
    setCartItems(
        cartItems
            .map(cartItem =>
                cartItem.id === item.id && cartItem.quantity > 0 ? {
                  ...cartItem,
                  quantity: cartItem.quantity - 1
                } : cartItem
            )
            .filter(cartItem => cartItem.quantity > 0)
    );
  };

  const handleLoginRedirect = () => {
    navigate('/auth', { state: { from: '/checkout' } });
  };

  const handleCollectionMethodChange = method => {
    setCollectionMethod(method);
    setIsDelivery(method === 'home_delivery');
  };

  const handlePaymentMethodChange = method => {
    setPaymentMethod(method);
  };

  const addressIsComplete = () => {
    return address.street && address.city && address.county && address.eirCode && address.country;
  };

  const validateCheckoutInputs = () => {
    setError(null);

    if (!collectionMethod) {
      setError('Please select a collection method.');
      return false;
    }

    if (collectionMethod === 'home_delivery') {
      if (!address.street || !address.city || !address.county || !address.eirCode || !address.country) {
        setError('Please fill in all address fields for home delivery.');
        return false;
      }
    }
    if (!paymentMethod) {
      setError('Please select a payment method.');
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
        county: address.county,
        eirCode: address.eirCode,
        country: address.country,
      },
    };

    try {
      const response = await orderService.createOrder(orderData);

      if (response) {
        if (paymentMethod !== 'online') {
          setSuccess('Order placed successfully!');
          navigate(`/profile#orders?order=${response.data.id}`);
          localStorage.removeItem('cart');
        } else {
          window.location.href = response.redirectUrl;
        }
      }
    } catch (error) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={styles.myCheckoutContainer}>
        <div className={styles.container}>
          <h1 className={`${styles.pageTitle} ${!isLoggedIn ? styles.blurred : ''}`}>Checkout</h1>

          <div className={`${styles.wrapper} ${!isLoggedIn ? styles.blurred : ''}`}>
          {error && (
              <div className={styles.errorMessage}>
                <span>{error}</span>
              </div>
          )}

            <div className={styles.main}>
              <div className={styles.steps}>
                {[
                  {title: 'Personal Details', icon: <MdPerson/>},
                  {title: 'Collection Method', icon: <MdLocalShipping/>},
                  {title: 'Payment Method', icon: <MdCreditCard/>}
                ].map((step, index) => {
                  const stepNumber = index + 1;
                  const isCompleted =
                      (stepNumber === 1 && isLoggedIn) ||
                      (stepNumber === 2 && (collectionMethod === 'pickup' || (collectionMethod === 'home_delivery' && addressIsComplete()))) ||
                      (stepNumber === 3 && paymentMethod);

                  return (
                      <div key={stepNumber} className={styles.step}>
                        <div
                            className={styles.stepHeader}
                            onClick={() => toggleContent(stepNumber)}
                        >
                          <div className={`${styles.stepIcon} ${isCompleted ? styles.completed : ''}`}>
                            {isCompleted ? <MdOutlineDone/> : step.icon}
                          </div>
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                          <button className={styles.toggleButton}>
                            {toggleState[stepNumber] ? <MdOutlineKeyboardArrowUp/> : <MdOutlineKeyboardArrowDown/>}
                          </button>
                        </div>

                        <div className={`${styles.stepContent} ${toggleState[stepNumber] ? styles.open : ''}`}>
                          {stepNumber === 1 && (
                              <div className={styles.personalInfo}>
                                <div className={styles.inputGrid}>
                                  <div className={styles.inputField}>
                                    <label>Name</label>
                                    <input type='text' value={userDetails.name} readOnly/>
                                  </div>
                                  <div className={styles.inputField}>
                                    <label>Email</label>
                                    <input type='email' value={userDetails.email} readOnly/>
                                  </div>
                                  <div className={styles.inputField}>
                                    <label>Phone Number</label>
                                    <input type='text' value={userDetails.phoneNumber} readOnly/>
                                  </div>
                                </div>
                              </div>
                          )}

                          {stepNumber === 2 && (
                              <div className={styles.collectionMethod}>
                                <div className={styles.radioOptions}>
                                  <div
                                      className={`${styles.radioCard} ${collectionMethod === 'pickup' ? styles.selected : ''}`}
                                      onClick={() => handleCollectionMethodChange('pickup')}
                                  >
                                    <MdOutlineStore className={styles.optionIcon}/>
                                    <div className={styles.optionInfo}>
                                      <span className={styles.optionTitle}>Pickup</span>
                                      <span className={styles.optionDesc}>Collect your order at our store</span>
                                    </div>
                                    <div className={styles.radioIndicator}>
                                      {collectionMethod === 'pickup' && <FiCheck/>}
                                    </div>
                                  </div>

                                  <div
                                      className={`${styles.radioCard} ${collectionMethod === 'home_delivery' ? styles.selected : ''}`}
                                      onClick={() => handleCollectionMethodChange('home_delivery')}
                                  >
                                    <MdLocalShipping className={styles.optionIcon}/>
                                    <div className={styles.optionInfo}>
                                      <span className={styles.optionTitle}>Home Delivery</span>
                                      <span className={styles.optionDesc}>Delivered to your address</span>
                                    </div>
                                    <div className={styles.radioIndicator}>
                                      {collectionMethod === 'home_delivery' && <FiCheck/>}
                                    </div>
                                  </div>
                                </div>

                                {isDelivery && (
                                    <div className={styles.addressFields}>
                                      <div className={styles.inputGrid}>
                                        <div className={styles.inputField}>
                                          <label>Street</label>
                                          <input
                                              type='text'
                                              value={address.street}
                                              onChange={e => setAddress({...address, street: e.target.value})}
                                              placeholder='123 Main St'
                                          />
                                        </div>
                                        <div className={styles.inputField}>
                                          <label>City</label>
                                          <input
                                              type='text'
                                              value={address.city}
                                              onChange={e => setAddress({...address, city: e.target.value})}
                                              placeholder='Dublin'
                                          />
                                        </div>
                                        <div className={styles.inputField}>
                                          <label>County</label>
                                          <input
                                              type='text'
                                              value={address.county}
                                              onChange={e => setAddress({...address, county: e.target.value})}
                                              placeholder='Dublin'
                                          />
                                        </div>
                                        <div className={styles.inputField}>
                                          <label>Eircode</label>
                                          <input
                                              type='text'
                                              value={address.eirCode}
                                              onChange={e => setAddress({...address, eirCode: e.target.value})}
                                              placeholder='D01 AB12'
                                          />
                                        </div>
                                        <div className={styles.inputField}>
                                          <label>Country</label>
                                          <input
                                              type='text'
                                              value={address.country}
                                              onChange={e => setAddress({...address, country: e.target.value})}
                                              placeholder='Ireland'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                )}
                              </div>
                          )}

                          {stepNumber === 3 && (
                              <div className={styles.paymentMethod}>
                                {collectionMethod === 'pickup' && (
                                    <div className={styles.radioOptions}>
                                      <div
                                          className={`${styles.radioCard} ${paymentMethod === 'online' ? styles.selected : ''}`}
                                          onClick={() => handlePaymentMethodChange('online')}
                                      >
                                        <MdCreditCard className={styles.optionIcon}/>
                                        <div className={styles.optionInfo}>
                                          <span className={styles.optionTitle}>Online Payment</span>
                                          <span className={styles.optionDesc}>Pay now with credit/debit card</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                          {paymentMethod === 'online' && <FiCheck/>}
                                        </div>
                                      </div>

                                      <div
                                          className={`${styles.radioCard} ${paymentMethod === 'in_store' ? styles.selected : ''}`}
                                          onClick={() => handlePaymentMethodChange('in_store')}
                                      >
                                        <MdOutlineStore className={styles.optionIcon}/>
                                        <div className={styles.optionInfo}>
                                          <span className={styles.optionTitle}>In-store Payment</span>
                                          <span className={styles.optionDesc}>Pay when you collect your order</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                          {paymentMethod === 'in_store' && <FiCheck/>}
                                        </div>
                                      </div>
                                    </div>
                                )}

                                {collectionMethod === 'home_delivery' && (
                                    <div className={styles.radioOptions}>
                                      <div
                                          className={`${styles.radioCard} ${paymentMethod === 'online' ? styles.selected : ''}`}
                                          onClick={() => handlePaymentMethodChange('online')}
                                      >
                                        <MdCreditCard className={styles.optionIcon}/>
                                        <div className={styles.optionInfo}>
                                          <span className={styles.optionTitle}>Online Payment</span>
                                          <span className={styles.optionDesc}>Pay now with credit/debit card</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                          {paymentMethod === 'online' && <FiCheck/>}
                                        </div>
                                      </div>

                                      <div
                                          className={`${styles.radioCard} ${paymentMethod === 'cash_on_delivery' ? styles.selected : ''}`}
                                          onClick={() => handlePaymentMethodChange('cash_on_delivery')}
                                      >
                                        <MdOutlineShoppingBag className={styles.optionIcon}/>
                                        <div className={styles.optionInfo}>
                                          <span className={styles.optionTitle}>Cash on Delivery</span>
                                          <span className={styles.optionDesc}>Pay when your order arrives</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                          {paymentMethod === 'cash_on_delivery' && <FiCheck/>}
                                        </div>
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

              <div className={styles.summary}>
                <button className={styles.backButton} onClick={handleBackToMenu}>
                  <FiArrowLeft/> Back to Menu
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
                                <FiMinus/>
                              </button>
                              <span className={styles.quantity}>{item.quantity}</span>
                              <button className={styles.quantityBtn} onClick={() => addToCart(item)}>
                                <FiPlus/>
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
          </div>
        </div>

          {!isLoggedIn && (
              <div className={styles.loginOverlay}>
                <div className={styles.loginPrompt}>
                  <p>Please login to continue with your order</p>
                  <button className={styles.loginButton} onClick={handleLoginRedirect}>
                    Login
                  </button>
                  <button className={styles.menuLink} onClick={handleBackToMenu}>
                    Back to Menu
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Checkout;