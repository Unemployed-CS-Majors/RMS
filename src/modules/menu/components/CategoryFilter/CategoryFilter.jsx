import React from "react";
import styles from "./CategoryFilter.module.css";

/**
 * CategoryFilter component
 *
 * Renders a list of category buttons and allows selecting an active category.
 *
 * @param {Object} props - The component props
 * @param {Array} props.categories - The list of categories to display
 * @param {string} props.activeCategory - The currently active category
 * @param {Function} props.setActiveCategory - Function to set the active category
 * @returns {JSX.Element} The CategoryFilter component
 */
const CategoryFilter = ({categories, activeCategory, setActiveCategory}) => {
    return (
        <div className={styles.categoryContainer}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${styles.categoryButton} ${
                        activeCategory === category ? styles.activeCategory : ""
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;