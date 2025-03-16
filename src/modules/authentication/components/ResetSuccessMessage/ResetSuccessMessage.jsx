import React from "react";
import styles from './ResetSuccessMessage.module.css';

/**
 * Component shown after successful password reset request
 *
 * @param {String} email - Email address used for reset
 * @param {Function} returnToLogin - Function to navigate back to login
 * @returns {JSX.Element} Success message component
 */
const ResetSuccessMessage = ({ email, returnToLogin }) => {
    return (
        <div className={styles.resetSuccess}>
            <div className={styles.authHeader}>
                <h1>Email Sent</h1>
                <p className={styles.authSubheader}>
                    A password reset link has been sent to <strong>{email}</strong>
                </p>
            </div>

            <p className={styles.resetInstructions}>
                Please check your email and follow the instructions to reset your password.
                If you don't see the email in your inbox, please check your spam folder.
            </p>

            <button
                className={styles.authButton}
                onClick={returnToLogin}
            >
                Return to Login
            </button>
        </div>
    );
};

export default ResetSuccessMessage;