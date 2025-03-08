// hooks/useAllergens.js
import { useState, useRef } from "react";

/**
 * Custom hook to manage allergen filtering functionality
 */
export const useAllergens = () => {
    const [allAllergens, setAllAllergens] = useState([]);
    const [excludedAllergens, setExcludedAllergens] = useState([]);
    const [showAllergenFilter, setShowAllergenFilter] = useState(false);
    const filterRef = useRef(null);

    /**
     * Toggle the allergen filter panel visibility
     */
    const toggleAllergenFilter = () => {
        setShowAllergenFilter(!showAllergenFilter);
    };

    /**
     * Toggle an individual allergen's inclusion in the filter
     * @param {string} allergen - The allergen to toggle
     */
    const toggleAllergen = (allergen) => {
        if (excludedAllergens.includes(allergen)) {
            setExcludedAllergens(excludedAllergens.filter(a => a !== allergen));
        } else {
            setExcludedAllergens([...excludedAllergens, allergen]);
        }
    };

    /**
     * Clear all allergen filters
     */
    const clearAllergenFilters = () => {
        setExcludedAllergens([]);
    };

    /**
     * Format allergen name for display with first letter capitalized
     * @param {string} allergen - The allergen name to format
     * @returns {string} Formatted allergen name
     */
    const formatAllergenName = (allergen) => {
        return allergen.charAt(0).toUpperCase() + allergen.slice(1);
    };

    return {
        allAllergens,
        setAllAllergens,
        excludedAllergens,
        setExcludedAllergens,
        showAllergenFilter,
        setShowAllergenFilter,
        toggleAllergenFilter,
        toggleAllergen,
        clearAllergenFilters,
        formatAllergenName,
        filterRef
    };
};

export default useAllergens;