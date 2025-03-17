import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuItemsList.module.css";

/**
 * MenuItemsList component
 *
 * Renders a list of menu items. If no items are found, displays a message indicating that no items were found.
 *
 * @param {Object} props - The component props
 * @param {Array} props.filteredItems - The list of filtered menu items to display
 * @param {Function} props.openItemDetails - Function to open the item details modal
 * @param {Function} props.addToCart - Function to add an item to the cart
 * @param {boolean} props.orderEnabled - Whether ordering is enabled
 * @returns {JSX.Element} The MenuItemsList component
 */
const MenuItemsList = ({ filteredItems, openItemDetails, addToCart, orderEnabled }) => {
    if (filteredItems.length === 0) {
        return (
            <div className={styles.menuItemsContainer}>
                <div className={styles.noItemsMessage}>
                    No items found. Try adjusting your search or filters.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.menuItemsContainer}>
            {filteredItems.map(item => (
                <MenuItem
                    key={item.id}
                    item={item}
                    openItemDetails={openItemDetails}
                    addToCart={addToCart}
                    orderEnabled={orderEnabled}
                />
            ))}
        </div>
    );
};

export default MenuItemsList;