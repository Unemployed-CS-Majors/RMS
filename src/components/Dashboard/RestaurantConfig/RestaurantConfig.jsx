import React, { useState } from 'react';
import './RestaurantConfig.css';
import { useRestaurantConfig } from '../../../pages/Dashboard/hooks/useRestaurantConfig';
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
        <div className="restaurant-config">
            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="config-grid">
                {/* Contact Information Section */}
                <div className="config-card">
                    <div className="card-header-config">
                        <h3 className="card-title">Contact Information</h3>
                        <button
                            type="button"
                            className="edit-button-config"
                            onClick={() => setEditingContact(!editingContact)}
                        >
                            {editingContact ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingContact ? (
                        <form onSubmit={saveContactInfo}>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber || ''}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+353 1 234 5678"
                                />
                                {validationErrors.phoneNumber && (
                                    <span className="error-message">{validationErrors.phoneNumber}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="contact@restaurant.com"
                                />
                                {validationErrors.email && (
                                    <span className="error-message">{validationErrors.email}</span>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-button">Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className="info-display">
                            <div className="info-item">
                                <span className="info-label">Phone:</span>
                                <span className="info-value">{phoneNumber || 'Not set'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{email || 'Not set'}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Address Section */}
                <div className="config-card">
                    <div className="card-header-config">
                        <h3 className="card-title">Restaurant Address</h3>
                        <button
                            type="button"
                            className="edit-button-config"
                            onClick={() => setEditingAddress(!editingAddress)}
                        >
                            {editingAddress ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingAddress ? (
                        <form onSubmit={saveAddress}>
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    id="street"
                                    value={address.street}
                                    onChange={(e) => setAddress({...address, street: e.target.value})}
                                    placeholder="123 Main Street"
                                />
                                {validationErrors.street && (
                                    <span className="error-message">{validationErrors.street}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={address.city}
                                    onChange={(e) => setAddress({...address, city: e.target.value})}
                                    placeholder="Dublin"
                                />
                                {validationErrors.city && (
                                    <span className="error-message">{validationErrors.city}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="county">County</label>
                                    <input
                                        type="text"
                                        id="county"
                                        value={address.county}
                                        onChange={(e) => setAddress({...address, county: e.target.value})}
                                        placeholder="Dublin"
                                    />
                                    {validationErrors.county && (
                                        <span className="error-message">{validationErrors.county}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="eircode">Eircode</label>
                                    <input
                                        type="text"
                                        id="eircode"
                                        value={address.eircode}
                                        onChange={(e) => setAddress({...address, eircode: e.target.value})}
                                        placeholder="D01 AB12"
                                    />
                                    {validationErrors.eircode && (
                                        <span className="error-message">{validationErrors.eircode}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    value={address.country}
                                    onChange={(e) => setAddress({...address, country: e.target.value})}
                                    placeholder="Ireland"
                                />
                                {validationErrors.country && (
                                    <span className="error-message">{validationErrors.country}</span>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-button">Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className="info-display">
                            {address.street ? (
                                <>
                                    <div className="info-item">
                                        <span className="info-value">
                                            {address.street}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-value">
                                            {address.city}, {address.county} {address.eircode}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-value">
                                            {address.country}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="info-item">
                                    <span className="info-value">Address not set</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Map Section */}
                <div className="config-card map-card">
                    <div className="card-header-config">
                        <h3 className="card-title">Map Location</h3>
                        <button
                            type="button"
                            className="edit-button-config"
                            onClick={() => setEditingMap(!editingMap)}
                        >
                            {editingMap ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editingMap ? (
                        <form onSubmit={saveMap}>
                            <div className="form-group">
                                <label htmlFor="mapIFrame">Google Maps Embed URL</label>
                                <textarea
                                    id="mapIFrame"
                                    value={mapIFrame}
                                    onChange={(e) => setMapIFrame(e.target.value)}
                                    placeholder='https://www.google.com/maps/embed?pb=...'
                                    rows={4}
                                />
                                <p className="help-text">
                                    Paste the URL from the Google Maps embed code (src attribute). You can get this from Google Maps by clicking "Share" and then "Embed a map".
                                </p>
                                {validationErrors.mapIFrame && (
                                    <span className="error-message">{validationErrors.mapIFrame}</span>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-button">Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className="map-display">
                            {mapIFrame ? (
                                <div className="map-iframe">
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
                                <div className="map-placeholder">
                                    <p>No map configuration set</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Features Toggle Section */}
                <div className="config-card features-card">
                    <div className="card-header-config">
                        <h3 className="card-title">Restaurant Features</h3>
                    </div>

                    <div className="features-list">
                        {/* Website Navigation Features */}
                        <div className="feature-group">
                            <h4 className="feature-group-title">Website Navigation</h4>
                            <p className="feature-group-description">Control which tabs appear in your website navigation</p>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Menu</h4>
                                    <p>Enable the Menu tab in website navigation</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.menu}
                                        onChange={() => toggleFeature('menu')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Online Reservations</h4>
                                    <p>Enable the Reservations tab in website navigation</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.online_reservations}
                                        onChange={() => toggleFeature('online_reservations')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        {/* Ordering Features */}
                        <div className="feature-group">
                            <h4 className="feature-group-title">Ordering Capabilities</h4>
                            <p className="feature-group-description">Control ordering functionality and delivery options</p>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Online Ordering</h4>
                                    <p>Enable checkout and cart functionality for customer orders</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.online_ordering}
                                        onChange={() => toggleFeature('online_ordering')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Home Delivery</h4>
                                    <p>Allow customers to select home delivery option at checkout</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.home_delivery}
                                        onChange={() => toggleFeature('home_delivery')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Order Pickup</h4>
                                    <p>Allow customers to select in-store pickup option at checkout</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.order_pickup}
                                        onChange={() => toggleFeature('order_pickup')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        {/* Payment Features */}
                        <div className="feature-group">
                            <h4 className="feature-group-title">Payment Options</h4>
                            <p className="feature-group-description">Control available payment methods for customer orders</p>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Online Payment</h4>
                                    <p>Allow customers to pay online during checkout</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.online_payment}
                                        onChange={() => toggleFeature('online_payment')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>In-Store Payment</h4>
                                    <p>Allow customers to pay at restaurant during pickup</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.in_store_payment}
                                        onChange={() => toggleFeature('in_store_payment')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="feature-item">
                                <div className="feature-info">
                                    <h4>Cash Payment</h4>
                                    <p>Allow customers to pay with cash upon delivery or pickup</p>
                                </div>
                                <label className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={features.cash_payment}
                                        onChange={() => toggleFeature('cash_payment')}
                                    />
                                    <span className="toggle-slider"></span>
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