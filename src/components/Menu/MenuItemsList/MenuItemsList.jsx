import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuItemsList.module.css";

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