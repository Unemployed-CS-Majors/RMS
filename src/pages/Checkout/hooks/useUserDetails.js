import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import userService from '../../../services/user.service';

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