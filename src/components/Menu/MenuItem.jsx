import React from "react";
import { FaRegClock } from "react-icons/fa";
import { IoFlameOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

const MenuItem = ({ item, openItemDetails, addToCart, orderEnabled }) => {
    // Display allergen information as badges
    const renderAllergens = (item) => {
        if (!item.allergens || item.allergens.length === 0) return null;

        return (
            <div className="allergen-badges">
                {item.allergens.map((allergen, index) => (
                    <span
                        key={index}
                        className="allergen-badge"
                        title={`Contains ${allergen.charAt(0).toUpperCase() + allergen.slice(1)}`}
                    >
            <span>{allergen.charAt(0).toUpperCase()}</span>
          </span>
                ))}
            </div>
        );
    };

    return (
        <div className='menu-item' onClick={() => openItemDetails(item)}>
            <div className='item-image-container'>
                <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-food-image.jpg";
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div className='menu-item-content'>
                <h3 className='menu-item-name'>{item.name}</h3>
                <div className='menu-item-badges'>
                    <span className='menu-item-badge'>{item.category}</span>
                    {renderAllergens(item)}
                </div>
                <div className='menu-item-details-container'>
                    <div className='menu-item-info-container'>
                        <div className='menu-item-info'>
                            <FaRegClock className='info-icon' /> {item.time}
                        </div>
                        <div className='menu-item-info'>
                            <IoFlameOutline className='info-icon' /> {item.kcal} kcal
                        </div>
                    </div>
                    {orderEnabled === true && (<div className='menu-item-btn-container'>
                        <div className='menu-item-price'>&euro;{Number(item.price).toFixed(2)}</div>
                        <button
                            className='item-btn'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent opening the details modal
                                addToCart(item);
                            }}
                        >
                            <FiPlus/>
                        </button>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;