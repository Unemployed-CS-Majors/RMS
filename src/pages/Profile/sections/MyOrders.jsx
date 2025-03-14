import React, { useState, useEffect } from "react";
import Modal from "../../../components/Profile/Modal";
import { OrderDetail } from "../../../components/Profile/OrderDetail";
import StatusBadge from "../../../components/Profile/StatusBadge";
import { formatId } from "../../../utils/dateUtils";

/**
 * OrderHistory component displays past orders in a table
 */
const OrderHistory = ({ orders, onViewDetails }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="card history-card">
            <div className="card-header">
                <h3>Order History</h3>
            </div>
            <div className="card-body">
                {orders.length > 0 ? (
                    <div className="history-table-container">
                        <table className="history-table">
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{formatId(order.id, isMobile)}</td>
                                    <td>{order.date}</td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td>
                                        <button
                                            className="manage-btn-small"
                                            onClick={() => onViewDetails(order.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
                        No order history found.
                    </p>
                )}
            </div>
        </div>
    );
};

/**
 * Main MyOrders component
 */
const MyOrders = ({
                      orders,
                      initialSelectedId,
                      handleViewDetails,
                      clearSelectedOrder
                  }) => {
    const [activeOrder, setActiveOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    // Use initialSelectedId to automatically open order details if provided
    useEffect(() => {
        if (initialSelectedId) {
            const order = orders.find(order => order.id === initialSelectedId);
            if (order) {
                setActiveOrder(order);
                setShowOrderDetails(true);
            }
        }
    }, [initialSelectedId, orders]);

    // Handler for viewing order details
    const onViewDetails = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        setActiveOrder(order);
        setShowOrderDetails(true);

        // Update URL via parent component
        handleViewDetails(orderId);
    };

    // Handler for closing order details modal
    const closeOrderDetails = () => {
        setShowOrderDetails(false);
        clearSelectedOrder();
    };

    return (
        <div className="content">
            <div className="content-header">
                <h2>My Orders</h2>
            </div>

            {/* Order History */}
            <OrderHistory orders={orders} onViewDetails={onViewDetails} />

            {/* Order Details Modal */}
            <Modal
                isOpen={showOrderDetails}
                onClose={closeOrderDetails}
                title="Order Details"
                actions={
                    <button className="btn-primary" onClick={closeOrderDetails}>
                        Close
                    </button>
                }
            >
                {activeOrder && <OrderDetail order={activeOrder} />}
            </Modal>
        </div>
    );
};

export default MyOrders;