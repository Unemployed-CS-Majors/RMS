import React from 'react';
import styles from './OrderList.module.css';

const OrderList = ({orders, onSelectOrder, onStatusUpdate}) => {
    // Function to format date and time
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Function to determine badge color based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending_payment':
                return styles.statusBadgeWarning;
            case 'paid':
                return styles.statusBadgeInfo;
            case 'in_progress':
                return styles.statusBadgePrimary;
            case 'ready_for_pickup':
                return styles.statusBadgeSecondary;
            case 'out_for_delivery':
                return styles.statusBadgeSecondary;
            case 'completed':
                return styles.statusBadgeSuccess;
            case 'canceled':
                return styles.statusBadgeDanger;
            default:
                return styles.statusBadgeLight;
        }
    };

    // Function to format status for display
    const formatStatus = (status) => {
        return status.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Function to format payment method for display
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

    // Function to format delivery method for display
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

    // Display a message if there are no orders
    if (!orders || orders.length === 0) {
        return (
            <div className={styles.emptyState}>
                <svg className={styles.emptyStateIcon} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <h3>No Orders Found</h3>
                <p>There are no orders matching your current filters.</p>
            </div>
        );
    }

    return (
        <table className={styles.ordersTable}>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Delivery Method</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id} onClick={() => onSelectOrder(order)}>
                    <td className={styles.orderId}>{order.id.substring(0, 8)}...</td>
                    <td>{formatDateTime(order.createdAt)}</td>
                    <td>{order.userName || 'Guest'}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{formatDeliveryMethod(order.deliveryMethod)}</td>
                    <td>{formatPaymentMethod(order.paymentMethod)}</td>
                    <td>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(order.status)}`}>
                            {formatStatus(order.status)}
                        </span>
                    </td>
                    <td>
                        <div className={styles.actionButtons}>
                            <button
                                className={styles.viewButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectOrder(order);
                                }}
                            >
                                View
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default OrderList;