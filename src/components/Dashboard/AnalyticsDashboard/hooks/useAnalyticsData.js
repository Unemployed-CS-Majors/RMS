// src/components/Analytics/Dashboard/hooks/useAnalyticsData.js
import { useState, useEffect, useCallback } from 'react';
import analyticsService from '../../../../services/analytics.service';

export const useAnalyticsData = (timeRange, setExternalLoading) => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setError(null);

        try {
            // Fetch all analytics data at once
            const data = await analyticsService.getAllAnalytics(timeRange);

            // Transform data - convert itemsByRevenue to an array
            const itemsByRevenueArray = Object.entries(data.menuItemAnalytics.itemsByRevenue)
                .map(([id, revenue]) => ({
                    id,
                    revenue
                }));

            // Update the state with the transformed data
            setAnalyticsData({
                ...data,
                menuItemAnalytics: {
                    ...data.menuItemAnalytics,
                    itemsByRevenue: itemsByRevenueArray
                }
            });
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            setError("Failed to load analytics data. Please try again later.");
        }
    }, [timeRange, setExternalLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { analyticsData, loading, error, fetchData };
};
