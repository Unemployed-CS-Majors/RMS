import React from "react";
import styles from "./ErrorState.module.css";

/**
 * ErrorState component for displaying error messages
 */
const ErrorState = ({ message }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>❌</div>
            <p className={styles.errorMessage}>Error: {message}</p>
        </div>
    );
};

export default ErrorState;