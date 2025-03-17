import React from 'react';
import styles from './ErrorMessage.module.css';

/**
 * ErrorMessage component displays an error message if provided.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element|null} The rendered error message component or null if no message is provided.
 */
const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className={styles.errorMessage}>
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;