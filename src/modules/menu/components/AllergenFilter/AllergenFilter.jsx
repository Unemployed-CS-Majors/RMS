import React from "react";
import {MdClose} from "react-icons/md";
import styles from "./AllergenFilter.module.css";

/**
 * AllergenFilter component
 *
 * Renders a filter panel to exclude dishes containing selected allergens.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.showAllergenFilter - Whether to show the allergen filter panel
 * @param {Function} props.toggleAllergenFilter - Function to toggle the allergen filter panel
 * @param {Array} props.allAllergens - List of all available allergens
 * @param {Array} props.excludedAllergens - List of allergens to be excluded
 * @param {Function} props.toggleAllergen - Function to toggle the exclusion of an allergen
 * @param {Function} props.clearAllergenFilters - Function to clear all allergen filters
 * @param {Object} props.filterRef - Reference to the filter panel element
 * @returns {JSX.Element|null} The AllergenFilter component
 */
const AllergenFilter = ({
                            showAllergenFilter,
                            toggleAllergenFilter,
                            allAllergens,
                            excludedAllergens,
                            toggleAllergen,
                            clearAllergenFilters,
                            filterRef
                        }) => {
    // Format allergen name for display
    const formatAllergenName = (allergen) => {
        return allergen.charAt(0).toUpperCase() + allergen.slice(1);
    };

    if (!showAllergenFilter) return null;

    return (
        <div className={styles.allergenFilterOverlay}>
            <div className={styles.allergenFilterPanel} ref={filterRef}>
                <div className={styles.filterHeader}>
                    <h3>Exclude Allergens</h3>
                    <button
                        className={styles.closeButton}
                        onClick={toggleAllergenFilter}
                        aria-label="Close allergen filter"
                    >
                        <MdClose/>
                    </button>
                </div>
                <div className={styles.filterDescription}>
                    Select allergens to exclude dishes containing them from the menu.
                </div>
                <div className={styles.allergenFilterOptions}>
                    {allAllergens.map(allergen => (
                        <label key={allergen} className={styles.allergenFilterOption}>
                            <input
                                type="checkbox"
                                checked={excludedAllergens.includes(allergen)}
                                onChange={() => toggleAllergen(allergen)}
                            />
                            <span className={styles.allergenName}>{formatAllergenName(allergen)}</span>
                        </label>
                    ))}
                </div>
                {excludedAllergens.length > 0 && (
                    <button
                        className={styles.clearFiltersButton}
                        onClick={clearAllergenFilters}
                    >
                        Clear All Filters
                    </button>
                )}
                <div className={styles.appliedFiltersSummary}>
                    {excludedAllergens.length > 0 ? (
                        <span>
              Excluding {excludedAllergens.length} allergen
                            {excludedAllergens.length !== 1 ? 's' : ''}
            </span>
                    ) : (
                        <span>No allergens excluded</span>
                    )}
                </div>
                <button
                    className={styles.applyFiltersButton}
                    onClick={toggleAllergenFilter}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default AllergenFilter;