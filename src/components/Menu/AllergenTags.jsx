import React from "react";
import { FaTimes } from "react-icons/fa";

const AllergenTags = ({ excludedAllergens, toggleAllergen }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                overflow: "auto",
                padding: "0.5rem 0 1.5rem",
                gap: "0.75rem",
                scrollbarWidth: "none",
            }}>
            <span>Excluding:</span>
            {excludedAllergens.map(allergen => (
                <button
                    key={allergen}
                    onClick={() => toggleAllergen(allergen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        border: "none",
                        backgroundColor: "var(--white)",
                        color: "var(--text-medium)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontWeight: "normal",
                        boxShadow: "var(--shadow-soft)",
                        transition: "var(--transition)",
                    }}>
                    {allergen} <FaTimes style={{ padding: "0rem 0rem 0rem 0.3rem" }} />
                </button>
            ))}
        </div>
    );
};

export default AllergenTags;