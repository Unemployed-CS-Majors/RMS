import axiosInstance from '../config/apiConfig';

const doorService = {
    /**
     * Creates a new door
     *
     * @param {number} x - The x-coordinate of the door
     * @param {number} y - The y-coordinate of the door
     * @param {number} width - The width of the door
     * @param {number} height - The height of the door
     * @param {number} rotation - The rotation angle of the door
     * @returns {Promise<Object>} The created door data
     */
    create: async (x, y, width, height, rotation) => {
        const response = await axiosInstance.post(`/doors`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    /**
     * Retrieves all doors
     *
     * @returns {Promise<Array>} The list of all doors
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/doors`);
        return response.data.data;
    },

    /**
     * Retrieves a door by ID
     *
     * @param {string} id - The ID of the door
     * @returns {Promise<Object>} The door data
     */
    get: async (id) => {
        const response = await axiosInstance.get(`/doors/${id}`);
        return response.data.data;
    },

    /**
     * Updates a door by ID
     *
     * @param {string} id - The ID of the door
     * @param {number} x - The new x-coordinate of the door
     * @param {number} y - The new y-coordinate of the door
     * @param {number} width - The new width of the door
     * @param {number} height - The new height of the door
     * @param {number} rotation - The new rotation angle of the door
     * @returns {Promise<Object>} The updated door data
     */
    update: async (id, x, y, width, height, rotation) => {
        const response = await axiosInstance.put(`/doors/${id}`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    /**
     * Deletes a door by ID
     *
     * @param {string} id - The ID of the door
     * @returns {Promise<Object>} The deletion response data
     */
    delete: async (id) => {
        const response = await axiosInstance.delete(`/doors/${id}`);
        return response.data.data;
    }
}

export default doorService;