import React, { useContext } from 'react';
import { FiCheck } from 'react-icons/fi';
import { MdLocalShipping, MdOutlineDone, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineStore } from 'react-icons/md';
import styles from './CollectionMethod.module.css';
import { AuthContext } from "../../../shared/contexts/AuthContext";

/**
 * CollectionMethod component renders the collection method selection step in the checkout process.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Flag indicating if the step content is open.
 * @param {Function} props.toggleContent - Function to toggle the step content visibility.
 * @param {boolean} props.isCompleted - Flag indicating if the step is completed.
 * @param {string} props.collectionMethod - The selected collection method ('pickup' or 'home_delivery').
 * @param {boolean} props.isDelivery - Flag indicating if the delivery option is selected.
 * @param {Object} props.address - The address object containing delivery address details.
 * @param {Function} props.setAddress - Function to update the address state.
 * @param {Function} props.handleCollectionMethodChange - Function to handle the change of collection method.
 * @returns {JSX.Element} The rendered CollectionMethod component.
 */
const CollectionMethod = ({
                              isOpen,
                              toggleContent,
                              isCompleted,
                              collectionMethod,
                              isDelivery,
                              address,
                              setAddress,
                              handleCollectionMethodChange
                          }) => {
    const { config } = useContext(AuthContext);

    // Extract delivery-related feature flags
    const isFeatureEnabled = (featureName) => {
        if (!config?.features || !Array.isArray(config.features)) return false;
        const feature = config.features.find(f => f.name === featureName);
        return feature ? feature.enabled : false;
    };

    const isHomeDeliveryEnabled = isFeatureEnabled('home_delivery');
    const isOrderPickupEnabled = isFeatureEnabled('order_pickup');

    return (
        <div className={styles.step}>
            <div
                className={styles.stepHeader}
                onClick={() => toggleContent(2)}
            >
                <div className={`${styles.stepIcon} ${isCompleted ? styles.completed : ''}`}>
                    {isCompleted ? <MdOutlineDone /> : <MdLocalShipping />}
                </div>
                <h3 className={styles.stepTitle}>Collection Method</h3>
                <button className={styles.toggleButton}>
                    {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </button>
            </div>

            <div className={`${styles.stepContent} ${isOpen ? styles.open : ''}`}>
                <div className={styles.collectionMethod}>
                    <div className={styles.radioOptions}>
                        {isHomeDeliveryEnabled || isOrderPickupEnabled ? (
                            <>
                                {isOrderPickupEnabled && (
                                    <div
                                        className={`${styles.radioCard} ${collectionMethod === 'pickup' ? styles.selected : ''}`}
                                        onClick={() => handleCollectionMethodChange('pickup')}
                                    >
                                        <MdOutlineStore className={styles.optionIcon} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionTitle}>Pickup</span>
                                            <span className={styles.optionDesc}>Collect your order at our store</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                            {collectionMethod === 'pickup' && <FiCheck />}
                                        </div>
                                    </div>
                                )}

                                {isHomeDeliveryEnabled && (
                                    <div
                                        className={`${styles.radioCard} ${collectionMethod === 'home_delivery' ? styles.selected : ''}`}
                                        onClick={() => handleCollectionMethodChange('home_delivery')}
                                    >
                                        <MdLocalShipping className={styles.optionIcon} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionTitle}>Home Delivery</span>
                                            <span className={styles.optionDesc}>Delivered to your address</span>
                                        </div>
                                        <div className={styles.radioIndicator}>
                                            {collectionMethod === 'home_delivery' && <FiCheck />}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.noCollectionMethods}>
                                <p>Sorry, we currently don't have any collection methods available.</p>
                            </div>
                        )}
                    </div>

                    {isDelivery && isHomeDeliveryEnabled && (
                        <div className={styles.addressFields}>
                            <div className={styles.inputGrid}>
                                <div className={styles.inputField}>
                                    <label>Street</label>
                                    <input
                                        type='text'
                                        value={address.street}
                                        onChange={e => setAddress({ ...address, street: e.target.value })}
                                        placeholder='123 Main St'
                                    />
                                </div>
                                <div className={styles.inputField}>
                                    <label>City</label>
                                    <input
                                        type='text'
                                        value={address.city}
                                        onChange={e => setAddress({ ...address, city: e.target.value })}
                                        placeholder='Dublin'
                                    />
                                </div>
                                <div className={styles.inputField}>
                                    <label>County</label>
                                    <input
                                        type='text'
                                        value={address.county}
                                        onChange={e => setAddress({ ...address, county: e.target.value })}
                                        placeholder='Dublin'
                                    />
                                </div>
                                <div className={styles.inputField}>
                                    <label>Eircode</label>
                                    <input
                                        type='text'
                                        value={address.eirCode}
                                        onChange={e => setAddress({ ...address, eirCode: e.target.value })}
                                        placeholder='D01 AB12'
                                    />
                                </div>
                                <div className={styles.inputField}>
                                    <label>Country</label>
                                    <input
                                        type='text'
                                        value={address.country}
                                        onChange={e => setAddress({ ...address, country: e.target.value })}
                                        placeholder='Ireland'
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollectionMethod;