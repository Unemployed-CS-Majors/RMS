import {useEffect, useState} from 'react';
import openingHoursService from "../../../services/openingHours.service";

/**
 * Custom hook to fetch and manage opening hours.
 *
 * @returns {Object} An object containing the opening hours, loading state, and error state.
 */
export const useOpeningHours = () => {
    const [openingHours, setOpeningHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpeningHours = async () => {
            try {
                setIsLoading(true);
                const data = await openingHoursService.getAll();
                setOpeningHours(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching opening hours:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchOpeningHours();
    }, []);

    return {openingHours, isLoading, error};
};