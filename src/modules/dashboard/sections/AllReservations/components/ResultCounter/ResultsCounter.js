import React from 'react';
import styles from './ResultsCounter.module.css';

/**
 * Component to display the count of filtered reservations
 *
 * @param {number} filteredCount - Number of reservations after filtering
 * @param {number} totalCount - Total number of reservations
 */
const ResultsCounter = ({filteredCount, totalCount}) => {
    return (
        <div className={styles.resultsCount}>
            Showing {filteredCount} of {totalCount} reservations
        </div>
    );
};

export default ResultsCounter;