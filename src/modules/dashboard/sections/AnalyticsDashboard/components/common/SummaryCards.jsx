import React from 'react';
import styles from './SummaryCards.module.css';

const SummaryCards = ({ dashboardSummary, operationalAnalytics }) => {
    return (
        <div className={styles.summaryCards}>
            <div className={`${styles.dashboardCard} ${styles.summaryCard}`}>
                <div className={`${styles.summaryIcon} ${styles.revenueIcon}`}>💰</div>
                <div className={styles.summaryData}>
                    <h3 className={styles.summaryTitle}>Today's Revenue</h3>
                    <p className={styles.summaryValue}>${dashboardSummary.todayRevenue.toFixed(2)}</p>
                    <p className={`${styles.summaryChange} ${dashboardSummary.revenueChange >= 0 ? styles.positive : styles.negative}`}>
                        {dashboardSummary.revenueChange >= 0 ? '↑' : '↓'}
                        {Math.abs(dashboardSummary.revenueChange).toFixed(1)}% from yesterday
                    </p>
                </div>
            </div>

            <div className={`${styles.dashboardCard} ${styles.summaryCard}`}>
                <div className={`${styles.summaryIcon} ${styles.ordersIcon}`}>🛒</div>
                <div className={styles.summaryData}>
                    <h3 className={styles.summaryTitle}>Today's Orders</h3>
                    <p className={styles.summaryValue}>{dashboardSummary.todayOrders}</p>
                    <p className={styles.summarySubtext}>{dashboardSummary.activeOrdersCount} active now</p>
                </div>
            </div>

            <div className={`${styles.dashboardCard} ${styles.summaryCard}`}>
                <div className={`${styles.summaryIcon} ${styles.reservationsIcon}`}>📅</div>
                <div className={styles.summaryData}>
                    <h3 className={styles.summaryTitle}>Today's Reservations</h3>
                    <p className={styles.summaryValue}>{dashboardSummary.todayReservationsCount}</p>
                    <p className={styles.summarySubtext}>
                        Table occupancy: {operationalAnalytics.currentStats.tableUtilizationRate.toFixed(0)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;