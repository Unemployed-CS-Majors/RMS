import { useState, useEffect } from 'react';
import orderService from "../../../services/order.service";

/**
 * Custom hook for fetching and managing user orders
 */
export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const getAllOrdersResponse = await orderService.getUserOrder();
            const refactoredOrders = getAllOrdersResponse.map(order => {
                return {
                    ...order,
                    date: (new Date(order.createdAt)).toLocaleDateString()
                };
            });
            setOrders(refactoredOrders);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch orders');
            setIsLoading(false);
        }
    };

    return {
        orders,
        isLoading,
        error,
        fetchOrders
    };
};