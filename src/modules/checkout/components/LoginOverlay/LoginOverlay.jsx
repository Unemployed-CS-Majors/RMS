import React from 'react';
import styles from './LoginOverlay.module.css';

/**
 * LoginOverlay component displays a prompt for the user to login to continue with their order.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.handleLoginRedirect - Function to handle the login redirect.
 * @param {Function} props.handleBackToMenu - Function to handle the back to menu action.
 * @returns {JSX.Element} The rendered LoginOverlay component.
 */
const LoginOverlay = ({handleLoginRedirect, handleBackToMenu}) => {
    return (
        <div className={styles.loginOverlay}>
            <div className={styles.loginPrompt}>
                <p>Please login to continue with your order</p>
                <button className={styles.loginButton} onClick={handleLoginRedirect}>
                    Login
                </button>
                <button className={styles.menuLink} onClick={handleBackToMenu}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
};

export default LoginOverlay;