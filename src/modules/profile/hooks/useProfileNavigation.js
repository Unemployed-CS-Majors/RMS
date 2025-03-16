import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling URL navigation and parsing
 */
export const useProfileNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    // Parse URL to determine active tab and selected items
    useEffect(() => {
        // Handle combined hash and query parameters (e.g., #reservations?reservation=123)
        const hashWithParams = location.hash.substring(1); // Remove the '#'

        // Split into base hash and potential query part
        const [baseHash, queryPart] = hashWithParams.split('?');

        // Set active tab if valid
        if (baseHash && ['account', 'reservations', 'orders'].includes(baseHash)) {
            setActiveTab(baseHash);
        }

        // Parse query parameters from either the hash query part or regular search params
        const params = queryPart
            ? new URLSearchParams(`?${queryPart}`)
            : new URLSearchParams(location.search);

        const orderId = params.get('order');
        const reservationId = params.get('reservation');

        if (orderId) {
            setSelectedOrderId(orderId);
        }

        if (reservationId) {
            setSelectedReservationId(reservationId);
        }
    }, [location]);

    // Update URL hash when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`#${tab}`, { replace: true });
    };

    const handleViewOrder = (orderId) => {
        navigate(`#orders?order=${orderId}`, { replace: true });
        setSelectedOrderId(orderId);
    };

    const handleViewReservation = (reservationId) => {
        navigate(`#reservations?reservation=${reservationId}`, { replace: true });
        setSelectedReservationId(reservationId);
    };

    const clearSelectedOrder = () => {
        setSelectedOrderId(null);
        navigate(`#orders`, { replace: true });
    };

    const clearSelectedReservation = () => {
        setSelectedReservationId(null);
        navigate(`#reservations`, { replace: true });
    };

    return {
        activeTab,
        selectedOrderId,
        selectedReservationId,
        handleTabChange,
        handleViewOrder,
        handleViewReservation,
        clearSelectedOrder,
        clearSelectedReservation
    };
};