import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CartItem from "./CartItem";

const CartSidebar = ({ cart, addToCart, removeFromCart, getTotal, getItemTotalPrice }) => {
    return (
        <div className='checkout-container'>
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
            <button className='checkout-btn'>
                Proceed to Checkout
                <MdOutlineKeyboardArrowRight size={20} />
            </button>
        </div>
    );
};

export default CartSidebar;