import axiosInstance from '../config/apiConfig';

const restaurantConfigService = {
    /**
     * Retrieves the restaurant configuration
     * @returns {Promise<Object>} The restaurant configuration data
     */
    getRestaurantConfig: async () => {
        const response = await axiosInstance.get('/restaurant/config');
        return response.data.data;
    },

    /**
     * Retrieves the restaurant phone number
     * @returns {Promise<Object>} The restaurant phone number data
     */
    getPhoneNumber: async () => {
        const response = await axiosInstance.get('/restaurant/phone-number');
        return response.data.data;
    },

    /**
     * Adds a new phone number
     * @param {Object} data - The phone number data
     * @returns {Promise<Object>} The response data
     */
    addPhoneNumber: async (data) => {
        const response = await axiosInstance.post('/restaurant/phone-number', data);
        return response.data;
    },

    /**
     * Updates the phone number
     * @param {Object} data - The updated phone number data
     * @returns {Promise<Object>} The response data
     */
    updatePhoneNumber: async (data) => {
        const response = await axiosInstance.put('/restaurant/phone-number', data);
        return response.data;
    },

    /**
     * Deletes the phone number
     * @returns {Promise<Object>} The response data
     */
    deletePhoneNumber: async () => {
        const response = await axiosInstance.delete('/restaurant/phone-number');
        return response.data;
    },

    /**
     * Retrieves the restaurant email
     * @returns {Promise<Object>} The restaurant email data
     */
    getEmail: async () => {
        const response = await axiosInstance.get('/restaurant/email');
        return response.data.data;
    },

    /**
     * Adds a new email
     * @param {Object} data - The email data
     * @returns {Promise<Object>} The response data
     */
    addEmail: async (data) => {
        const response = await axiosInstance.post('/restaurant/email', data);
        return response.data;
    },

    /**
     * Updates the email
     * @param {Object} data - The updated email data
     * @returns {Promise<Object>} The response data
     */
    updateEmail: async (data) => {
        const response = await axiosInstance.put('/restaurant/email', data);
        return response.data;
    },

    /**
     * Deletes the email
     * @returns {Promise<Object>} The response data
     */
    deleteEmail: async () => {
        const response = await axiosInstance.delete('/restaurant/email');
        return response.data;
    },

    /**
     * Retrieves the restaurant address
     * @returns {Promise<Object>} The restaurant address data
     */
    getAddress: async () => {
        const response = await axiosInstance.get('/restaurant/address');
        return response.data.data;
    },

    /**
     * Adds a new address
     * @param {Object} data - The address data
     * @returns {Promise<Object>} The response data
     */
    addAddress: async (data) => {
        const response = await axiosInstance.post('/restaurant/address', data);
        return response.data;
    },

    /**
     * Updates the address
     * @param {Object} data - The updated address data
     * @returns {Promise<Object>} The response data
     */
    updateAddress: async (data) => {
        const response = await axiosInstance.put('/restaurant/address', data);
        return response.data;
    },

    /**
     * Deletes the address
     * @returns {Promise<Object>} The response data
     */
    deleteAddress: async () => {
        const response = await axiosInstance.delete('/restaurant/address');
        return response.data;
    },

    /**
     * Retrieves the restaurant map
     * @returns {Promise<Object>} The restaurant map data
     */
    getMap: async () => {
        const response = await axiosInstance.get('/restaurant/map');
        return response.data.data;
    },

    /**
     * Adds a new map
     * @param {Object} data - The map data
     * @returns {Promise<Object>} The response data
     */
    addMap: async (data) => {
        const response = await axiosInstance.post('/restaurant/map', data);
        return response.data;
    },

    /**
     * Updates the map
     * @param {Object} data - The updated map data
     * @returns {Promise<Object>} The response data
     */
    updateMap: async (data) => {
        const response = await axiosInstance.put('/restaurant/map', data);
        return response.data;
    },

    /**
     * Deletes the map
     * @returns {Promise<Object>} The response data
     */
    deleteMap: async () => {
        const response = await axiosInstance.delete('/restaurant/map');
        return response.data;
    },

    /**
     * Retrieves all restaurant features
     * @returns {Promise<Object>} The restaurant features data
     */
    getFeatures: async () => {
        const response = await axiosInstance.get('/restaurant/features');
        return response.data.data;
    },

    /**
     * Adds a new feature
     * @param {Object} data - The feature data
     * @returns {Promise<Object>} The response data
     */
    addFeature: async (data) => {
        const response = await axiosInstance.post('/restaurant/feature', data);
        return response.data;
    },

    /**
     * Updates a feature
     * @param {Object} data - The updated feature data
     * @returns {Promise<Object>} The response data
     */
    updateFeature: async (data) => {
        const response = await axiosInstance.put('/restaurant/feature', data);
        return response.data;
    },

    /**
     * Retrieves a feature by name
     * @param {string} name - The name of the feature
     * @returns {Promise<Object>} The feature data
     */
    getFeature: async (name) => {
        const response = await axiosInstance.get(`/restaurant/feature/${name}`);
        return response.data.data;
    },

    /**
     * Deletes a feature by name
     * @param {string} name - The name of the feature
     * @returns {Promise<Object>} The response data
     */
    deleteFeature: async (name) => {
        const response = await axiosInstance.delete(`/restaurant/feature/${name}`);
        return response.data;
    },

    /**
     * Retrieves all features
     * @returns {Promise<Object>} The restaurant features data
     */
    getAllFeatures: async () => {
        const response = await axiosInstance.get('/restaurant/features');
        return response.data.data;
    },
};

export default restaurantConfigService;