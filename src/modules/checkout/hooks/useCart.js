import {useEffect, useState} from 'react';
import menuService from '../../../services/menuItem.service';

/**
 * Custom hook to manage the shopping cart state and operations.
 *
 * @returns {Object} The cart state and operations.
 * @returns {Array} cartItems - The list of items in the cart.
 * @returns {Array} menuItems - The list of menu items available.
 * @returns {Function} addToCart - Function to add an item to the cart.
 * @returns {Function} removeFromCart - Function to remove an item from the cart.
 * @returns {Function} getTotal - Function to calculate the total price of the items in the cart.
 * @returns {Function} clearCart - Function to clear the cart.
 */
const useCart = () => {
    const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [menuItems, setMenuItems] = useState([]);

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

    /**
     * Adds an item to the cart.
     *
     * @param {Object} item - The item to add to the cart.
     */
    const addToCart = item => {
        setCartItems(
            cartItems.map(cartItem => (cartItem.id === item.id ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem))
        );
    };

    /**
     * Removes an item from the cart.
     *
     * @param {Object} item - The item to remove from the cart.
     */
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

    /**
     * Calculates the total price of the items in the cart.
     *
     * @returns {number} The total price of the items in the cart.
     */
    const getTotal = () => cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

    /**
     * Clears the cart.
     */
    const clearCart = () => {
        localStorage.removeItem('cart');
    };

    return {
        cartItems,
        menuItems,
        addToCart,
        removeFromCart,
        getTotal,
        clearCart
    };
};

export default useCart;