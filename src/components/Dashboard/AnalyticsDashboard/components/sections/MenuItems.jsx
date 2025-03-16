import React from 'react';
import BarChartComponent from '../charts/BarChartComponent';
import { CenteredMetric } from '../charts/MetricsDisplay';
import { formatCurrency } from '../../../../../utils/formatters';
import styles from '../charts/ChartComponents.module.css';

const MenuItems = ({ analyticsData }) => {
    const topItemsData = analyticsData.menuItemAnalytics.topItems
        .slice(0, 5)
        .map(item => ({
            name: item.name,
            quantity: item.totalQuantity
        }));

    const bottomItemsData = analyticsData.menuItemAnalytics.bottomItems
        .slice(0, 5)
        .map(item => ({
            name: item.name,
            quantity: item.totalQuantity
        }));

    const topItemsByRevenueData = analyticsData.menuItemAnalytics.itemsByRevenue
        .slice(0, 5)
        .map(item => ({
            name: item.name || `Item ${item.id}`,
            revenue: item.revenue
        }));

    const avgPrepTimeValue = `${analyticsData.menuItemAnalytics.averagePreparationTime.toFixed(1)} minutes`;
    const avgPrepTimeDescription = "Average preparation time across all menu items";

    return (
        <div className={styles.grid}>
            {/* Top Items by Quantity */}
            <BarChartComponent
                title="Top Menu Items by Quantity"
                data={topItemsData}
                dataKey="quantity"
                fill="#82ca9d"
                legendName="Units Sold"
            />

            {/* Bottom Items by Quantity */}
            <BarChartComponent
                title="Least Popular Menu Items"
                data={bottomItemsData}
                dataKey="quantity"
                fill="#FF8042"
                legendName="Units Sold"
            />

            {/* Top Items by Revenue */}
            <BarChartComponent
                title="Top Menu Items by Revenue"
                data={topItemsByRevenueData}
                dataKey="revenue"
                tooltipFormatter={(value) => [formatCurrency(value), 'Revenue']}
                legendName="Revenue"
            />

            {/* Average Preparation Time */}
            <CenteredMetric
                title="Average Preparation Time"
                value={avgPrepTimeValue}
                description={avgPrepTimeDescription}
            />
        </div>
    );
};

export default MenuItems;