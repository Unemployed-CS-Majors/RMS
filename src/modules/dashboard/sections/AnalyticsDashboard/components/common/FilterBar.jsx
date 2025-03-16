import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ timeRange, setTimeRange }) => {
    return (
        <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Time Range:</label>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(Number(e.target.value))}
                    className={styles.filterSelect}
                >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;