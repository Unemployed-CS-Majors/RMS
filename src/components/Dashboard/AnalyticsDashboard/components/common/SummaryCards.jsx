
import React from 'react';

const SummaryCards = ({ dashboardSummary, operationalAnalytics }) => {
    return (
        <div className="rms-analytics-summary-cards">
            <div className="rms-analytics-dashboard-card rms-analytics-summary-card">
                <div className="rms-analytics-summary-icon rms-analytics-revenue-icon">💰</div>
                <div className="rms-analytics-summary-data">
                    <h3 className="rms-analytics-summary-title">Today's Revenue</h3>
                    <p className="rms-analytics-summary-value">${dashboardSummary.todayRevenue.toFixed(2)}</p>
                    <p className={`rms-analytics-summary-change ${dashboardSummary.revenueChange >= 0 ? 'positive' : 'negative'}`}>
                        {dashboardSummary.revenueChange >= 0 ? '↑' : '↓'}
                        {Math.abs(dashboardSummary.revenueChange).toFixed(1)}% from yesterday
                    </p>
                </div>
            </div>

            <div className="rms-analytics-dashboard-card rms-analytics-summary-card">
                <div className="rms-analytics-summary-icon rms-analytics-orders-icon">🛒</div>
                <div className="rms-analytics-summary-data">
                    <h3 className="rms-analytics-summary-title">Today's Orders</h3>
                    <p className="rms-analytics-summary-value">{dashboardSummary.todayOrders}</p>
                    <p className="rms-analytics-summary-subtext">{dashboardSummary.activeOrdersCount} active now</p>
                </div>
            </div>

            <div className="rms-analytics-dashboard-card rms-analytics-summary-card">
                <div className="rms-analytics-summary-icon rms-analytics-reservations-icon">📅</div>
                <div className="rms-analytics-summary-data">
                    <h3 className="rms-analytics-summary-title">Today's Reservations</h3>
                    <p className="rms-analytics-summary-value">{dashboardSummary.todayReservationsCount}</p>
                    <p className="rms-analytics-summary-subtext">
                        Table occupancy: {operationalAnalytics.currentStats.tableUtilizationRate.toFixed(0)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
