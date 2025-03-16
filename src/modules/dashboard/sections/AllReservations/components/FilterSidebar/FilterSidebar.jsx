import React from 'react';
import styles from './FilterSidebar.module.css';

/**
 * Component for filtering reservations
 *
 * @param {boolean} isVisible - Whether the sidebar is visible
 * @param {Object} filters - Current filter values
 * @param {Array} statusOptions - Available status options
 * @param {Function} onFilterChange - Handler for filter changes
 * @param {Function} onClearFilters - Handler for clearing all filters
 * @param {Function} onToggle - Handler for toggling sidebar visibility
 */
const FilterSidebar = ({
                           isVisible,
                           filters,
                           statusOptions,
                           onFilterChange,
                           onClearFilters,
                           onToggle
                       }) => {
    return (
        <div className={`${styles.filterSidebar} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.filterContent}>
                <div className={styles.filterHeader}>
                    <h3 className={styles.filterTitle}>Filters</h3>
                    <button
                        onClick={onToggle}
                        className={styles.filterClose}
                        aria-label="Close filters"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-name">Name</label>
                    <input
                        id="filter-name"
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={onFilterChange}
                        className={styles.filterInput}
                        placeholder="Filter by name"
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-date">Date</label>
                    <input
                        id="filter-date"
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={onFilterChange}
                        className={styles.filterInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-start-time">Start Time</label>
                    <input
                        id="filter-start-time"
                        type="time"
                        name="startTime"
                        value={filters.startTime}
                        onChange={onFilterChange}
                        className={styles.filterInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-end-time">End Time</label>
                    <input
                        id="filter-end-time"
                        type="time"
                        name="endTime"
                        value={filters.endTime}
                        onChange={onFilterChange}
                        className={styles.filterInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-table">Table</label>
                    <input
                        id="filter-table"
                        type="text"
                        name="table"
                        value={filters.table}
                        onChange={onFilterChange}
                        className={styles.filterInput}
                        placeholder="Filter by table"
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel} htmlFor="filter-status">Status</label>
                    <select
                        id="filter-status"
                        name="status"
                        value={filters.status}
                        onChange={onFilterChange}
                        className={styles.filterSelect}
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onClearFilters}
                    className={styles.clearFilters}
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;