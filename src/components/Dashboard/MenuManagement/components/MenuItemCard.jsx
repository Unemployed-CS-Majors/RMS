import React from 'react';

/**
 * MenuItemCard component
 *
 * Displays a single menu item in a card format
 *
 * @param {Object} item - Menu item data
 * @param {Function} onEdit - Function to call when edit button is clicked
 * @param {Function} onDelete - Function to call when delete button is clicked
 * @param {Array} allergens - List of all allergen options for lookup
 */
const MenuItemCard = ({ item, onEdit, onDelete, allergens }) => {
    // Format price to display with 2 decimal places
    const formattedPrice = typeof item.price === 'number'
        ? `$${item.price.toFixed(2)}`
        : `$${item.price}`;

    // Get allergen display names
    const allergenLabels = (item.allergens || []).map(code => {
        const allergen = allergens && Array.isArray(allergens) ? allergens.find(a => a.value === code) : null;
        return allergen ? allergen.key.charAt(0) + allergen.key.slice(1).toLowerCase() : code;
    });

    // Capitalize first letter of type
    const formattedType = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : '';

    return (
        <div className="menu-item-card">
            <div className="menu-item-image-container">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="menu-item-image"
                    />
                ) : (
                    <div className="menu-item-placeholder">
                        <span>No Image</span>
                    </div>
                )}
                <div className="menu-item-type-badge">{formattedType}</div>
            </div>

            <div className="menu-item-content">
                <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{formattedPrice}</span>
                </div>

                {item.calories && (
                    <div className="menu-item-calories">
                        {item.calories} calories
                    </div>
                )}

                {item.avgWaitTime && (
                    <div className="menu-item-wait-time">
                        Avg. wait: {item.avgWaitTime} min
                    </div>
                )}

                {allergenLabels.length > 0 && (
                    <div className="menu-item-allergens">
                        <span className="allergen-label">Contains:</span>
                        <div className="allergen-tags">
                            {allergenLabels.map(allergen => (
                                <span key={allergen} className="allergen-tag">
                                    {allergen}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="menu-item-actions">
                    <button
                        className="edit-button-menu"
                        onClick={onEdit}
                        aria-label="Edit item"
                    >
                        Edit
                    </button>
                    <button
                        className="delete-button"
                        onClick={onDelete}
                        aria-label="Delete item"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;