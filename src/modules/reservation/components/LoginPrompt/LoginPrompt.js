import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPrompt.module.css';
import { ROUTES } from '../../../../constants/routes';

const LoginPrompt = ({ isMobile }) => {
    const navigate = useNavigate();

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