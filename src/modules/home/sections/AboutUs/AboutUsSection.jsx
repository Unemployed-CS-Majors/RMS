import React from "react";
import useAboutImages from "../../hooks/useAboutImages";
import styles from "./AboutUsSection.module.css";

/**
 * AboutUsSection component
 *
 * Renders the "About Us" section of the home page, including a description of the restaurant and a gallery of images.
 *
 * @returns {JSX.Element} The AboutUsSection component
 */
const AboutUsSection = () => {
    const {aboutImages} = useAboutImages();

    return (
        <div className={styles.aboutusContainer}>
            <div className={styles.aboutusContentContainer}>
                <h1>About Us</h1>

                <p>Welcome to RMS, where passion meets flavor. Nestled in the heart of RMS, our mission is to create
                    unforgettable dining experiences. We believe that great food is the foundation of great
                    memories, and our team is dedicated to serving dishes that delight your taste buds and warm your
                    heart.</p>

                <p>At RMS, every ingredient tells a story. From locally sourced produce to globally inspired
                    recipes, we craft each dish with care, precision, and love. Whether you're here for a
                    casual meal, a special celebration, or just to unwind, we aim to provide a welcoming atmosphere
                    that feels like home.</p>

                <p>Join us for a culinary journey filled with bold flavors, vibrant colors, and a dash of magic.
                    Because here, food is more than nourishment — it's an experience.</p>

                <div className={styles.img3Container}>
                    {aboutImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`About us image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;