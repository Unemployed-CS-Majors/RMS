import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartItem = ({ item, addToCart, removeFromCart, getItemTotalPrice }) => {
    return (
        <div className='ordered-item'>
            <div className='ordered-item-header'>
                <div className='ordered-name-container'>
                    <p className='ordered-name'>{item.name}</p>
                </div>
                <span className='ordered-item-price'>&euro;{getItemTotalPrice(item)}</span>
            </div>
            <div className='ordered-btn-container'>
                <button className='quantity-btn' onClick={() => removeFromCart(item.id)}>
                    <FiMinus size={14} />
                </button>
                <span className='quantity-value'>{item.quantity}</span>
                <button className='quantity-btn' onClick={() => addToCart(item)}>
                    <FiPlus size={14} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;