import React from 'react';
import PropTypes from 'prop-types';
import styles from './DayHours.module.css';

/**
 * DayHours component
 *
 * Renders the opening hours for a specific day.
 *
 * @param {Object} props - The component props
 * @param {string} props.day - The day of the week
 * @param {string} props.hours - The opening hours for the day
 * @returns {JSX.Element} The DayHours component
 */
const DayHours = ({ day, hours }) => {
    return (
        <div className={styles.dayHours}>
            <span className={styles.day}>{day}:</span>
            <span className={styles.hours}>{hours}</span>
        </div>
    );
};

DayHours.propTypes = {
    day: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
};

export default DayHours;