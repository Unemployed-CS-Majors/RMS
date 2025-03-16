import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Profile/Modal/Modal";
import { OrderDetail } from "../../../../components/Profile/OrderDetail/OrderDetail";
import StatusBadge from "../../../../components/Profile/StatusBadge/StatusBadge";
import { formatId } from "../../../../utils/dateUtils";
import layoutStyles from '../../../../components/Profile/ProfileLayout.module.css';
import tableStyles from '../../../../components/Profile/TableComponents.module.css';

/**
 * OrderHistory component displays past orders in a table
 */
const OrderHistory = ({ orders, onViewDetails }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className={layoutStyles.card}>
            <div className={layoutStyles.cardHeader}>
                <h3>Order History</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                {orders.length > 0 ? (
                    <div className={tableStyles.historyTableContainer}>
                        <table className={tableStyles.historyTable}>
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
                                            className={tableStyles.manageBtnSmall}
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
        <div className={layoutStyles.content}>
            <div className={layoutStyles.contentHeader}>
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
                    <button className={layoutStyles.btnPrimary} onClick={closeOrderDetails}>
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