import React from 'react';
import PropTypes from 'prop-types';
import styles from './Legend.module.css';

/**
 * Legend component
 *
 * Renders a legend indicating the availability status with color codes.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isMobile - Flag to indicate if the view is on a mobile device
 * @returns {JSX.Element} The Legend component
 */
const Legend = ({ isMobile }) => {
    return (
        <div className={`${styles.legendContainer} ${isMobile ? styles.mobile : ''}`}>
            <div className={styles.legendItem}>
                <div
                    className={`${styles.colorBox} ${isMobile ? styles.mobile : ''}`}
                    style={{ backgroundColor: "#8cb369" }}
                />
                <span className={styles.legendText}>Available</span>
            </div>
            <div className={styles.legendItem}>
                <div
                    className={`${styles.colorBox} ${isMobile ? styles.mobile : ''}`}
                    style={{ backgroundColor: "#718096" }}
                />
                <span className={styles.legendText}>Reserved</span>
            </div>
        </div>
    );
};

Legend.propTypes = {
    isMobile: PropTypes.bool
};

Legend.defaultProps = {
    isMobile: false
};

export default Legend;