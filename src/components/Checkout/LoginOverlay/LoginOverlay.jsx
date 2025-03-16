import React from 'react';
import styles from './LoginOverlay.module.css';

const LoginOverlay = ({ handleLoginRedirect, handleBackToMenu }) => {
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