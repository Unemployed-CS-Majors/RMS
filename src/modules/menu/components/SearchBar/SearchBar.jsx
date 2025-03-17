import React from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import styles from "./SearchBar.module.css";

/**
 * SearchBar component
 *
 * Renders a search bar with an input field for searching food, categories, or allergens.
 * Includes a button to clear the search term and a button to toggle allergen filters.
 *
 * @param {Object} props - The component props
 * @param {string} props.searchTerm - The current search term
 * @param {Function} props.setSearchTerm - Function to set the search term
 * @param {boolean} props.showAllergenFilter - Whether the allergen filter is shown
 * @param {Function} props.toggleAllergenFilter - Function to toggle the allergen filter
 * @param {Array} props.excludedAllergens - The list of excluded allergens
 * @returns {JSX.Element} The SearchBar component
 */
const SearchBar = ({
                       searchTerm,
                       setSearchTerm,
                       showAllergenFilter,
                       toggleAllergenFilter,
                       excludedAllergens
                   }) => {
    return (
        <div className={styles.stickySearchbar}>
            <div className={styles.searchbarContainer}>
                <div className={styles.searchInputWrapper}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search for food, category, or allergens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.foodSearchbar}
                    />
                    {searchTerm && (
                        <button
                            className={styles.clearSearchButton}
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
                <button
                    className={`${styles.filterToggleButton} ${
                        showAllergenFilter ? styles.filterToggleButtonActive : ""
                    }`}
                    onClick={toggleAllergenFilter}
                    aria-label="Filter by allergens"
                >
                    <FaFilter />
                    {excludedAllergens.length > 0 && (
                        <span className={styles.filterBadge}>{excludedAllergens.length}</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SearchBar;