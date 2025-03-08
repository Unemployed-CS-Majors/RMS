import React from "react";
import MenuItem from "./MenuItem";

const MenuItemsList = ({ filteredItems, openItemDetails, addToCart }) => {
    if (filteredItems.length === 0) {
        return (
            <div
                style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "3rem 0",
                    color: "var(--text-light)",
                }}>
                No items found. Try adjusting your search or filters.
            </div>
        );
    }

    return (
        <div className='menuItems-container'>
            {filteredItems.map(item => (
                <MenuItem
                    key={item.id}
                    item={item}
                    openItemDetails={openItemDetails}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default MenuItemsList;