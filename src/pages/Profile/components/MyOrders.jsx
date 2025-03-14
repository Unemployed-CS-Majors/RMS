import React, { useState, useEffect } from "react";
import "../Profile.css";

const MyOrders = ({ orders }) => {
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
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending_payment':
            return 'status-badge-warning';
        case 'paid':
            return 'status-badge-info';
        case 'in_progress':
            return 'status-badge-primary';
        case 'ready_for_pickup':
            return 'status-badge-secondary';
        case 'out_for_delivery':
            return 'status-badge-secondary';
        case 'completed':
            return 'status-badge-success';
        case 'canceled':
            return 'status-badge-danger';
        default:
            return 'status-badge-light';
    }
  };

  // Function to format status for display
  const formatStatus = (status) => {
    return status.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {formatStatus(order.status)}
                      </span>
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
              <div className="orders-grid">
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
                    <span className={`status-badge ${getStatusBadgeClass(activeOrder.status)}`}>
                      {formatStatus(activeOrder.status)}
                    </span>
                  </span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Total</span>
                  <span className="field-value">${activeOrder.total.toFixed(2)}</span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Delivery Method</span>
                  <span className="field-value">
                    {formatDeliveryMethod(activeOrder.deliveryMethod)}
                  </span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Payment Method</span>
                  <span className="field-value">
                    {formatPaymentMethod(activeOrder.paymentMethod)}
                  </span>
                </div>
                {activeOrder.tracking && (
                  <div className="reservation-field">
                    <span className="field-label">Tracking Number</span>
                    <span className="field-value">{activeOrder.tracking}</span>
                  </div>
                )}
              </div>

              {/* Display delivery address if available */}
{activeOrder.deliveryMethod === 'home_delivery' && activeOrder.deliveryAddress && (
  <div  style={{textAlign: 'center', borderTop: '1px solid #ddd', 
    paddingTop: '15px' }}>
    <h4 
      style={{ 
        padding: '8px', 
        borderRadius: '4px',
        marginBottom: '10px',
        color: '#FF7D05',
        border: '1px solid #FF7D05'
      }}
    >
      Delivery Address
    </h4>
    <div>
      <span>
        {activeOrder.deliveryAddress.street}<br />
        {activeOrder.deliveryAddress.city}, {activeOrder.deliveryAddress.state} {activeOrder.deliveryAddress.zipCode}<br />
        {activeOrder.deliveryAddress.country}
      </span>
    </div>
  </div>
)}


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