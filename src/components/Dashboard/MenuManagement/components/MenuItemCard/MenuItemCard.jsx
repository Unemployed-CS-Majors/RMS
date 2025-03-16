import React from 'react';
import styles from './MenuItemCard.module.css';

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
        ? `€${item.price.toFixed(2)}`
        : `€${item.price}`;

    // Get allergen display names
    const allergenLabels = (item.allergens || []).map(code => {
        const allergen = allergens && Array.isArray(allergens) ? allergens.find(a => a.value === code) : null;
        return allergen ? allergen.key.charAt(0) + allergen.key.slice(1).toLowerCase() : code;
    });

    // Capitalize first letter of type
    const formattedType = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : '';

    return (
        <div className={styles.menuItemCard}>
            <div className={styles.menuItemImageContainer}>
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={styles.menuItemImage}
                    />
                ) : (
                    <div className={styles.menuItemPlaceholder}>
                        <span>No Image</span>
                    </div>
                )}
                <div className={styles.menuItemTypeBadge}>{formattedType}</div>
            </div>

            <div className={styles.menuItemContent}>
                <div className={styles.menuItemHeader}>
                    <h3 className={styles.menuItemName}>{item.name}</h3>
                    <span className={styles.menuItemPrice}>{formattedPrice}</span>
                </div>

                {item.calories && (
                    <div className={styles.menuItemCalories}>
                        {item.calories} calories
                    </div>
                )}

                {item.avgWaitTime && (
                    <div className={styles.menuItemWaitTime}>
                        Avg. wait: {item.avgWaitTime} min
                    </div>
                )}

                {allergenLabels.length > 0 && (
                    <div className={styles.menuItemAllergens}>
                        <span className={styles.allergenLabel}>Contains:</span>
                        <div className={styles.allergenTags}>
                            {allergenLabels.map(allergen => (
                                <span key={allergen} className={styles.allergenTag}>
                                    {allergen}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.menuItemActions}>
                    <button
                        className={styles.editButtonMenu}
                        onClick={onEdit}
                        aria-label="Edit item"
                    >
                        Edit
                    </button>
                    <button
                        className={styles.deleteButton}
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