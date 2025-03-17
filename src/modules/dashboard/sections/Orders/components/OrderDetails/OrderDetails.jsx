import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../../../Loading/LoadingIndicator';
import styles from './OrderDetails.module.css';

/**
 * OrderDetails component
 *
 * Displays detailed information about an order, including items, status, and actions to update the status.
 *
 * @param {Object} props - Component props
 * @param {Object} props.order - The order object containing order details
 * @param {Array} props.orderItems - List of items in the order
 * @param {boolean} props.loading - Flag indicating if the order details are loading
 * @param {Function} props.onClose - Function to close the order details view
 * @param {Function} props.onStatusUpdate - Function to update the order status
 * @returns {JSX.Element} The OrderDetails component
 */
const OrderDetails = ({ order, orderItems, loading, onClose, onStatusUpdate }) => {
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);

    /**
     * Get available next status options based on current status
     *
     * @param {string} currentStatus - The current status of the order
     * @returns {Array} List of available status transitions
     */
    const getAvailableStatusTransitions = (currentStatus) => {
        const statusTransitions = {
            'pending_payment': ['paid', 'canceled'],
            'paid': ['in_progress', 'canceled'],
            'in_progress': ['ready_for_pickup', 'out_for_delivery', 'canceled'],
            'ready_for_pickup': ['completed', 'canceled'],
            'out_for_delivery': ['completed', 'canceled'],
            'completed': [],
            'canceled': []
        };

        if (!currentStatus || !statusTransitions[currentStatus]) {
            return [];
        }

        return statusTransitions[currentStatus];
    };

    /**
     * Format date for display
     *
     * @param {number} timestamp - The timestamp to format
     * @returns {string} The formatted date string
     */
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    /**
     * Handle status button click
     *
     * @param {string} newStatus - The new status to set
     */
    const handleStatusButtonClick = async (newStatus) => {
        if (newStatus === order.status) return;

        setUpdatingStatus(true);
        setUpdatingStatusId(newStatus);
        const success = await onStatusUpdate(order.id, newStatus);
        setUpdatingStatus(false);
        setUpdatingStatusId(null);
    };

    /**
     * Format delivery method for display
     *
     * @param {string} method - The delivery method
     * @returns {string} The formatted delivery method
     */
    const formatDeliveryMethod = (method) => {
        switch (method) {
            case 'home_delivery':
                return 'Home Delivery';
            case 'pickup':
                return 'Pickup';
            default:
                return method;
        }
    };

    /**
     * Format payment method for display
     *
     * @param {string} method - The payment method
     * @returns {string} The formatted payment method
     */
    const formatPaymentMethod = (method) => {
        switch (method) {
            case 'online':
                return 'Online Payment';
            case 'cash_on_delivery':
                return 'Cash on Delivery';
            case 'in_store':
                return 'In-Store Payment';
            default:
                return method;
        }
    };

    /**
     * Get status button color class
     *
     * @param {string} status - The status
     * @returns {string} The CSS class for the status button
     */
    const getStatusButtonClass = (status) => {
        switch (status) {
            case 'paid':
                return styles.statusButtonInfo;
            case 'in_progress':
                return styles.statusButtonPrimary;
            case 'ready_for_pickup':
                return styles.statusButtonWarning;
            case 'out_for_delivery':
                return styles.statusButtonWarning;
            case 'completed':
                return styles.statusButtonSuccess;
            case 'canceled':
                return styles.statusButtonDanger;
            default:
                return styles.statusButtonSecondary;
        }
    };

    /**
     * Get button label for status
     *
     * @param {string} status - The status
     * @returns {string} The label for the status button
     */
    const getStatusButtonLabel = (status) => {
        switch (status) {
            case 'paid':
                return 'Mark as Paid';
            case 'in_progress':
                return 'Start Preparing';
            case 'ready_for_pickup':
                return 'Ready for Pickup';
            case 'out_for_delivery':
                return 'Out for Delivery';
            case 'completed':
                return 'Mark as Completed';
            case 'canceled':
                return 'Cancel Order';
            default:
                return formatStatusText(status);
        }
    };

    if (loading) {
        return (
            <div className={styles.orderDetailsModal}>
                <div className={styles.orderDetailsContent}>
                    <LoadingIndicator text="Loading order details..." />
                </div>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    const availableStatusTransitions = getAvailableStatusTransitions(order.status);

    return (
        <div className={styles.orderDetailsModal}>
            <div className={styles.orderDetailsContent}>
                <div className={styles.orderDetailsHeader}>
                    <h2>Order Details</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close details"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.orderDetailsBody}>
                    <div className={styles.orderInfoSection}>
                        <h3>Order Information</h3>
                        <div className={styles.orderInfoGrid}>
                            <div className={styles.infoItem}>
                                <label>Order ID</label>
                                <div>{order.id}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Order Date</label>
                                <div>{formatDate(order.createdAt)}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Customer</label>
                                <div>{order.userName || 'Guest'}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Status</label>
                                <div className={`${styles.statusBadge} ${styles[`statusBadge${getStatusClass(order.status)}`]}`}>
                                    {formatStatusText(order.status)}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Delivery Method</label>
                                <div>{formatDeliveryMethod(order.deliveryMethod)}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Payment Method</label>
                                <div>{formatPaymentMethod(order.paymentMethod)}</div>
                            </div>
                        </div>
                    </div>

                    {order.deliveryAddress && (
                        <div className={styles.orderAddressSection}>
                            <h3>Delivery Address</h3>
                            <div className={styles.addressDetails}>
                                <p>{order.deliveryAddress.street}</p>
                                <p>
                                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                </p>
                                <p>{order.deliveryAddress.country}</p>
                            </div>
                        </div>
                    )}

                    <div className={styles.orderItemsSection}>
                        <h3>Order Items</h3>
                        <div className={styles.orderItemsList}>
                            {orderItems.map((item, index) => (
                                <div key={index} className={styles.orderItem}>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemName}>{item.name}</div>
                                        <div className={styles.itemQuantity}>Qty: {item.quantity}</div>
                                        <div className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                    {item.details && (
                                        <div className={styles.itemDetailsExpanded}>
                                            <div className={styles.itemDescription}>{item.details.description}</div>
                                            <div className={styles.itemCategory}>Category: {item.details.category}</div>
                                            {item.details.allergens && (
                                                <div className={styles.itemAllergens}>
                                                    <span>Allergens:</span> {item.details.allergens.join(', ')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.orderSummary}>
                        <div className={styles.summaryItem}>
                            <span>Subtotal:</span>
                            <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Tax:</span>
                            <span>${order.tax?.toFixed(2) || '0.00'}</span>
                        </div>
                        {order.deliveryFee > 0 && (
                            <div className={styles.summaryItem}>
                                <span>Delivery Fee:</span>
                                <span>${order.deliveryFee?.toFixed(2) || '0.00'}</span>
                            </div>
                        )}
                        <div className={`${styles.summaryItem} ${styles.total}`}>
                            <span>Total:</span>
                            <span>${order.total?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>

                    {availableStatusTransitions.length > 0 && (
                        <div className={styles.orderActions}>
                            <h3>Update Order Status</h3>
                            <div className={styles.statusButtons}>
                                {availableStatusTransitions.map(status => (
                                    <button
                                        key={status}
                                        className={`${styles.statusButton} ${getStatusButtonClass(status)}`}
                                        onClick={() => handleStatusButtonClick(status)}
                                        disabled={updatingStatus}
                                    >
                                        {updatingStatus && updatingStatusId === status ? (
                                            <span className={styles.buttonLoader}></span>
                                        ) : (
                                            getStatusButtonLabel(status)
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Helper function to get status badge class
 *
 * @param {string} status - The status
 * @returns {string} The CSS class for the status badge
 */
function getStatusClass(status) {
    switch (status) {
        case 'pending_payment':
            return 'Warning';
        case 'paid':
            return 'Info';
        case 'in_progress':
            return 'Primary';
        case 'ready_for_pickup':
            return 'Secondary';
        case 'out_for_delivery':
            return 'Secondary';
        case 'completed':
            return 'Success';
        case 'canceled':
            return 'Danger';
        default:
            return 'Light';
    }
}

/**
 * Helper function to format status text
 *
 * @param {string} status - The status
 * @returns {string} The formatted status text
 */
function formatStatusText(status) {
    return status.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

export default OrderDetails;