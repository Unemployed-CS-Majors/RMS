import React from 'react';
import PieChartComponent from '../charts/PieChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import { MetricsList } from '../charts/MetricsDisplay';
import { formatCurrency, formatMethodLabel } from '../../../../../shared/utils/formatters';
import styles from '../charts/ChartComponents.module.css';

/**
 * Revenue component for displaying analytics data related to revenue
 *
 * @param {Object} props - Component props
 * @param {Object} props.analyticsData - Analytics data for revenue
 * @param {Object} props.analyticsData.revenueAnalytics - Revenue analytics data
 * @param {Object} props.analyticsData.revenueAnalytics.revenueByPaymentMethod - Revenue grouped by payment method
 * @param {Object} props.analyticsData.revenueAnalytics.revenueByDeliveryMethod - Revenue grouped by delivery method
 * @param {Object} props.analyticsData.revenueAnalytics.weeklyRevenue - Weekly revenue data
 * @param {number} props.analyticsData.revenueAnalytics.totalRevenue - Total revenue for the period
 * @param {number} props.analyticsData.revenueAnalytics.averageOrderValue - Average order value
 * @param {number} props.timeRange - Time range for the analytics data
 * @returns {JSX.Element} The Revenue component
 */
const Revenue = ({ analyticsData, timeRange }) => {
    const paymentMethodData = Object.entries(analyticsData.revenueAnalytics.revenueByPaymentMethod)
        .filter(([method, value]) => value > 0)
        .map(([method, value]) => ({
            name: formatMethodLabel(method),
            value: value
        }));

    const deliveryMethodData = Object.entries(analyticsData.revenueAnalytics.revenueByDeliveryMethod)
        .filter(([method, value]) => value > 0)
        .map(([method, value]) => ({
            name: formatMethodLabel(method),
            value: value
        }));

    const weeklyRevenueData = Object.entries(analyticsData.revenueAnalytics.weeklyRevenue)
        .map(([week, value]) => ({
            name: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: value,
            fullDate: week
        }))
        .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
        .slice(-4);

    const revenueMetrics = [
        {
            title: 'Total Revenue (Period)',
            value: formatCurrency(analyticsData.revenueAnalytics.totalRevenue)
        },
        {
            title: 'Average Order Value',
            value: formatCurrency(analyticsData.revenueAnalytics.averageOrderValue)
        },
        {
            title: 'Revenue Per Day (Avg)',
            value: formatCurrency(analyticsData.revenueAnalytics.totalRevenue / timeRange)
        }
    ];

    return (
        <div className={styles.grid}>
            {/* Revenue by Payment Method */}
            <PieChartComponent
                title="Revenue by Payment Method"
                data={paymentMethodData}
                tooltipFormatter={(value) => [formatCurrency(value), '']}
            />

            {/* Revenue by Delivery Method */}
            <PieChartComponent
                title="Revenue by Delivery Method"
                data={deliveryMethodData}
                tooltipFormatter={(value) => [formatCurrency(value), '']}
            />

            {/* Weekly Revenue Breakdown */}
            <BarChartComponent
                title="Weekly Revenue Breakdown"
                data={weeklyRevenueData}
                dataKey="revenue"
                tooltipFormatter={(value) => [formatCurrency(value), 'Revenue']}
                legendName="Weekly Revenue"
            />

            {/* Key Revenue Metrics */}
            <MetricsList
                title="Key Revenue Metrics"
                metrics={revenueMetrics}
            />
        </div>
    );
};

export default Revenue;