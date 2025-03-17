import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext';
import userService from '../../../services/user.service';

/**
 * Custom hook to manage user details.
 *
 * @returns {Object} The user details state and operations.
 * @returns {boolean} isLoggedIn - Flag indicating if the user is logged in.
 * @returns {Object} userDetails - The user's details.
 * @returns {string} userDetails.name - The user's name.
 * @returns {string} userDetails.email - The user's email.
 * @returns {string} userDetails.phoneNumber - The user's phone number.
 * @returns {Function} handleLoginRedirect - Function to redirect to the login page.
 */
const useUserDetails = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [userDetails, setUserDetails] = useState({
        name: 'N/A',
        email: 'N/A',
        phoneNumber: 'N/A',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await userService.userDetails();
                setUserDetails({
                    name: data.firstName + ' ' + data.lastName || 'N/A',
                    email: data.email || 'N/A',
                    phoneNumber: data.phoneNumber || 'N/A',
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (isLoggedIn) {
            fetchUserDetails();
        }
    }, [isLoggedIn]);

    /**
     * Redirects to the login page.
     */
    const handleLoginRedirect = () => {
        navigate('/auth', { state: { from: '/checkout' } });
    };

    return {
        isLoggedIn,
        userDetails,
        handleLoginRedirect
    };
};

export default useUserDetails;