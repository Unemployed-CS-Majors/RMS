import axiosInstance from '../config/apiConfig';

const openingHoursService = {
    /**
     * Retrieves all opening hours
     *
     * @returns {Promise<Array>} List of all opening hours
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/openingHours`);
        return response.data.data;
    },

    /**
     * Retrieves opening hours by ID
     *
     * @param {string} id - The ID of the opening hours
     * @returns {Promise<Object>} The opening hours data
     */
    get: async (id) => {
        const response = await axiosInstance.get(`/openingHours/${id}`);
        return response.data.data;
    },

    /**
     * Adds new opening hours
     *
     * @param {string} startTime - The start time of the opening hours
     * @param {string} endTime - The end time of the opening hours
     * @param {string} day - The day of the opening hours
     * @returns {Promise<Object>} The added opening hours data
     */
    add: async (startTime, endTime, day) => {
        const response = await axiosInstance.post(`/openingHours`, {
            startTime,
            endTime,
            day
        });
        return response.data.data;
    },

    /**
     * Updates opening hours by ID
     *
     * @param {string} id - The ID of the opening hours
     * @param {string} startTime - The new start time of the opening hours
     * @param {string} endTime - The new end time of the opening hours
     * @param {string} day - The new day of the opening hours
     * @returns {Promise<Object>} The updated opening hours data
     */
    update: async (id, startTime, endTime, day) => {
        const response = await axiosInstance.put(`/openingHours/${id}`, {
            startTime,
            endTime,
            day
        });
        return response.data.data;
    },

    /**
     * Deletes opening hours by ID
     *
     * @param {string} id - The ID of the opening hours
     * @returns {Promise<Object>} The deletion response data
     */
    delete: async (id) => {
        const response = await axiosInstance.delete(`/openingHours/${id}`);
        return response.data.data;
    },
}

export default openingHoursService;