import axiosInstance from '../config/apiConfig';

const analyticsService = {
    /**
     * Get dashboard summary data
     *
     * @returns {Promise<Object>} The dashboard summary data
     */
    getDashboardSummary: async () => {
        const response = await axiosInstance.get('/analytics/dashboard-summary');
        return response.data.data;
    },

    /**
     * Get revenue analytics
     *
     * @param {number} [days=30] - The number of days to retrieve data for
     * @returns {Promise<Object>} The revenue analytics data
     */
    getRevenueAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/revenue?days=${days}`);
        return response.data.data;
    },

    /**
     * Get menu item analytics
     *
     * @param {number} [days=30] - The number of days to retrieve data for
     * @returns {Promise<Object>} The menu item analytics data
     */
    getMenuItemAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/menu-items?days=${days}`);
        return response.data.data;
    },

    /**
     * Get reservation analytics
     *
     * @param {number} [days=30] - The number of days to retrieve data for
     * @returns {Promise<Object>} The reservation analytics data
     */
    getReservationAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/reservations?days=${days}`);
        return response.data.data;
    },

    /**
     * Get order analytics
     *
     * @param {number} [days=30] - The number of days to retrieve data for
     * @returns {Promise<Object>} The order analytics data
     */
    getOrderAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/orders?days=${days}`);
        return response.data.data;
    },

    /**
     * Get operational analytics
     *
     * @returns {Promise<Object>} The operational analytics data
     */
    getOperationalAnalytics: async () => {
        const response = await axiosInstance.get('/analytics/operational');
        return response.data.data;
    },

    /**
     * Get all analytics data in a single call
     *
     * @param {number} [days=30] - The number of days to retrieve data for
     * @returns {Promise<Object>} All analytics data
     */
    getAllAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/all?days=${days}`);
        return response.data.data;
    }
};

export default analyticsService;