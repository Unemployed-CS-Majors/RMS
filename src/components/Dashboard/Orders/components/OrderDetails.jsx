import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../../Loading/LoadingIndicator';
import './OrderDetails.css';

const OrderDetails = ({ order, orderItems, loading, onClose, onStatusUpdate }) => {
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);

    // Get available next status options based on current status
    const getAvailableStatusTransitions = (currentStatus) => {
        // Define status transitions
        // This prevents skipping steps in the order process
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

        // Return only the statuses that are valid transitions from the current status
        return statusTransitions[currentStatus];
    };

    // Format date for display
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

    // Handle status button click
    const handleStatusButtonClick = async (newStatus) => {
        if (newStatus === order.status) return;

        setUpdatingStatus(true);
        setUpdatingStatusId(newStatus);
        const success = await onStatusUpdate(order.id, newStatus);
        setUpdatingStatus(false);
        setUpdatingStatusId(null);
    };

    // Format delivery method for display
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

    // Format payment method for display
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

    // Get status button color class
    const getStatusButtonClass = (status) => {
        switch (status) {
            case 'paid':
                return 'status-button-info';
            case 'in_progress':
                return 'status-button-primary';
            case 'ready_for_pickup':
                return 'status-button-warning';
            case 'out_for_delivery':
                return 'status-button-warning';
            case 'completed':
                return 'status-button-success';
            case 'canceled':
                return 'status-button-danger';
            default:
                return 'status-button-secondary';
        }
    };

    // Get button label for status
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
            <div className="order-details-modal">
                <div className="order-details-content">
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
        <div className="order-details-modal">
            <div className="order-details-content">
                <div className="order-details-header">
                    <h2>Order Details</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close details"
                    >
                        ×
                    </button>
                </div>

                <div className="order-details-body">
                    <div className="order-info-section">
                        <h3>Order Information</h3>
                        <div className="order-info-grid">
                            <div className="info-item">
                                <label>Order ID</label>
                                <div>{order.id}</div>
                            </div>
                            <div className="info-item">
                                <label>Order Date</label>
                                <div>{formatDate(order.createdAt)}</div>
                            </div>
                            <div className="info-item">
                                <label>Customer</label>
                                <div>{order.userName || 'Guest'}</div>
                            </div>
                            <div className="info-item">
                                <label>Status</label>
                                <div className={`status-badge status-badge-${getStatusClass(order.status)}`}>
                                    {formatStatusText(order.status)}
                                </div>
                            </div>
                            <div className="info-item">
                                <label>Delivery Method</label>
                                <div>{formatDeliveryMethod(order.deliveryMethod)}</div>
                            </div>
                            <div className="info-item">
                                <label>Payment Method</label>
                                <div>{formatPaymentMethod(order.paymentMethod)}</div>
                            </div>
                        </div>
                    </div>

                    {order.deliveryAddress && (
                        <div className="order-address-section">
                            <h3>Delivery Address</h3>
                            <div className="address-details">
                                <p>{order.deliveryAddress.street}</p>
                                <p>
                                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                </p>
                                <p>{order.deliveryAddress.country}</p>
                            </div>
                        </div>
                    )}

                    <div className="order-items-section">
                        <h3>Order Items</h3>
                        <div className="order-items-list">
                            {orderItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-details">
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-quantity">Qty: {item.quantity}</div>
                                        <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                    {item.details && (
                                        <div className="item-details-expanded">
                                            <div className="item-description">{item.details.description}</div>
                                            <div className="item-category">Category: {item.details.category}</div>
                                            {item.details.allergens && (
                                                <div className="item-allergens">
                                                    <span>Allergens:</span> {item.details.allergens.join(', ')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-summary">
                        <div className="summary-item">
                            <span>Subtotal:</span>
                            <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className="summary-item">
                            <span>Tax:</span>
                            <span>${order.tax?.toFixed(2) || '0.00'}</span>
                        </div>
                        {order.deliveryFee > 0 && (
                            <div className="summary-item">
                                <span>Delivery Fee:</span>
                                <span>${order.deliveryFee?.toFixed(2) || '0.00'}</span>
                            </div>
                        )}
                        <div className="summary-item total">
                            <span>Total:</span>
                            <span>${order.total?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>

                    {availableStatusTransitions.length > 0 && (
                        <div className="order-actions">
                            <h3>Update Order Status</h3>
                            <div className="status-buttons">
                                {availableStatusTransitions.map(status => (
                                    <button
                                        key={status}
                                        className={`status-button ${getStatusButtonClass(status)}`}
                                        onClick={() => handleStatusButtonClick(status)}
                                        disabled={updatingStatus}
                                    >
                                        {updatingStatus && updatingStatusId === status ? (
                                            <span className="button-loader"></span>
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

// Helper function to get status badge class
function getStatusClass(status) {
    switch (status) {
        case 'pending_payment':
            return 'warning';
        case 'paid':
            return 'info';
        case 'in_progress':
            return 'primary';
        case 'ready_for_pickup':
            return 'secondary';
        case 'out_for_delivery':
            return 'secondary';
        case 'completed':
            return 'success';
        case 'canceled':
            return 'danger';
        default:
            return 'light';
    }
}

// Helper function to format status text
function formatStatusText(status) {
    return status.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

export default OrderDetails;