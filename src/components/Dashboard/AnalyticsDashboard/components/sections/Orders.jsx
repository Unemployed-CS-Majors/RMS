import React from 'react';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import { CenteredMetric } from '../charts/MetricsDisplay';
import { formatStatusLabel, formatMethodLabel } from '../../../../../utils/formatters';
import styles from '../charts/ChartComponents.module.css';

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