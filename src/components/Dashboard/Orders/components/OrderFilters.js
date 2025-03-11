import React from 'react';
import './OrderFilters.css';

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
    // Handle status filter change
    const handleStatusChange = (e) => {
        onStatusChange(e.target.value);
    };

    // Handle date range changes
    const handleStartDateChange = (e) => {
        onDateRangeChange({
            ...dateRange,
            start: e.target.value
        });
    };

    const handleEndDateChange = (e) => {
        onDateRangeChange({
            ...dateRange,
            end: e.target.value
        });
    };

    // Clear date filters
    const handleClearDates = () => {
        onDateRangeChange({ start: null, end: null });
    };

    return (
        <>
            <div className={`order-filters-overlay ${isVisible ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`order-filters ${isVisible ? 'visible' : ''}`}>
                <div className="filters-header">
                    <h3>Filters</h3>
                    <button
                        className="filters-close-button"
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        ×
                    </button>
                </div>
                <div className="filters-grid">
                    <div className="filter-group">
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
                    <div className="filter-group">
                        <label>Date Range</label>
                        <input
                            type="date"
                            value={dateRange.start || ''}
                            onChange={handleStartDateChange}
                            placeholder="Start date"
                        />
                        <input
                            type="date"
                            value={dateRange.end || ''}
                            onChange={handleEndDateChange}
                            placeholder="End date"
                            min={dateRange.start || ''}
                        />
                        {(dateRange.start || dateRange.end) && (
                            <button
                                className="clear-dates-btn"
                                onClick={handleClearDates}
                            >
                                Clear Dates
                            </button>
                        )}
                    </div>
                    <button
                        className="filter-apply-button"
                        onClick={onApplyFilters}
                    >
                        Apply Filters
                    </button>
                    <button
                        className="filter-reset-button"
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