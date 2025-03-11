import React from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

const SearchBar = ({
                       searchTerm,
                       setSearchTerm,
                       showAllergenFilter,
                       toggleAllergenFilter,
                       excludedAllergens
                   }) => {
    return (
        <div className='sticky-searchbar'>
            <div className='searchbar-container'>
                <div className='search-input-wrapper'>
                    <FaSearch className='search-icon' />
                    <input
                        type='text'
                        placeholder='Search for food, category, or allergens...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='food-searchbar'
                    />
                    {searchTerm && (
                        <button
                            className="clear-search-button"
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
                <button
                    className="filter-toggle-button"
                    onClick={toggleAllergenFilter}
                    aria-label="Filter by allergens"
                    data-active={showAllergenFilter}
                >
                    <FaFilter />
                    {excludedAllergens.length > 0 && (
                        <span className="filter-badge">{excludedAllergens.length}</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SearchBar;