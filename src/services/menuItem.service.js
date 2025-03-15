import axiosInstance from "../config/apiConfig";

/**
 * Service for menu item operations
 */
const menuService = {
    /**
     * Get all menu items
     * @returns {Promise<Array>} List of menu items
     */
    getAll: async () => {
        const response = await axiosInstance.get('/menu-items');
        return response.data.data;
    },

    /**
     * Get menu item by ID
     * @param {string} id - Menu item ID
     * @returns {Promise<Object>} Menu item
     */
    getById: async (id) => {
        const response = await axiosInstance.get(`/menu-items/${id}`);
        return response.data.data;
    },

    /**
     * Get menu item types and allergen options
     * @returns {Promise<Object>} Object containing itemTypes and allergens arrays
     */
    getOptions: async () => {
        const response = await axiosInstance.get('/menu-items/enums');
        return response.data.data;
    },

    /**
     * Create a new menu item
     * @param {FormData} formData - Form data including image file
     * @returns {Promise<Object>} Created menu item
     */
    create: async (formData) => {
        const response = await axiosInstance.post('/menu-items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    },

    /**
     * Update a menu item
     * @param {string} id - Menu item ID
     * @param {FormData} formData - Updated form data including optional image file
     * @returns {Promise<Object>} Updated menu item
     */
    update: async (id, formData) => {
        const response = await axiosInstance.put(`/menu-items/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    },

    /**
     * Delete a menu item
     * @param {string} id - Menu item ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await axiosInstance.delete(`/menu-items/${id}`);
    }
};

export default menuService;