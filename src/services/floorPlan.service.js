import axiosInstance from '../config/apiConfig';

const floorPlanService = {
    /**
     * Retrieves the floor plan data
     *
     * @returns {Promise<Object>} The floor plan data
     */
    get: async () => {
        const response = await axiosInstance.get(`/floorPlan`);
        return response.data.data;
    }
}

export default floorPlanService;