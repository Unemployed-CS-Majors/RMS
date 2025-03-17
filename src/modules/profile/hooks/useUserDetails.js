import {useState} from 'react';
import userService from "../../../services/user.service";

/**
 * Custom hook for fetching and managing user details
 */
export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userResponse = await userService.userDetails();
            setUserDetails(userResponse);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch user details');
            setIsLoading(false);
        }
    };

    return {
        userDetails,
        isLoading,
        error,
        fetchUserDetails
    };
};