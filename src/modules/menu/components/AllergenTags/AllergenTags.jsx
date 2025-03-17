import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./AllergenTags.module.css";

/**
 * AllergenTags component
 *
 * Renders a list of allergen tags that can be removed by clicking on them.
 *
 * @param {Object} props - The component props
 * @param {Array} props.excludedAllergens - List of allergens to be excluded
 * @param {Function} props.toggleAllergen - Function to toggle the exclusion of an allergen
 * @returns {JSX.Element} The AllergenTags component
 */
const AllergenTags = ({ excludedAllergens, toggleAllergen }) => {
    return (
        <div className={styles.allergenTagsContainer}>
            <span className={styles.excludingLabel}>Excluding:</span>
            {excludedAllergens.map(allergen => (
                <button
                    key={allergen}
                    onClick={() => toggleAllergen(allergen)}
                    className={styles.allergenTag}
                    aria-label={`Remove ${allergen} filter`}
                >
                    {allergen} <FaTimes className={styles.removeIcon} />
                </button>
            ))}
        </div>
    );
};

export default AllergenTags;