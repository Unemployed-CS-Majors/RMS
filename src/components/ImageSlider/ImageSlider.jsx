import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import useImageSlider from '../../hooks/useImageSlider';
import './ImageSlider.css';

const ImageSlider = ({ imageUrls }) => {
    const {
        currentIndex,
        isTransitioning,
        goToNext,
        goToPrevious,
        goToSlide
    } = useImageSlider(imageUrls);

    return (
        <div className="image-slider">
            <img
                src={imageUrls[currentIndex]}
                alt={`Slide ${currentIndex}`}
                style={{
                    transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                }}
            />
            <div className="slider-indicators">
                {imageUrls.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <button
                onClick={goToPrevious}
                className="slider-nav-button prev"
                aria-label="Previous slide"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={goToNext}
                className="slider-nav-button next"
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