import axiosInstance from '../config/apiConfig';

const wallsService = {
    /**
     * Creates a new wall
     *
     * @param {number} x1 - The x-coordinate of the first point
     * @param {number} y1 - The y-coordinate of the first point
     * @param {number} x2 - The x-coordinate of the second point
     * @param {number} y2 - The y-coordinate of the second point
     * @returns {Promise<Object>} The created wall data
     */
    create: async (x1, y1, x2, y2) => {
        const response = await axiosInstance.post(`/walls`, {
            x1,
            y1,
            x2,
            y2
        });
        return response.data.data;
    },

    /**
     * Retrieves all walls
     *
     * @returns {Promise<Array>} The list of all walls
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/walls`);
        return response.data.data;
    },

    /**
     * Retrieves a wall by ID
     *
     * @param {string} id - The ID of the wall
     * @returns {Promise<Object>} The wall data
     */
    get: async (id) => {
        const response = await axiosInstance.get(`/walls/${id}`);
        return response.data.data;
    },

    /**
     * Updates a wall by ID
     *
     * @param {string} id - The ID of the wall
     * @param {number} x1 - The new x-coordinate of the first point
     * @param {number} y1 - The new y-coordinate of the first point
     * @param {number} x2 - The new x-coordinate of the second point
     * @param {number} y2 - The new y-coordinate of the second point
     * @returns {Promise<Object>} The updated wall data
     */
    update: async (id, x1, y1, x2, y2) => {
        const response = await axiosInstance.put(`/walls/${id}`, {
            x1,
            y1,
            x2,
            y2
        });
        return response.data.data;
    },

    /**
     * Deletes a wall by ID
     *
     * @param {string} id - The ID of the wall
     * @returns {Promise<Object>} The deletion response data
     */
    delete: async (id) => {
        const response = await axiosInstance.delete(`/walls/${id}`);
        return response.data.data;
    }
}

export default wallsService;