import React from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import styles from "./SearchBar.module.css";

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