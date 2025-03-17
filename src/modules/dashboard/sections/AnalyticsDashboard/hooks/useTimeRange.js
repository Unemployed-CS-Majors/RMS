import {useState} from 'react';

/**
 * Custom hook to manage the time range state
 *
 * @param {number} [initialValue=30] - Initial value for the time range
 * @returns {Object} The time range state and a function to update it
 */
export const useTimeRange = (initialValue = 30) => {
    const [timeRange, setTimeRange] = useState(initialValue);

    return {timeRange, setTimeRange};
};