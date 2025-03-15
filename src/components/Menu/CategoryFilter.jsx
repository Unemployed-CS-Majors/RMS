import React from "react";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                overflow: "auto",
                padding: "0.5rem 0 1.5rem",
                gap: "0.75rem",
                scrollbarWidth: "none",
            }}>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        border: "none",
                        backgroundColor: activeCategory === category ? "var(--primary)" : "var(--white)",
                        color: activeCategory === category ? "white" : "var(--text-medium)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontWeight: activeCategory === category ? "600" : "normal",
                        boxShadow: activeCategory === category ? "0 4px 10px rgba(255, 125, 5, 0.2)" : "var(--shadow-soft)",
                        transition: "var(--transition)",
                    }}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;