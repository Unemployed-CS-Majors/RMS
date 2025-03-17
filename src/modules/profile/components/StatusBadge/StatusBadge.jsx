import React from 'react';
import styles from './StatusBadge.module.css';

/**
 * Get CSS class based on status
 * @param {string} status - Status value
 * @returns {string} CSS class name
 */
export const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending_payment':
            return styles.statusBadgeWarning;
        case 'paid':
            return styles.statusBadgeInfo;
        case 'in_progress':
            return styles.statusBadgePrimary;
        case 'ready_for_pickup':
            return styles.statusBadgeSecondary;
        case 'out_for_delivery':
            return styles.statusBadgeSecondary;
        case 'completed', 'confirmed':
            return styles.statusBadgeSuccess;
        case 'canceled':
        case 'cancelled':
            return styles.statusBadgeDanger;
        default:
            return styles.statusBadgeLight;
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
const StatusBadge = ({status}) => {
    const badgeClass = getStatusBadgeClass(status);
    const displayStatus = formatStatus(status);

    return (
        <span className={`${styles.statusBadge} ${badgeClass}`}>
            {displayStatus}
        </span>
    );
};

export default StatusBadge;