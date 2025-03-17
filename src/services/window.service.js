import axiosInstance from '../config/apiConfig';

const windowsService = {
    /**
     * Creates a new window
     *
     * @param {number} x - The x-coordinate of the window
     * @param {number} y - The y-coordinate of the window
     * @param {number} width - The width of the window
     * @param {number} height - The height of the window
     * @param {number} rotation - The rotation angle of the window
     * @returns {Promise<Object>} The created window data
     */
    create: async (x, y, width, height, rotation) => {
        const response = await axiosInstance.post(`/windows`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    /**
     * Retrieves all windows
     *
     * @returns {Promise<Array>} The list of all windows
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/windows`);
        return response.data.data;
    },

    /**
     * Retrieves a window by ID
     *
     * @param {string} id - The ID of the window
     * @returns {Promise<Object>} The window data
     */
    get: async (id) => {
        const response = await axiosInstance.get(`/windows/${id}`);
        return response.data.data;
    },

    /**
     * Updates a window by ID
     *
     * @param {string} id - The ID of the window
     * @param {number} x - The new x-coordinate of the window
     * @param {number} y - The new y-coordinate of the window
     * @param {number} width - The new width of the window
     * @param {number} height - The new height of the window
     * @param {number} rotation - The new rotation angle of the window
     * @returns {Promise<Object>} The updated window data
     */
    update: async (id, x, y, width, height, rotation) => {
        const response = await axiosInstance.put(`/windows/${id}`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    /**
     * Deletes a window by ID
     *
     * @param {string} id - The ID of the window
     * @returns {Promise<Object>} The deletion response data
     */
    delete: async (id) => {
        const response = await axiosInstance.delete(`/windows/${id}`);
        return response.data.data;
    }
}

export default windowsService;