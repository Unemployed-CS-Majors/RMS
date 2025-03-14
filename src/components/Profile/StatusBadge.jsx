import React from 'react';

/**
 * Get CSS class based on status
 * @param {string} status - Status value
 * @returns {string} CSS class name
 */
export const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending_payment':
            return 'status-badge-warning';
        case 'paid':
            return 'status-badge-info';
        case 'in_progress':
            return 'status-badge-primary';
        case 'ready_for_pickup':
            return 'status-badge-secondary';
        case 'out_for_delivery':
            return 'status-badge-secondary';
        case 'completed':
            return 'status-badge-success';
        case 'canceled':
        case 'cancelled':
            return 'status-badge-danger';
        default:
            return 'status-badge-light';
    }
};

/**
 * Format status for display
 * @param {string} status - Status value
 * @returns {string} Formatted status
 */
export const formatStatus = (status) => {
    if (!status) return '';

    // Handle legacy statuses that aren't in snake_case
    if (!status.includes('_')) {
        return status;
    }

    return status.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

/**
 * StatusBadge component displays a status with appropriate styling
 */
const StatusBadge = ({ status }) => {
    const badgeClass = getStatusBadgeClass(status);
    const displayStatus = formatStatus(status);

    return (
        <span className={`status-badge ${badgeClass}`}>
      {displayStatus}
    </span>
    );
};

export default StatusBadge;