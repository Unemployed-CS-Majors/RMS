import {useCallback, useEffect, useState} from 'react';
import analyticsService from '../../../../../services/analytics.service';

/**
 * Custom hook to fetch and manage analytics data
 *
 * @param {number} timeRange - The time range for the analytics data
 * @param {Function} setExternalLoading - Function to set external loading state
 * @returns {Object} The analytics data, loading state, error state, and fetchData function
 */
export const useAnalyticsData = (timeRange, setExternalLoading) => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetches analytics data from the service and updates the state
     */
    const fetchData = useCallback(async () => {
        setError(null);
        setLoading(true);
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
            setLoading(false);
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            setError("Failed to load analytics data. Please try again later.");
        }
    }, [timeRange]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {analyticsData, loading, error, fetchData};
};