import { useEffect, useState } from 'react';

/**
 * Custom hook for managing device responsiveness.
 *
 * @returns {boolean} True if the device is mobile, otherwise false.
 */
export const useResponsiveView = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        /**
         * Handles the window resize event to update the isMobile state.
         */
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