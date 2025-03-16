import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./AllergenTags.module.css";

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