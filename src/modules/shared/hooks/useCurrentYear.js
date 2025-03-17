import {useEffect, useState} from 'react';

/**
 * Custom hook to get and update the current year
 * Useful for copyright notices
 *
 * @returns {Object} - Object containing the current year
 */
const useCurrentYear = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Update year if app runs through new year
        const intervalId = setInterval(() => {
            const year = new Date().getFullYear();
            if (year !== currentYear) {
                setCurrentYear(year);
            }
        }, 60000 * 60); // Check once per hour

        return () => clearInterval(intervalId);
    }, [currentYear]);

    return {currentYear};
};

export default useCurrentYear;