import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing image slider functionality
 *
 * @param {string[]} images - Array of image URLs
 * @param {number} interval - Auto advance interval in milliseconds
 * @returns {Object} - Slider state and control functions
 */
const useImageSlider = (images, interval = 5000) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const transitionDuration = 500; // milliseconds

    const goToNext = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setTimeout(() => setIsTransitioning(false), transitionDuration);
        }
    }, [images.length, isTransitioning]);

    const goToPrevious = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setTimeout(() => setIsTransitioning(false), transitionDuration);
        }
    }, [images.length, isTransitioning]);

    const goToSlide = useCallback((index) => {
        if (!isTransitioning && index !== currentIndex) {
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), transitionDuration);
        }
    }, [currentIndex, isTransitioning]);

    // Auto-advance effect
    useEffect(() => {
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [goToNext, interval]);

    return {
        currentIndex,
        isTransitioning,
        goToNext,
        goToPrevious,
        goToSlide
    };
};

export default useImageSlider;