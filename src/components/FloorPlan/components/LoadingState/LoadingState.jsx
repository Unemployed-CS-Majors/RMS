import React from "react";
import styles from "./LoadingState.module.css";

/**
 * LoadingState component for displaying a loading spinner and message
 */
const LoadingState = ({ message = "Loading floor plan..." }) => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
            <p className={styles.loadingText}>{message}</p>
        </div>
    );
};

export default LoadingState;