import React from 'react';
import styles from './LoadingIndicator.module.css';

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