import React from 'react';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import {MetricsGrid} from '../charts/MetricsDisplay';
import {formatPercent, getFullDayName} from '../../../../../shared/utils/formatters';
import styles from '../charts/ChartComponents.module.css';

/**
 * Reservations component for displaying analytics data related to reservations
 *
 * @param {Object} props - Component props
 * @param {Object} props.analyticsData - Analytics data for reservations
 * @param {Object} props.analyticsData.reservationAnalytics - Reservation analytics data
 * @param {Object} props.analyticsData.reservationAnalytics.reservationsByDayOfWeek - Reservations grouped by day of the week
 * @param {Object} props.analyticsData.reservationAnalytics.reservationsByStatus - Reservations grouped by status
 * @param {Object} props.analyticsData.reservationAnalytics.tablePopularity - Table popularity data
 * @param {number} props.analyticsData.reservationAnalytics.totalReservations - Total number of reservations
 * @param {number} props.analyticsData.reservationAnalytics.averagePartySize - Average party size for reservations
 * @param {number} props.analyticsData.reservationAnalytics.cancellationRate - Cancellation rate for reservations
 * @param {number} props.timeRange - Time range for the analytics data
 * @returns {JSX.Element} The Reservations component
 */
const Reservations = ({analyticsData, timeRange}) => {
    const reservationsByDayData = Object.entries(analyticsData.reservationAnalytics.reservationsByDayOfWeek)
        .map(([day, count]) => ({
            day: getFullDayName(day),
            count: count
        }));

    const reservationsByStatusData = Object.entries(analyticsData.reservationAnalytics.reservationsByStatus)
        .filter(([status, count]) => count > 0)
        .map(([status, count]) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
            value: count
        }));

    const tablePopularityData = Object.entries(analyticsData.reservationAnalytics.tablePopularity)
        .map(([tableNum, count]) => ({
            table: tableNum,
            reservations: count
        }))
        .sort((a, b) => b.reservations - a.reservations)
        .slice(0, 8);

    const reservationMetrics = [
        {
            title: 'Total Reservations',
            value: analyticsData.reservationAnalytics.totalReservations.toString()
        },
        {
            title: 'Average Party Size',
            value: `${analyticsData.reservationAnalytics.averagePartySize.toFixed(1)} people`
        },
        {
            title: 'Cancellation Rate',
            value: formatPercent(analyticsData.reservationAnalytics.cancellationRate * 100)
        },
        {
            title: 'Weekly Average',
            value: (analyticsData.reservationAnalytics.totalReservations / (timeRange / 7)).toFixed(1)
        }
    ];

    return (
        <div className={styles.grid}>
            {/* Reservations by Day of Week */}
            <BarChartComponent
                title="Reservations by Day of Week"
                data={reservationsByDayData}
                dataKey="count"
                xAxisKey="day"
                legendName="Reservations"
            />

            {/* Reservations by Status */}
            <PieChartComponent
                title="Reservations by Status"
                data={reservationsByStatusData}
            />

            {/* Table Popularity */}
            <BarChartComponent
                title="Table Popularity"
                data={tablePopularityData}
                dataKey="reservations"
                xAxisKey="table"
                fill="#82ca9d"
                legendName="Number of Reservations"
            />

            {/* Reservation Statistics */}
            <MetricsGrid
                title="Reservation Statistics"
                metrics={reservationMetrics}
            />
        </div>
    );
};

export default Reservations;