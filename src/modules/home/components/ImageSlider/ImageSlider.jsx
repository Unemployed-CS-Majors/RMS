import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import useImageSlider from '../../../shared/hooks/useImageSlider';
import styles from './ImageSlider.module.css';

/**
 * ImageSlider component
 *
 * Displays a slider with images and navigation controls.
 *
 * @param {Object} props - Component props
 * @param {Array<string>} props.imageUrls - Array of image URLs to display in the slider
 * @returns {JSX.Element} The ImageSlider component
 */
const ImageSlider = ({ imageUrls }) => {
    const {
        currentIndex,
        isTransitioning,
        goToNext,
        goToPrevious,
        goToSlide
    } = useImageSlider(imageUrls);

    return (
        <div className={styles.imageSlider}>
            <img
                src={imageUrls[currentIndex]}
                alt={`Slide ${currentIndex}`}
                style={{
                    transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                }}
            />
            <div className={styles.sliderIndicators}>
                {imageUrls.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.sliderIndicator} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <button
                onClick={goToPrevious}
                className={`${styles.sliderNavButton} ${styles.prev}`}
                aria-label="Previous slide"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={goToNext}
                className={`${styles.sliderNavButton} ${styles.next}`}
                aria-label="Next slide"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

ImageSlider.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;