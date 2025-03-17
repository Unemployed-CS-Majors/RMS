import React from 'react';
import styles from './OrderFilters.module.css';

/**
 * OrderFilters component
 *
 * Provides UI for filtering orders by status and date range.
 *
 * @param {Object} props - Component props
 * @param {Array} props.statusOptions - Array of status options for the filter
 * @param {string} props.currentStatus - Currently selected status filter
 * @param {Object} props.dateRange - Object containing start and end date for the date range filter
 * @param {Function} props.onStatusChange - Function to handle status filter change
 * @param {Function} props.onDateRangeChange - Function to handle date range filter change
 * @param {boolean} props.isVisible - Flag indicating if the filter panel is visible
 * @param {Function} props.onClose - Function to close the filter panel
 * @param {Function} props.onApplyFilters - Function to apply the selected filters
 * @param {Function} props.onResetFilters - Function to reset the filters
 * @returns {JSX.Element} The OrderFilters component
 */
const OrderFilters = ({
                          statusOptions,
                          currentStatus,
                          dateRange,
                          onStatusChange,
                          onDateRangeChange,
                          isVisible,
                          onClose,
                          onApplyFilters,
                          onResetFilters
                      }) => {
    /**
     * Handle status filter change
     *
     * @param {Object} e - The event object
     */
    const handleStatusChange = (e) => {
        onStatusChange(e.target.value);
    };

    /**
     * Handle start date change
     *
     * @param {Object} e - The event object
     */
    const handleStartDateChange = (e) => {
        onDateRangeChange({
            ...dateRange,
            start: e.target.value
        });
    };

    /**
     * Handle end date change
     *
     * @param {Object} e - The event object
     */
    const handleEndDateChange = (e) => {
        onDateRangeChange({
            ...dateRange,
            end: e.target.value
        });
    };

    /**
     * Clear date filters
     */
    const handleClearDates = () => {
        onDateRangeChange({start: null, end: null});
    };

    return (
        <>
            <div
                className={`${styles.orderFiltersOverlay} ${isVisible ? styles.orderFiltersOverlayVisible : ''}`}
                onClick={onClose}
            ></div>
            <div className={`${styles.orderFilters} ${isVisible ? styles.orderFiltersVisible : ''}`}>
                <div className={styles.filtersHeader}>
                    <h3>Filters</h3>
                    <button
                        className={styles.filtersCloseButton}
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.filtersGrid}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="status-filter">Order Status</label>
                        <select
                            id="status-filter"
                            value={currentStatus}
                            onChange={handleStatusChange}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Date Range</label>
                        <div className={styles.dateInputs}>
                            <input
                                type="date"
                                value={dateRange.start || ''}
                                onChange={handleStartDateChange}
                                placeholder="Start date"
                            />
                            <span className={styles.dateSeparator}>to</span>
                            <input
                                type="date"
                                value={dateRange.end || ''}
                                onChange={handleEndDateChange}
                                placeholder="End date"
                                min={dateRange.start || ''}
                            />
                        </div>
                        {(dateRange.start || dateRange.end) && (
                            <button
                                className={styles.clearDatesBtn}
                                onClick={handleClearDates}
                            >
                                Clear Dates
                            </button>
                        )}
                    </div>
                    <button
                        className={styles.filterApplyButton}
                        onClick={onApplyFilters}
                    >
                        Apply Filters
                    </button>
                    <button
                        className={styles.filterResetButton}
                        onClick={onResetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrderFilters;