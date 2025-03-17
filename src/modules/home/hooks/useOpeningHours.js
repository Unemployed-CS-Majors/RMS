import {useEffect, useState} from 'react';
import openingHoursService from '../../../services/openingHours.service';

/**
 * Custom hook for fetching and managing restaurant opening hours
 *
 * @returns {Object} - Opening hours state and loading/error information
 */
const useOpeningHours = () => {
    const [openingHours, setOpeningHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpeningHours = async () => {
            try {
                setIsLoading(true);
                const data = await openingHoursService.getAll();
                setOpeningHours(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching opening hours:', err);
                setError('Failed to load opening hours. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOpeningHours();
    }, []);

    return {openingHours, isLoading, error};
};

export default useOpeningHours;