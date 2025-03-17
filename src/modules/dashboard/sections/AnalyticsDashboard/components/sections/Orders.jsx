import React from 'react';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import { CenteredMetric } from '../charts/MetricsDisplay';
import { formatStatusLabel, formatMethodLabel } from '../../../../../shared/utils/formatters';
import styles from '../charts/ChartComponents.module.css';

/**
 * Orders component for displaying analytics data related to orders
 *
 * @param {Object} props - Component props
 * @param {Object} props.analyticsData - Analytics data for orders
 * @param {Object} props.analyticsData.orderStatusAnalytics - Order status analytics data
 * @param {Object} props.analyticsData.orderStatusAnalytics.ordersByStatus - Orders grouped by status
 * @param {Object} props.analyticsData.orderStatusAnalytics.ordersByPaymentMethod - Orders grouped by payment method
 * @param {Object} props.analyticsData.orderStatusAnalytics.ordersByDeliveryMethod - Orders grouped by delivery method
 * @param {number} props.analyticsData.orderStatusAnalytics.averageCompletionTime - Average order completion time
 * @returns {JSX.Element} The Orders component
 */
const Orders = ({ analyticsData }) => {
    const ordersByStatusData = Object.entries(analyticsData.orderStatusAnalytics.ordersByStatus)
        .map(([status, count]) => ({
            name: formatStatusLabel(status),
            count: count
        }));

    const ordersByPaymentMethodData = Object.entries(analyticsData.orderStatusAnalytics.ordersByPaymentMethod)
        .filter(([method, count]) => count > 0)
        .map(([method, count]) => ({
            name: formatMethodLabel(method),
            value: count
        }));

    const ordersByDeliveryMethodData = Object.entries(analyticsData.orderStatusAnalytics.ordersByDeliveryMethod)
        .filter(([method, count]) => count > 0)
        .map(([method, count]) => ({
            name: formatMethodLabel(method),
            value: count
        }));

    const avgCompletionTimeValue = `${analyticsData.orderStatusAnalytics.averageCompletionTime.toFixed(1)} minutes`;
    const avgCompletionTimeDescription = "Average time from order placement to completion";

    return (
        <div className={styles.grid}>
            {/* Orders by Status */}
            <BarChartComponent
                title="Orders by Status"
                data={ordersByStatusData}
                dataKey="count"
                legendName="Number of Orders"
            />

            {/* Orders by Payment Method */}
            <PieChartComponent
                title="Orders by Payment Method"
                data={ordersByPaymentMethodData}
            />

            {/* Orders by Delivery Method */}
            <PieChartComponent
                title="Orders by Delivery Method"
                data={ordersByDeliveryMethodData}
            />

            {/* Average Completion Time */}
            <CenteredMetric
                title="Average Order Completion Time"
                value={avgCompletionTimeValue}
                description={avgCompletionTimeDescription}
            />
        </div>
    );
};

export default Orders;