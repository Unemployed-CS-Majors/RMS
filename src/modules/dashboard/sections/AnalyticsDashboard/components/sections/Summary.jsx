import React from 'react';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import { formatCurrency, formatStatusLabel, getDayName } from '../../../../../shared/utils/formatters';
import styles from '../charts/ChartComponents.module.css';

/**
 * Summary component for displaying a summary of various analytics data
 *
 * @param {Object} props - Component props
 * @param {Object} props.analyticsData - Analytics data for the summary
 * @param {Object} props.analyticsData.revenueAnalytics - Revenue analytics data
 * @param {Object} props.analyticsData.revenueAnalytics.dailyRevenue - Daily revenue data
 * @param {Object} props.analyticsData.orderStatusAnalytics - Order status analytics data
 * @param {Object} props.analyticsData.orderStatusAnalytics.ordersByStatus - Orders grouped by status
 * @param {Object} props.analyticsData.menuItemAnalytics - Menu item analytics data
 * @param {Array} props.analyticsData.menuItemAnalytics.topItems - Top menu items by quantity
 * @param {Object} props.analyticsData.reservationAnalytics - Reservation analytics data
 * @param {Object} props.analyticsData.reservationAnalytics.reservationsByDayOfWeek - Reservations grouped by day of the week
 * @returns {JSX.Element} The Summary component
 */
const Summary = ({ analyticsData }) => {
    const weeklyRevenueData = Object.entries(analyticsData.revenueAnalytics.dailyRevenue)
        .map(([date, value]) => ({
            name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            revenue: value,
            fullDate: date
        }))
        .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
        .slice(-7);

    const orderStatusData = Object.entries(analyticsData.orderStatusAnalytics.ordersByStatus)
        .filter(([status, count]) => count > 0)
        .map(([status, count]) => ({
            name: formatStatusLabel(status),
            value: count
        }));

    const topMenuItemsData = analyticsData.menuItemAnalytics.topItems
        .slice(0, 5)
        .map(item => ({
            name: item.name,
            sales: item.totalQuantity
        }));

    const reservationsByDayData = Object.entries(analyticsData.reservationAnalytics.reservationsByDayOfWeek)
        .map(([day, count]) => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return {
                day: days[day],
                count: count
            };
        });

    return (
        <div className={styles.grid}>
            {/* Weekly Revenue Trend */}
            <LineChartComponent
                title="Weekly Revenue Trend"
                data={weeklyRevenueData}
                dataKey="revenue"
                tooltipFormatter={(value) => [formatCurrency(value), 'Revenue']}
                legendName="Revenue"
            />

            {/* Order Status Distribution */}
            <PieChartComponent
                title="Order Status Distribution"
                data={orderStatusData}
            />

            {/* Top Menu Items */}
            <BarChartComponent
                title="Top Menu Items"
                data={topMenuItemsData}
                dataKey="sales"
                fill="#82ca9d"
                legendName="Units Sold"
            />

            {/* Reservations by Day */}
            <BarChartComponent
                title="Reservations by Day"
                data={reservationsByDayData}
                dataKey="count"
                xAxisKey="day"
                legendName="Reservations"
            />
        </div>
    );
};

export default Summary;