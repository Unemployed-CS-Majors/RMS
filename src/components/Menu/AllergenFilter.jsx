import React from "react";
import { MdClose } from "react-icons/md";

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
        <div className="allergen-filter-overlay">
            <div className="allergen-filter-panel" ref={filterRef}>
                <div className="filter-header">
                    <h3>Exclude Allergens</h3>
                    <button className="close-button" onClick={toggleAllergenFilter}>
                        <MdClose />
                    </button>
                </div>
                <div className="filter-description">
                    Select allergens to exclude dishes containing them from the menu.
                </div>
                <div className="allergen-filter-options">
                    {allAllergens.map(allergen => (
                        <label key={allergen} className="allergen-filter-option">
                            <input
                                type="checkbox"
                                checked={excludedAllergens.includes(allergen)}
                                onChange={() => toggleAllergen(allergen)}
                            />
                            <span className="allergen-name">{formatAllergenName(allergen)}</span>
                        </label>
                    ))}
                </div>
                {excludedAllergens.length > 0 && (
                    <button className="clear-filters-button" onClick={clearAllergenFilters}>
                        Clear All Filters
                    </button>
                )}
                <div className="applied-filters-summary">
                    {excludedAllergens.length > 0 ? (
                        <span>Excluding {excludedAllergens.length} allergen{excludedAllergens.length !== 1 ? 's' : ''}</span>
                    ) : (
                        <span>No allergens excluded</span>
                    )}
                </div>
                <button className="apply-filters-button" onClick={toggleAllergenFilter}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default AllergenFilter;