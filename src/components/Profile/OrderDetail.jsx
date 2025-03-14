import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Format delivery method for display
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
 * OrderItems component displays order items in a table
 */
const OrderItems = ({items, total}) => {
    return (<div className="history-table-container">
            <table className="history-table">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (<tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>))}
                <tr className="total-row">
                    <td colSpan="3" style={{textAlign: 'right', fontWeight: '600'}}>Total:</td>
                    <td style={{fontWeight: '600'}}>${total.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
        </div>);
};

/**
 * DeliveryAddress component displays the delivery address if available
 */
const DeliveryAddress = ({address}) => {
    if (!address) return null;

    return (<div style={{marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px'}}>
            <h4 style={{
                marginBottom: '10px', fontSize: '15px', color: '#FF7D05', fontWeight: '500'
            }}>
                Delivery Address
            </h4>
            <div style={{
                padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '6px', fontSize: '14px', lineHeight: '1.5'
            }}>
        <span>
          {address.street}<br/>
            {address.city}, {address.county} {address.eircode}<br/>
            {address.country}
        </span>
            </div>
        </div>);
};

/**
 * OrderDetail component displays details for a single order
 */
const OrderDetail = ({order}) => {
    if (!order) return null;

    return (<>
            <div className="reservation-field" style={{marginBottom: '10px'}}>
                <span className="field-label">Order ID</span>
                <span className="field-value">{order.id}</span>
            </div>

            <div className="orders-grid">
                <div className="reservation-field">
                    <span className="field-label">Date</span>
                    <span className="field-value">{order.date}</span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Status</span>
                    <span className="field-value">
            <StatusBadge status={order.status}/>
          </span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Total</span>
                    <span className="field-value">${order.total.toFixed(2)}</span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Delivery</span>
                    <span className="field-value">
            {formatDeliveryMethod(order.deliveryMethod)}
          </span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Payment</span>
                    <span className="field-value">
            {formatPaymentMethod(order.paymentMethod)}
          </span>
                </div>
            </div>

            {/* Display delivery address if available */}
            {order.deliveryMethod === 'home_delivery' && (<DeliveryAddress address={order.deliveryAddress}/>)}

            <h4 style={{
                marginTop: '15px', marginBottom: '10px', fontSize: '15px', color: '#FF7D05', fontWeight: '500'
            }}>Order Items</h4>

            <OrderItems items={order.items} total={order.total}/>
        </>);
};

export {OrderDetail, OrderItems, DeliveryAddress};