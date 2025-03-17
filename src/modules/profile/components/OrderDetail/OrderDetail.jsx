import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import styles from './OrderDetail.module.css';
import tableStyles from '../TableComponents.module.css';
import reservationStyles from '../ReservationDetail/ReservationDetail.module.css';

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
    return (
        <div className={tableStyles.historyTableContainer}>
            <table className={tableStyles.historyTable}>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                ))}
                <tr className={tableStyles.totalRow}>
                    <td colSpan="3" style={{textAlign: 'right', fontWeight: '600'}}>Total:</td>
                    <td style={{fontWeight: '600'}}>${total.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

/**
 * DeliveryAddress component displays the delivery address if available
 */
const DeliveryAddress = ({address}) => {
    if (!address) return null;

    return (
        <div className={styles.deliveryAddress}>
            <h4 className={styles.sectionTitle}>
                Delivery Address
            </h4>
            <div className={styles.addressBlock}>
                <span>
                    {address.street}<br/>
                    {address.city}, {address.county} {address.eircode}<br/>
                    {address.country}
                </span>
            </div>
        </div>
    );
};

/**
 * OrderDetail component displays details for a single order
 */
const OrderDetail = ({order}) => {
    if (!order) return null;

    return (
        <>
            <div className={reservationStyles.reservationField} style={{marginBottom: '10px'}}>
                <span className={reservationStyles.fieldLabel}>Order ID</span>
                <span className={reservationStyles.fieldValue}>{order.id}</span>
            </div>

            <div className={styles.ordersGrid}>
                <div className={reservationStyles.reservationField}>
                    <span className={reservationStyles.fieldLabel}>Date</span>
                    <span className={reservationStyles.fieldValue}>{order.date}</span>
                </div>
                <div className={reservationStyles.reservationField}>
                    <span className={reservationStyles.fieldLabel}>Status</span>
                    <span className={reservationStyles.fieldValue}>
                        <StatusBadge status={order.status}/>
                    </span>
                </div>
                <div className={reservationStyles.reservationField}>
                    <span className={reservationStyles.fieldLabel}>Total</span>
                    <span className={reservationStyles.fieldValue}>${order.total.toFixed(2)}</span>
                </div>
                <div className={reservationStyles.reservationField}>
                    <span className={reservationStyles.fieldLabel}>Delivery</span>
                    <span className={reservationStyles.fieldValue}>
                        {formatDeliveryMethod(order.deliveryMethod)}
                    </span>
                </div>
                <div className={reservationStyles.reservationField}>
                    <span className={reservationStyles.fieldLabel}>Payment</span>
                    <span className={reservationStyles.fieldValue}>
                        {formatPaymentMethod(order.paymentMethod)}
                    </span>
                </div>
            </div>

            {/* Display delivery address if available */}
            {order.deliveryMethod === 'home_delivery' && (
                <DeliveryAddress address={order.deliveryAddress}/>
            )}

            <h4 className={styles.sectionTitle}>Order Items</h4>

            <OrderItems items={order.items} total={order.total}/>
        </>
    );
};

export {OrderDetail, OrderItems, DeliveryAddress};