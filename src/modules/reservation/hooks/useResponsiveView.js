import { useState, useEffect, useContext } from 'react';
import reservationService from '../../../services/reservation.service';
import { AuthContext } from '../../shared/contexts/AuthContext';

// Hook for managing device responsiveness
export const useResponsiveView = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};