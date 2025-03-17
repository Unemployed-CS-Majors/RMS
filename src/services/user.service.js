import axiosInstance from '../config/apiConfig';
import cookieManager from "../modules/shared/utils/cookieManager";
import COOKIE_KEYS from "../constants/cookieKeys";

const userService = {
    /**
     * Retrieves user details and sets user privileges in cookies
     * @returns {Promise<Object>} The user details data
     */
    userDetails: async () => {
        const response = await axiosInstance.get("/user");
        cookieManager.set(COOKIE_KEYS.USER, response.data.data.privileges, { expires: 1 });
        return response.data.data;
    },

    /**
     * Retrieves all users
     * @returns {Promise<Array>} The list of all users
     */
    getAllUsers: async () => {
        const response = await axiosInstance.get("/user/all");
        return response.data.data;
    },

    /**
     * Retrieves all privileged users
     * @returns {Promise<Array>} The list of all privileged users
     */
    getAllPrivilegedUsers: async () => {
        const response = await axiosInstance.get("/user/privileged");
        return response.data.data;
    },

    /**
     * Changes the privilege of a user
     * @param {string} userId - The ID of the user
     * @param {string} privilege - The new privilege to be assigned
     * @returns {Promise<Object>} The updated user data
     */
    changePrivilege: async (userId, privilege) => {
        const response = await axiosInstance.put(`/user/${userId}/privilege`, {privilege: privilege});
        return response.data.data;
    }
};

export default userService;