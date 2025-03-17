import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../../../services/order.service';

/**
 * Custom hook to manage the checkout process.
 *
 * @param {Array} cartItems - The list of items in the cart.
 * @param {Function} clearCart - Function to clear the cart.
 * @returns {Object} The checkout state and operations.
 */
const useCheckout = (cartItems, clearCart) => {
    const navigate = useNavigate();
    const [isDelivery, setIsDelivery] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [collectionMethod, setCollectionMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        county: '',
        eirCode: '',
        country: '',
    });

    // Modal state for order processing
    const [modalOpen, setModalOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null); // 'processing', 'success', 'error'
    const [redirectUrl, setRedirectUrl] = useState('');
    const [orderId, setOrderId] = useState(null);

    const [toggleState, setToggleState] = useState({
        1: true,
        2: true,
        3: true,
    });

    /**
     * Toggles the visibility of the content for a given step.
     *
     * @param {number} step - The step number to toggle.
     */
    const toggleContent = step => {
        setToggleState(prevState => ({
            ...prevState,
            [step]: !prevState[step],
        }));
    };

    /**
     * Handles the change of collection method.
     *
     * @param {string} method - The selected collection method.
     */
    const handleCollectionMethodChange = method => {
        setCollectionMethod(method);
        setIsDelivery(method === 'home_delivery');
    };

    /**
     * Handles the change of payment method.
     *
     * @param {string} method - The selected payment method.
     */
    const handlePaymentMethodChange = method => {
        setPaymentMethod(method);
    };

    /**
     * Checks if the address is complete.
     *
     * @returns {boolean} True if the address is complete, false otherwise.
     */
    const addressIsComplete = () => {
        return address.street && address.city && address.county && address.eirCode && address.country;
    };

    /**
     * Closes the order processing modal.
     */
    const closeModal = () => {
        setModalOpen(false);

        // If order was successful and not online payment, navigate to profile
        if (orderStatus === 'success' && paymentMethod !== 'online') {
            navigate(`/profile#orders?order=${orderId}`);
        }
    };

    /**
     * Validates the checkout inputs.
     *
     * @returns {boolean} True if the inputs are valid, false otherwise.
     */
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

    /**
     * Handles placing the order.
     */
    const handlePlaceOrder = async () => {
        setError(null);
        setSuccess(null);

        if (!validateCheckoutInputs()) {
            return;
        }

        // Show processing modal
        setOrderStatus('processing');
        setModalOpen(true);
        setLoading(true);

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
                setOrderStatus('success');
                if (paymentMethod === 'online') {
                    setRedirectUrl(response.redirectUrl);
                } else {
                    setOrderId(response.data.id);
                    setSuccess('Order placed successfully!');
                    clearCart();
                }
            }
        } catch (error) {
            console.error('Order error:', error);
            setError('Failed to place order. Please try again.');
            setOrderStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return {
        isDelivery,
        paymentMethod,
        collectionMethod,
        loading,
        error,
        success,
        address,
        toggleState,
        modalOpen,
        orderStatus,
        redirectUrl,
        setAddress,
        toggleContent,
        handleCollectionMethodChange,
        handlePaymentMethodChange,
        addressIsComplete,
        handlePlaceOrder,
        closeModal
    };
};

export default useCheckout;