import cookieManager from "../utils/cookieManager";
import cookieKeys from "../constants/cookieKeys";
import axiosInstance from "../config/apiConfig";

/**
 * Service for handling order-related API operations
 */
const orderService = {
  /**
   * Get all orders for the currently logged in user
   * @returns {Promise<Array>} List of orders
   */
  getAll: async () => {
    try {
      const response = await axiosInstance.get(`/order`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  /**
   * Get order by ID
   * @param {string} orderId - The order ID to retrieve
   * @returns {Promise<Object>} Order details
   */
  getById: async orderId => {
    try {
      const response = await axiosInstance.get(`/order/${orderId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {string} orderId - The order ID to update
   * @param {string} status - The new status
   * @returns {Promise<Object>} Updated order
   */
  updateStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.patch(`/order/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      throw error;
    }
  },

  /**
   * Cancel an order
   * @param {string} orderId - The order ID to cancel
   * @param {string} cancelReason - Reason for cancellation
   * @returns {Promise<Object>} Canceled order details
   */
  cancelOrder: async (orderId, cancelReason) => {
    try {
      const response = await axiosInstance.post(`/order/${orderId}/cancel`, { cancelReason });
      return response.data;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Get all active orders (employee only)
   * @param {number} limit - Maximum number of orders to return
   * @returns {Promise<Array>} List of active orders
   */
  getActiveOrders: async (limit = 50) => {
    try {
      const response = await axiosInstance.get(`/order/employee/active`, {
        params: { limit },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching active orders:", error);
      throw error;
    }
  },

  /**
   * Get orders by status (employee only)
   * @param {string} status - Status to filter by
   * @param {number} limit - Maximum number of orders to return
   * @returns {Promise<Array>} List of orders with the specified status
   */
  getOrdersByStatus: async (status, limit = 50) => {
    try {
      const response = await axiosInstance.get(`/order/employee/status/${status}`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders with status ${status}:`, error);
      throw error;
    }
  },

  /**
   * Create a new order
   * @param {Object} orderData - The order details
   * @returns {Promise<Object>} Created order details
   */
  createOrder: async orderData => {
    try {
      const response = await axiosInstance.post(`/order`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
};

export default orderService;
