import cookieManager from '../modules/shared/utils/cookieManager';
import COOKIE_KEYS from '../constants/cookieKeys';
import axios from 'axios';
import axiosInstance from '../config/apiConfig';

const authService = {
    /**
     * Logs in the user with email and password
     *
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @returns {Promise<Object>} The login response data
     */
    login: async (email, password) => {
        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/login`, {
            email,
            password
        });
        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});
        return data;
    },

    /**
     * Registers a new user
     *
     * @param {Object} formData - The registration form data
     * @returns {Promise<Object>} The registration response data
     */
    register: async (formData) => {
        const code = formData.countryCode;
        const updatedFormData = {
            ...formData,
            phoneNumber: code + formData.phoneNumber,
        };

        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/register`, updatedFormData);
        const data = response.data.data;
        return data;
    },

    /**
     * Logs out the user
     */
    logout: async () => {
        cookieManager.remove(COOKIE_KEYS.ID_TOKEN);
        cookieManager.remove(COOKIE_KEYS.REFRESH_TOKEN);
        cookieManager.remove(COOKIE_KEYS.USER);
    },

    /**
     * Refreshes the user's authentication token
     *
     * @returns {Promise<string>} The new ID token
     * @throws {Error} If no refresh token is available
     */
    refreshToken: async () => {
        const refreshToken = cookieManager.get(COOKIE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/refreshToken`, {
            refreshToken: refreshToken
        });

        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});

        return data.idToken;
    },

    /**
     * Creates a new employee
     *
     * @param {Object} formData - The employee form data
     * @returns {Promise<Object>} The employee creation response data
     */
    createEmployee: async (formData) => {
        const response = await axiosInstance.post(`/auth/createEmployee`, formData);
        return response.data.data;
    },

    /**
     * Creates a new owner
     *
     * @param {Object} formData - The owner form data
     * @returns {Promise<Object>} The owner creation response data
     */
    createOwner: async (formData) => {
        const response = await axiosInstance.post(`/auth/createOwner`, formData);
        return response.data.data;
    },

    /**
     * Deletes an employee
     *
     * @param {string} uid - The employee's unique ID
     * @returns {Promise<Object>} The employee deletion response data
     */
    deleteEmployee: async (uid) => {
        const response = await axiosInstance.delete(`/auth/deleteEmployee/${uid}`);
        return response.data.data;
    },

    /**
     * Logs in the user with Google
     *
     * @param {string} idToken - The Google ID token
     * @returns {Promise<Object>} The Google login response data
     */
    google: async (idToken) => {
        const response = await axiosInstance.post(`/auth/google`, {
            idToken
        });
        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});
        return data;
    },

    /**
     * Sends a password reset email
     *
     * @param {string} email - The user's email
     */
    forgotPassword: async (email) => {
        await axiosInstance.post(`/auth/forgotPassword`, {
            email
        });
    },

    /**
     * Deletes the user's account
     */
    deleteAccount: async () => {
        await axiosInstance.delete(`/auth/deleteAccount`);
    }
};

export default authService;