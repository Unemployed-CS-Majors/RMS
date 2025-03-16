import React from 'react';
import PropTypes from 'prop-types';
import styles from './DayHours.module.css';

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