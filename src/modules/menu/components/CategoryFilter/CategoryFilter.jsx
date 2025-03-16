import React from "react";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
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