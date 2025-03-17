import React from "react";
import { FaRegClock } from "react-icons/fa";
import { IoFlameOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import styles from "./MenuItem.module.css";

/**
 * MenuItem component
 *
 * Renders a menu item with its image, name, category, preparation time, calories,
 * and allergens. Allows adding the item to the cart and opening the item details modal.
 *
 * @param {Object} props - The component props
 * @param {Object} props.item - The menu item object
 * @param {Function} props.openItemDetails - Function to open the item details modal
 * @param {Function} props.addToCart - Function to add the item to the cart
 * @param {boolean} props.orderEnabled - Whether ordering is enabled
 * @returns {JSX.Element} The MenuItem component
 */
const MenuItem = ({ item, openItemDetails, addToCart, orderEnabled }) => {
    // Display allergen information as badges
    const renderAllergens = (item) => {
        if (!item.allergens || item.allergens.length === 0) return null;

        return (
            <div className={styles.allergenBadges}>
                {item.allergens.map((allergen, index) => (
                    <span
                        key={index}
                        className={styles.allergenBadge}
                        title={`Contains ${allergen.charAt(0).toUpperCase() + allergen.slice(1)}`}
                    >
                        <span>{allergen.charAt(0).toUpperCase()}</span>
                    </span>
                ))}
            </div>
        );
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent opening the details modal
        addToCart(item);
    };

    return (
        <div className={styles.menuItem} onClick={() => openItemDetails(item)}>
            <div className={styles.itemImageContainer}>
                <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-food-image.jpg";
                    }}
                    className={styles.itemImage}
                />
            </div>
            <div className={styles.menuItemContent}>
                <h3 className={styles.menuItemName}>{item.name}</h3>
                <div className={styles.menuItemBadges}>
                    <span className={styles.menuItemBadge}>{item.category}</span>
                    {renderAllergens(item)}
                </div>
                <div className={styles.menuItemDetailsContainer}>
                    <div className={styles.menuItemInfoContainer}>
                        <div className={styles.menuItemInfo}>
                            <FaRegClock className={styles.infoIcon} /> {item.time}
                        </div>
                        <div className={styles.menuItemInfo}>
                            <IoFlameOutline className={styles.infoIcon} /> {item.kcal} kcal
                        </div>
                    </div>
                    {orderEnabled === true && (
                        <div className={styles.menuItemBtnContainer}>
                            <div className={styles.menuItemPrice}>
                                &euro;{Number(item.price).toFixed(2)}
                            </div>
                            <button
                                className={styles.itemBtn}
                                onClick={handleAddToCart}
                                aria-label={`Add ${item.name} to cart`}
                            >
                                <FiPlus />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;