import React from "react";
import styles from "./ErrorState.module.css";

/**
 * ErrorState component
 *
 * Displays an error message with an icon.
 *
 * @param {Object} props - The component props
 * @param {string} props.message - The error message to display
 * @returns {JSX.Element} The ErrorState component
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