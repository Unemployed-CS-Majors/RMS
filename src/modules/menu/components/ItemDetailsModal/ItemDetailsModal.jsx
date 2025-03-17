import React from "react";
import {MdClose} from "react-icons/md";
import {FiMinus, FiPlus} from "react-icons/fi";
import styles from "./ItemDetailsModal.module.css";

/**
 * ItemDetailsModal component
 *
 * Renders a modal displaying detailed information about a selected item,
 * including its image, name, category, price, description, preparation time,
 * calories, and allergens. Allows adding or removing the item from the cart.
 *
 * @param {Object} props - The component props
 * @param {Object} props.selectedItem - The currently selected item
 * @param {Function} props.setSelectedItem - Function to set the selected item
 * @param {Object} props.detailsRef - Reference to the modal element
 * @param {Array} props.cart - The list of items in the cart
 * @param {Function} props.addToCart - Function to add an item to the cart
 * @param {Function} props.removeFromCart - Function to remove an item from the cart
 * @param {boolean} props.orderEnabled - Whether ordering is enabled
 * @returns {JSX.Element|null} The ItemDetailsModal component
 */
const ItemDetailsModal = ({
                              selectedItem,
                              setSelectedItem,
                              detailsRef,
                              cart,
                              addToCart,
                              removeFromCart,
                              orderEnabled
                          }) => {
    // Format allergen name for display
    const formatAllergenName = (allergen) => {
        return allergen.charAt(0).toUpperCase() + allergen.slice(1);
    };

    // Display allergen information as badges
    const renderAllergens = (item, inline = true) => {
        if (!item.allergens || item.allergens.length === 0) return null;

        return (
            <div className={`${styles.allergenBadges} ${inline ? styles.allergenBadgesInline : ''}`}>
                {item.allergens.map((allergen, index) => (
                    <span
                        key={index}
                        className={styles.allergenBadge}
                        title={`Contains ${formatAllergenName(allergen)}`}
                    >
            <span>
              {inline ? formatAllergenName(allergen) : allergen.charAt(0).toUpperCase()}
            </span>
          </span>
                ))}
            </div>
        );
    };

    // Handler to close the modal
    const closeModal = () => setSelectedItem(null);

    // Get the item quantity from cart
    const itemQuantity = cart.find(item => item.id === selectedItem.id)?.quantity || 0;

    // Handler to add to cart and close modal
    const handleAddToCartAndClose = () => {
        addToCart(selectedItem);
        setSelectedItem(null);
    };

    return (
        <div className={styles.itemDetailOverlay} onClick={closeModal}>
            <div
                className={styles.itemDetailModal}
                ref={detailsRef}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeDetailButton}
                    onClick={closeModal}
                    aria-label="Close details"
                >
                    <MdClose/>
                </button>

                <div className={styles.itemDetailContent}>
                    <div className={styles.itemDetailImageContainer}>
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className={styles.itemDetailImage}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-food-image.jpg";
                            }}
                        />
                    </div>

                    <div className={styles.itemDetailInfo}>
                        <h2 className={styles.itemDetailName}>{selectedItem.name}</h2>

                        <div className={styles.itemDetailCategoryContainer}>
                            <span className={styles.itemDetailCategory}>{selectedItem.category}</span>
                            <div className={styles.itemDetailPrice}>&euro;{Number(selectedItem.price).toFixed(2)}</div>
                        </div>

                        <p className={styles.itemDetailDescription}>{selectedItem.description}</p>

                        <div className={styles.itemDetailSpecifications}>
                            <div className={styles.itemDetailSpec}>
                                <span className={styles.specLabel}>Preparation Time</span>
                                <span className={styles.specValue}>{selectedItem.time}</span>
                            </div>

                            <div className={styles.itemDetailSpec}>
                                <span className={styles.specLabel}>Calories</span>
                                <span className={styles.specValue}>{selectedItem.kcal} kcal</span>
                            </div>

                            <div className={`${styles.itemDetailSpec} ${styles.allergenSpec}`}>
                                <span className={styles.specLabel}>Allergens</span>
                                <div className={styles.specValue}>
                                    {selectedItem.allergens && selectedItem.allergens.length > 0 ? (
                                        renderAllergens(selectedItem, true)
                                    ) : (
                                        <span className={styles.noAllergens}>No allergens</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {orderEnabled === true && (
                            <div className={styles.itemDetailActions}>
                                <div className={styles.itemQuantityControls}>
                                    <button
                                        className={styles.quantityControlBtn}
                                        onClick={() => removeFromCart(selectedItem.id)}
                                        disabled={!itemQuantity}
                                        aria-label="Decrease quantity"
                                    >
                                        <FiMinus/>
                                    </button>

                                    <span className={styles.quantityDisplay}>
                    {itemQuantity}
                  </span>

                                    <button
                                        className={styles.quantityControlBtn}
                                        onClick={() => addToCart(selectedItem)}
                                        aria-label="Increase quantity"
                                    >
                                        <FiPlus/>
                                    </button>
                                </div>

                                <button
                                    className={styles.addToCartBtn}
                                    onClick={handleAddToCartAndClose}
                                    aria-label={`Add ${selectedItem.name} to cart`}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsModal;