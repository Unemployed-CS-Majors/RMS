import React from "react";
import { MdClose } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";

const ItemDetailsModal = ({
                              selectedItem,
                              setSelectedItem,
                              detailsRef,
                              cart,
                              addToCart,
                              removeFromCart
                          }) => {
    // Format allergen name for display
    const formatAllergenName = (allergen) => {
        return allergen.charAt(0).toUpperCase() + allergen.slice(1);
    };

    // Display allergen information as badges
    const renderAllergens = (item, inline = true) => {
        if (!item.allergens || item.allergens.length === 0) return null;

        return (
            <div className={`allergen-badges ${inline ? 'allergen-badges-inline' : ''}`}>
                {item.allergens.map((allergen, index) => (
                    <span key={index} className="allergen-badge" title={`Contains ${formatAllergenName(allergen)}`}>
            <span>{inline ? formatAllergenName(allergen) : allergen.charAt(0).toUpperCase()}</span>
          </span>
                ))}
            </div>
        );
    };

    return (
        <div className="item-detail-overlay" onClick={() => setSelectedItem(null)}>
            <div className="item-detail-modal" ref={detailsRef} onClick={(e) => e.stopPropagation()}>
                <button className="close-detail-button" onClick={() => setSelectedItem(null)}>
                    <MdClose />
                </button>

                <div className="item-detail-content">
                    <div className="item-detail-image-container">
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-food-image.jpg";
                            }}
                        />
                    </div>

                    <div className="item-detail-info">
                        <h2 className="item-detail-name">{selectedItem.name}</h2>

                        <div className="item-detail-category-container">
                            <span className="item-detail-category">{selectedItem.category}</span>
                            <div className="item-detail-price">&euro;{Number(selectedItem.price).toFixed(2)}</div>
                        </div>

                        <p className="item-detail-description">{selectedItem.description}</p>

                        <div className="item-detail-specifications">
                            <div className="item-detail-spec">
                                <span className="spec-label">Preparation Time</span>
                                <span className="spec-value">{selectedItem.time}</span>
                            </div>

                            <div className="item-detail-spec">
                                <span className="spec-label">Calories</span>
                                <span className="spec-value">{selectedItem.kcal} kcal</span>
                            </div>

                            <div className="item-detail-spec allergen-spec">
                                <span className="spec-label">Allergens</span>
                                <div className="spec-value">
                                    {selectedItem.allergens && selectedItem.allergens.length > 0 ? (
                                        renderAllergens(selectedItem, true)
                                    ) : (
                                        <span className="no-allergens">No allergens</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="item-detail-actions">
                            <div className="item-quantity-controls">
                                <button
                                    className="quantity-control-btn minus-btn"
                                    onClick={() => removeFromCart(selectedItem.id)}
                                    disabled={!cart.find(item => item.id === selectedItem.id)}
                                >
                                    <FiMinus />
                                </button>

                                <span className="quantity-display">
                  {cart.find(item => item.id === selectedItem.id)?.quantity || 0}
                </span>

                                <button
                                    className="quantity-control-btn plus-btn"
                                    onClick={() => addToCart(selectedItem)}
                                >
                                    <FiPlus />
                                </button>
                            </div>

                            <button className="add-to-cart-btn" onClick={() => {
                                addToCart(selectedItem);
                                setSelectedItem(null);
                            }}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsModal;