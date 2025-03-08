// hooks/useCart.js
import { useState } from "react";

/**
 * Custom hook to manage shopping cart functionality
 */
export const useCart = () => {
    const [cart, setCart] = useState([]);
    const [showMobileCart, setShowMobileCart] = useState(false);

    /**
     * Add an item to the cart
     * @param {Object} item - The item to add to the cart
     */
    const addToCart = item => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            setCart(
                cart.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    /**
     * Remove an item from the cart
     * @param {string|number} itemId - The ID of the item to remove
     */
    const removeFromCart = itemId => {
        setCart(
            cart
                .map(item => (item.id === itemId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item))
                .filter(item => item.quantity > 0)
        );
    };

    /**
     * Calculate the total price of all items in the cart
     * @returns {number} The total price
     */
    const getTotal = () => {
        return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    };

    /**
     * Calculate the total price for a specific item in the cart
     * @param {Object} item - The cart item
     * @returns {string} The formatted total price for the item
     */
    const getItemTotalPrice = item => {
        return (Number(item.price) * item.quantity).toFixed(2);
    };

    /**
     * Toggle the visibility of the mobile cart
     */
    const toggleMobileCart = () => {
        setShowMobileCart(!showMobileCart);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        getTotal,
        getItemTotalPrice,
        showMobileCart,
        toggleMobileCart
    };
};

export default useCart;