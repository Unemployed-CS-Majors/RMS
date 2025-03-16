import axiosInstance from '../config/apiConfig';

const analyticsService = {
    // Get dashboard summary data
    getDashboardSummary: async () => {
        const response = await axiosInstance.get('/analytics/dashboard-summary');
        return response.data.data;
    },

    // Get revenue analytics
    getRevenueAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/revenue?days=${days}`);
        return response.data.data;
    },

    // Get menu item analytics
    getMenuItemAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/menu-items?days=${days}`);
        return response.data.data;
    },

    // Get reservation analytics
    getReservationAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/reservations?days=${days}`);
        return response.data.data;
    },

    // Get order analytics
    getOrderAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/orders?days=${days}`);
        return response.data.data;
    },

    // Get operational analytics
    getOperationalAnalytics: async () => {
        const response = await axiosInstance.get('/analytics/operational');
        return response.data.data;
    },

    // Get all analytics data in a single call
    getAllAnalytics: async (days = 30) => {
        const response = await axiosInstance.get(`/analytics/all?days=${days}`);
        return response.data.data;
    }
};

export default analyticsService;