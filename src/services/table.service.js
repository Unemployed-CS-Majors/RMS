import axiosInstance from '../config/apiConfig';

const tableService = {
    /**
     * Creates a new table
     *
     * @param {number} seats - The number of seats at the table
     * @param {boolean} nextToWindow - Whether the table is next to a window
     * @param {number} x - The x-coordinate of the table
     * @param {number} y - The y-coordinate of the table
     * @param {number} rotation - The rotation angle of the table
     * @param {string} type - The type of the table
     * @param {number} tableNum - The table number
     * @returns {Promise<Object>} The created table data
     */
    create: async (seats, nextToWindow, x, y, rotation, type, tableNum) => {
        const response = await axiosInstance.post(`/table`, {
            seats,
            nextToWindow,
            x,
            y,
            rotation,
            type,
            tableNum: parseInt(tableNum, 10)
        });
        return response.data.data;
    },

    /**
     * Retrieves all tables
     *
     * @returns {Promise<Array>} The list of all tables
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/table`);
        return response.data.data;
    },

    /**
     * Retrieves a table by ID
     *
     * @param {string} id - The ID of the table
     * @returns {Promise<Object>} The table data
     */
    get: async (id) => {
        const response = await axiosInstance.get(`/table/${id}`);
        return response.data.data;
    },

    /**
     * Updates a table by ID
     *
     * @param {string} id - The ID of the table
     * @param {number} seats - The number of seats at the table
     * @param {boolean} nextToWindow - Whether the table is next to a window
     * @param {number} x - The x-coordinate of the table
     * @param {number} y - The y-coordinate of the table
     * @param {number} rotation - The rotation angle of the table
     * @param {string} type - The type of the table
     * @param {number} tableNum - The table number
     * @returns {Promise<Object>} The updated table data
     */
    update: async (id, seats, nextToWindow, x, y, rotation, type, tableNum) => {
        console.log(tableNum);
        const response = await axiosInstance.put(`/table/${id}`, {
            seats,
            nextToWindow,
            x,
            y,
            rotation,
            type,
            tableNum: parseInt(tableNum, 10)
        });
        return response.data.data;
    },

    /**
     * Deletes a table by ID
     *
     * @param {string} id - The ID of the table
     * @returns {Promise<Object>} The deletion response data
     */
    delete: async (id) => {
        const response = await axiosInstance.delete(`/table/${id}`);
        return response.data.data;
    },

    /**
     * Deactivates a table by ID
     *
     * @param {string} id - The ID of the table
     * @returns {Promise<Object>} The deactivation response data
     */
    deactivate: async (id) => {
        const response = await axiosInstance.patch(`/table/deactivate/${id}`);
        return response.data.data;
    },

    /**
     * Activates a table by ID
     *
     * @param {string} id - The ID of the table
     * @returns {Promise<Object>} The activation response data
     */
    activate: async (id) => {
        const response = await axiosInstance.patch(`/table/activate/${id}`);
        return response.data.data;
    }
}

export default tableService;