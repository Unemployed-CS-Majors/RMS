import React, { useState } from 'react';
import styles from './RestaurantConfig.module.css';
import { useRestaurantConfig } from '../../hooks/useRestaurantConfig';
import LoadingIndicator from '../Loading/LoadingIndicator';

const RestaurantConfig = ({ loading, setLoading }) => {
    // Use the custom hook
    const {
        phoneNumber,
        email,
        address,
        mapIFrame,
        features,
        editingContact,
        editingAddress,
        editingMap,
        validationErrors,
        notification,
        setPhoneNumber,
        setEmail,
        setAddress,
        setMapIFrame,
        setEditingContact,
        setEditingAddress,
        setEditingMap,
        saveContactInfo,
        saveAddress,
        saveMap,
        toggleFeature,
        showNotification,
        fetchRestaurantConfig
    } = useRestaurantConfig(setLoading);

    // If loading, show loading indicator
    if (loading) {
        return <LoadingIndicator text="Loading Restaurant Configuration..." />;
    }

    return (
        <div className={styles.restaurantConfig}>
            {/* Notification */}
            {notification.show && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    {notification.message}
                </div>
            )}

            <div className={styles.configGrid}>
                {/* Contact Information Section */}
                <div className={styles.configCard}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Contact Information</h3>
                        <button
                            type="button"
                            className={styles.editButton}
                            onClick={() => setEditingContact(!editingContact)}
                        >
                            {editingContact ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingContact ? (
                        <form onSubmit={saveContactInfo}>
                            <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber || ''}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+353 1 234 5678"
                                />
                                {validationErrors.phoneNumber && (
                                    <span className={styles.errorMessage}>{validationErrors.phoneNumber}</span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="contact@restaurant.com"
                                />
                                {validationErrors.email && (
                                    <span className={styles.errorMessage}>{validationErrors.email}</span>
                                )}
                            </div>

                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.infoDisplay}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Phone:</span>
                                <span className={styles.infoValue}>{phoneNumber || 'Not set'}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Email:</span>
                                <span className={styles.infoValue}>{email || 'Not set'}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Address Section */}
                <div className={styles.configCard}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Restaurant Address</h3>
                        <button
                            type="button"
                            className={styles.editButton}
                            onClick={() => setEditingAddress(!editingAddress)}
                        >
                            {editingAddress ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingAddress ? (
                        <form onSubmit={saveAddress}>
                            <div className={styles.formGroup}>
                                <label htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    id="street"
                                    value={address.street}
                                    onChange={(e) => setAddress({...address, street: e.target.value})}
                                    placeholder="123 Main Street"
                                />
                                {validationErrors.street && (
                                    <span className={styles.errorMessage}>{validationErrors.street}</span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={address.city}
                                    onChange={(e) => setAddress({...address, city: e.target.value})}
                                    placeholder="Dublin"
                                />
                                {validationErrors.city && (
                                    <span className={styles.errorMessage}>{validationErrors.city}</span>
                                )}
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="county">County</label>
                                    <input
                                        type="text"
                                        id="county"
                                        value={address.county}
                                        onChange={(e) => setAddress({...address, county: e.target.value})}
                                        placeholder="Dublin"
                                    />
                                    {validationErrors.county && (
                                        <span className={styles.errorMessage}>{validationErrors.county}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="eircode">Eircode</label>
                                    <input
                                        type="text"
                                        id="eircode"
                                        value={address.eircode}
                                        onChange={(e) => setAddress({...address, eircode: e.target.value})}
                                        placeholder="D01 AB12"
                                    />
                                    {validationErrors.eircode && (
                                        <span className={styles.errorMessage}>{validationErrors.eircode}</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    value={address.country}
                                    onChange={(e) => setAddress({...address, country: e.target.value})}
                                    placeholder="Ireland"
                                />
                                {validationErrors.country && (
                                    <span className={styles.errorMessage}>{validationErrors.country}</span>
                                )}
                            </div>

                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.infoDisplay}>
                            {address.street ? (
                                <>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoValue}>
                                            {address.street}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoValue}>
                                            {address.city}, {address.county} {address.eircode}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoValue}>
                                            {address.country}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.infoItem}>
                                    <span className={styles.infoValue}>Address not set</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Map Section */}
                <div className={`${styles.configCard} ${styles.mapCard}`}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Map Location</h3>
                        <button
                            type="button"
                            className={styles.editButton}
                            onClick={() => setEditingMap(!editingMap)}
                        >
                            {editingMap ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingMap ? (
                        <form onSubmit={saveMap}>
                            <div className={styles.formGroup}>
                                <label htmlFor="mapIFrame">Google Maps Embed URL</label>
                                <textarea
                                    id="mapIFrame"
                                    value={mapIFrame}
                                    onChange={(e) => setMapIFrame(e.target.value)}
                                    placeholder='https://www.google.com/maps/embed?pb=...'
                                    rows={4}
                                />
                                <p className={styles.helpText}>
                                    Paste the URL from the Google Maps embed code (src attribute). You can get this from Google Maps by clicking "Share" and then "Embed a map".
                                </p>
                                {validationErrors.mapIFrame && (
                                    <span className={styles.errorMessage}>{validationErrors.mapIFrame}</span>
                                )}
                            </div>

                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.mapDisplay}>
                            {mapIFrame ? (
                                <div className={styles.mapIframe}>
                                    <iframe
                                        src={mapIFrame}
                                        width="100%"
                                        height="300"
                                        style={{border:0}}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className={styles.mapPlaceholder}>
                                    <p>No map configuration set</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Features Toggle Section */}
                <div className={`${styles.configCard} ${styles.featuresCard}`}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Restaurant Features</h3>
                    </div>

                    <div className={styles.featuresList}>
                        {/* Website Navigation Features */}
                        <div className={styles.featureGroup}>
                            <h4 className={styles.featureGroupTitle}>Website Navigation</h4>
                            <p className={styles.featureGroupDescription}>Control which tabs appear in your website navigation</p>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Menu</h4>
                                    <p>Enable the Menu tab in website navigation</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.menu}
                                        onChange={() => toggleFeature('menu')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Online Reservations</h4>
                                    <p>Enable the Reservations tab in website navigation</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.online_reservations}
                                        onChange={() => toggleFeature('online_reservations')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>

                        {/* Ordering Features */}
                        <div className={styles.featureGroup}>
                            <h4 className={styles.featureGroupTitle}>Ordering Capabilities</h4>
                            <p className={styles.featureGroupDescription}>Control ordering functionality and delivery options</p>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Online Ordering</h4>
                                    <p>Enable checkout and cart functionality for customer orders</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.online_ordering}
                                        onChange={() => toggleFeature('online_ordering')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Home Delivery</h4>
                                    <p>Allow customers to select home delivery option at checkout</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.home_delivery}
                                        onChange={() => toggleFeature('home_delivery')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Order Pickup</h4>
                                    <p>Allow customers to select in-store pickup option at checkout</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.order_pickup}
                                        onChange={() => toggleFeature('order_pickup')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>

                        {/* Payment Features */}
                        <div className={styles.featureGroup}>
                            <h4 className={styles.featureGroupTitle}>Payment Options</h4>
                            <p className={styles.featureGroupDescription}>Control available payment methods for customer orders</p>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Online Payment</h4>
                                    <p>Allow customers to pay online during checkout</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.online_payment}
                                        onChange={() => toggleFeature('online_payment')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>In-Store Payment</h4>
                                    <p>Allow customers to pay at restaurant during pickup</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.in_store_payment}
                                        onChange={() => toggleFeature('in_store_payment')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureInfo}>
                                    <h4>Cash Payment</h4>
                                    <p>Allow customers to pay with cash upon delivery or pickup</p>
                                </div>
                                <label className={styles.toggleContainer}>
                                    <input
                                        type="checkbox"
                                        className={styles.toggleInput}
                                        checked={features.cash_payment}
                                        onChange={() => toggleFeature('cash_payment')}
                                    />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantConfig;