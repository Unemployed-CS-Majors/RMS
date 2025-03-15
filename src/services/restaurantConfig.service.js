import axiosInstance from '../config/apiConfig';

const restaurantConfigService = {
    getRestaurantConfig: async () => {
        const response = await axiosInstance.get('/restaurant/config');
        return response.data.data;
    },

    getPhoneNumber: async () => {
        const response = await axiosInstance.get('/restaurant/phone-number');
        return response.data.data;
    },

    addPhoneNumber: async (data) => {
        const response = await axiosInstance.post('/restaurant/phone-number', data);
        return response.data;
    },

    updatePhoneNumber: async (data) => {
        const response = await axiosInstance.put('/restaurant/phone-number', data);
        return response.data;
    },

    deletePhoneNumber: async () => {
        const response = await axiosInstance.delete('/restaurant/phone-number');
        return response.data;
    },

    getEmail: async () => {
        const response = await axiosInstance.get('/restaurant/email');
        return response.data.data;
    },

    addEmail: async (data) => {
        const response = await axiosInstance.post('/restaurant/email', data);
        return response.data;
    },

    updateEmail: async (data) => {
        const response = await axiosInstance.put('/restaurant/email', data);
        return response.data;
    },

    deleteEmail: async () => {
        const response = await axiosInstance.delete('/restaurant/email');
        return response.data;
    },

    getAddress: async () => {
        const response = await axiosInstance.get('/restaurant/address');
        return response.data.data;
    },

    addAddress: async (data) => {
        const response = await axiosInstance.post('/restaurant/address', data);
        return response.data;
    },

    updateAddress: async (data) => {
        const response = await axiosInstance.put('/restaurant/address', data);
        return response.data;
    },

    deleteAddress: async () => {
        const response = await axiosInstance.delete('/restaurant/address');
        return response.data;
    },

    getMap: async () => {
        const response = await axiosInstance.get('/restaurant/map');
        return response.data.data;
    },

    addMap: async (data) => {
        const response = await axiosInstance.post('/restaurant/map', data);
        return response.data;
    },

    updateMap: async (data) => {
        const response = await axiosInstance.put('/restaurant/map', data);
        return response.data;
    },

    deleteMap: async () => {
        const response = await axiosInstance.delete('/restaurant/map');
        return response.data;
    },

    toggleFeature: async (feature, enabled) => {
        const response = await axiosInstance.put(`/restaurant/features/${feature}`, { enabled });
        return response.data;
    },

    getFeatures: async () => {
        const response = await axiosInstance.get('/restaurant/features');
        return response.data.data;
    }
};

export default restaurantConfigService;