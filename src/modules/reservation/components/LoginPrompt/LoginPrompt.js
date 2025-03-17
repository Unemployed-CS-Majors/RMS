import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPrompt.module.css';
import { ROUTES } from '../../../../constants/routes';

/**
 * LoginPrompt component
 *
 * Displays a prompt for the user to log in to make a reservation.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isMobile - Flag to indicate if the view is on a mobile device
 * @returns {JSX.Element} The LoginPrompt component
 */
const LoginPrompt = ({ isMobile }) => {
    const navigate = useNavigate();

    /**
     * Handles the click event for the login button.
     * Navigates the user to the authentication route.
     */
    const handleLoginClick = () => {
        navigate(ROUTES.AUTH);
    };

    return (
        <div className={`${styles.loginPromptContainer} ${isMobile ? styles.mobile : ''}`}>
            <h3 className={`${styles.loginTitle} ${isMobile ? styles.mobile : ''}`}>
                Make a Reservation
            </h3>
            <p className={`${styles.loginMessage} ${isMobile ? styles.mobile : ''}`}>
                Please login to your account to reserve a table.
                After logging in, you'll be able to select your preferred date, time, and table.
            </p>
            <button className={styles.loginButton} onClick={handleLoginClick}>
                Log In to Reserve
            </button>
        </div>
    );
};

export default LoginPrompt;