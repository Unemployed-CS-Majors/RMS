import React, { useState, useEffect } from "react";
import "../Profile.css";

const MyOrders = ({ orders = [] }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Handler for viewing order details
  const handleViewDetails = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setActiveOrder(order);
    setShowOrderDetails(true);
  };

  // Handler for closing order details modal
  const closeOrderDetails = () => {
    setShowOrderDetails(false);
  };
  

  return (
    <div className="content">
      <div className="content-header">
        <h2>My Orders</h2>
      </div>

      <div className="card history-card">
        <div className="card-header">
          <h3>Order History</h3>
        </div>
        <div className="card-body">
          {orders.length > 0 ? (
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
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td 
                      style={{ 
                        color: 
                          order.status === "Delivered" ? "#4CAF50" : 
                          order.status === "Processing" ? "#FF9800" : 
                          order.status === "Cancelled" ? "#e74c3c" : "#3498db",
                        fontWeight: "500"
                      }}
                    >
                      {order.status}
                    </td>
                    <td>
                      <button
                        className="manage-btn-small"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
              No order history found.
            </p>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && activeOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Order Details - #{activeOrder.id}</h3>
            </div>
            <div className="modal-body">
              <div className="reservation-grid">
                <div className="reservation-field">
                  <span className="field-label">Order Date</span>
                  <span className="field-value">{activeOrder.date}</span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Status</span>
                  <span className="field-value" style={{ 
                    color: 
                      activeOrder.status === "Delivered" ? "#4CAF50" : 
                      activeOrder.status === "Processing" ? "#FF9800" : 
                      activeOrder.status === "Cancelled" ? "#e74c3c" : "#3498db",
                    fontWeight: "500"
                  }}>
                    {activeOrder.status}
                  </span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Total</span>
                  <span className="field-value">${activeOrder.total.toFixed(2)}</span>
                </div>
                {activeOrder.tracking && (
                  <div className="reservation-field">
                    <span className="field-label">Tracking Number</span>
                    <span className="field-value">{activeOrder.tracking}</span>
                  </div>
                )}
              </div>

              <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Items</h4>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={closeOrderDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

