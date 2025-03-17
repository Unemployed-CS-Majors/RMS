import axiosInstance from '../config/apiConfig';

const reservationService = {
    /**
     * Creates a new reservation
     *
     * @param {string} tableId - The ID of the table
     * @param {string} startTime - The start time of the reservation
     * @param {string} endTime - The end time of the reservation
     * @param {number} people - The number of people for the reservation
     * @returns {Promise<Object>} The created reservation data
     */
    create: async (tableId, startTime, endTime, people) => {
        const response = await axiosInstance.post(`/reservation/create`, {
            tableId,
            startTime,
            endTime,
            people
        });
        return response.data.data;
    },

    /**
     * Cancels a reservation
     *
     * @param {string} reservationId - The ID of the reservation
     * @returns {Promise<Object>} The cancellation response data
     */
    cancel: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/cancel/${reservationId}`);
        return response.data.data;
    },

    /**
     * Confirms a reservation
     *
     * @param {string} reservationId - The ID of the reservation
     * @returns {Promise<Object>} The confirmation response data
     */
    confirm: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/confirm/${reservationId}`);
        return response.data.data;
    },

    /**
     * Completes a reservation
     *
     * @param {string} reservationId - The ID of the reservation
     * @returns {Promise<Object>} The completion response data
     */
    complete: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/complete/${reservationId}`);
        return response.data.data;
    },

    /**
     * Reschedules a reservation
     *
     * @param {string} reservationId - The ID of the reservation
     * @param {string} startTime - The new start time of the reservation
     * @param {string} endTime - The new end time of the reservation
     * @param {string} tableId - The ID of the new table
     * @returns {Promise<Object>} The rescheduled reservation data
     */
    reschedule: async (reservationId, startTime, endTime, tableId) => {
        const response = await axiosInstance.post(`/reservation/reschedule/${reservationId}`, {
            tableId: tableId,
            startTime: startTime,
            endTime: endTime
        });
        return response.data.data;
    },

    /**
     * Retrieves a reservation by ID
     *
     * @param {string} reservationId - The ID of the reservation
     * @returns {Promise<Object>} The reservation data
     */
    get: async (reservationId) => {
        const response = await axiosInstance.get(`/reservation/get/${reservationId}`);
        return response.data.data;
    },

    /**
     * Retrieves free tables for a given time period and number of seats
     *
     * @param {string} startTime - The start time of the reservation
     * @param {string} endTime - The end time of the reservation
     * @param {number} seats - The number of seats required
     * @returns {Promise<Array>} The list of free tables
     */
    getFreeTables: async (startTime, endTime, seats) => {
        const response = await axiosInstance.post(`/reservation/free-tables`, {
            startTime,
            endTime,
            seats: parseInt(seats, 10)
        });
        return response.data.data;
    },

    /**
     * Retrieves all reservations
     *
     * @returns {Promise<Array>} The list of all reservations
     */
    getAll: async () => {
        const response = await axiosInstance.get(`/reservation/all`);
        return response.data.data;
    },

    /**
     * Retrieves reservations by status
     *
     * @param {string} status - The status of the reservations
     * @returns {Promise<Array>} The list of reservations with the given status
     */
    getByStatus: async (status) => {
        const response = await axiosInstance.get(`/reservation/${status}`);
        return response.data.data;
    },

    /**
     * Retrieves reservations for the current user
     *
     * @returns {Promise<Array>} The list of reservations for the current user
     */
    getByUser: async () => {
        const response = await axiosInstance.get(`/reservation/user`);
        return response.data.data;
    },

    /**
     * Retrieves upcoming reservations for the current user
     *
     * @returns {Promise<Array>} The list of upcoming reservations for the current user
     */
    getUserUpcomingReservations: async () => {
        const response = await axiosInstance.get(`/reservation/user/upcoming`);
        return response.data.data;
    }
};

export default reservationService;