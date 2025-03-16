import { useState, useEffect } from 'react';
import menuService from '../../../services/menuItem.service';

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

    const addToCart = item => {
        setCartItems(
            cartItems.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
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

    const getTotal = () => cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

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