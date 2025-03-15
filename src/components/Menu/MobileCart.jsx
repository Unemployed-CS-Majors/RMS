import React from "react";
import { FaShoppingCart, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CartItem from "./CartItem";

const MobileCart = ({
                        cart,
                        showMobileCart,
                        toggleMobileCart,
                        addToCart,
                        removeFromCart,
                        getTotal,
                        getItemTotalPrice,
                        goToCheckout
                    }) => {
    return (
        <>
            <div className='mobile-cart-toggle' onClick={toggleMobileCart}>
                <div className='mobile-cart-info'>
                    <FaShoppingCart className='mobile-cart-icon' />
                    <span className='mobile-cart-total'>
            &euro;{getTotal().toFixed(2)} • {cart.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
                </div>
                <div className='mobile-cart-toggle-icon'>
                    {showMobileCart ? <FaChevronDown /> : <FaChevronUp />}
                </div>
            </div>

            {showMobileCart && (
                <div
                    className='mobile-cart-visible'
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            toggleMobileCart();
                        }
                    }}>
                    <div className='mobile-cart-content'>
                        <div className='checkout-header-container'>
                            <FaShoppingCart className='cart-icon' />
                            <h3 className='checkout-title'>Your Order</h3>
                        </div>
                        <div className='ordered-items-container'>
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    addToCart={addToCart}
                                    removeFromCart={removeFromCart}
                                    getItemTotalPrice={getItemTotalPrice}
                                />
                            ))}
                        </div>
                        <div className='ordered-total-container'>
                            <span className='total-label'>Total</span>
                            <span className='total-value'>&euro;{getTotal().toFixed(2)}</span>
                        </div>
                        <button className='checkout-btn' onClick={goToCheckout}>
                            Proceed to Checkout
                            <MdOutlineKeyboardArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileCart;