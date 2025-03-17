import React from 'react';
import styles from './LoadingIndicator.module.css';

/**
 * LoadingIndicator component for displaying a loading spinner with optional text
 *
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the loading indicator ('small', 'medium', 'large')
 * @param {boolean} [props.fullScreen=false] - Flag indicating if the loading indicator should cover the full screen
 * @param {string} [props.text='Loading...'] - Text to display below the loading spinner
 * @returns {JSX.Element} The LoadingIndicator component
 */
const LoadingIndicator = ({size = 'medium', fullScreen = false, text = 'Loading...'}) => {
    const sizeClass = {
        small: styles.loadingIndicatorSm,
        medium: styles.loadingIndicatorMd,
        large: styles.loadingIndicatorLg
    }[size] || styles.loadingIndicatorMd;

    return (
        <div className={`${styles.loadingIndicatorContainer} ${fullScreen ? styles.fullscreen : ''}`}>
            <div className={`${styles.loadingIndicator} ${sizeClass}`}>
                <div className={styles.spinner}>
                    <div className={`${styles.dot} ${styles.dot1}`}></div>
                    <div className={`${styles.dot} ${styles.dot2}`}></div>
                    <div className={`${styles.dot} ${styles.dot3}`}></div>
                </div>
                {text && <div className={styles.loadingText}>{text}</div>}
            </div>
        </div>
    );
};

export default LoadingIndicator;