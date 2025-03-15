import React, { useState, useEffect } from 'react';
import './RestaurantConfig.css';
import restaurantConfigService from '../../../services/restaurantConfig.service';
import LoadingIndicator from '../Loading/LoadingIndicator';

const RestaurantConfig = ({ loading, setLoading }) => {
    // State for restaurant configuration
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        county: '',
        eircode: '',
        country: ''
    });
    const [mapIFrame, setMapIFrame] = useState('');

    // State for form editing modes - initialize with true if data is null
    const [editingContact, setEditingContact] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [editingMap, setEditingMap] = useState(false);

    // State for tracking initial load
    const [initialized, setInitialized] = useState(false);

    // State for features toggle
    const [features, setFeatures] = useState({
        onlineReservations: true,
        onlineOrdering: true,
        menuEnabled: true,
        homeDelivery: true,
        orderPickup: true,
        onlinePayment: true
    });

    // State for notifications and validation
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [validationErrors, setValidationErrors] = useState({});

    // Fetch restaurant configuration on component mount - ONLY ONCE
    useEffect(() => {
        const fetchRestaurantConfig = async () => {
            try {
                const configResponse = await restaurantConfigService.getRestaurantConfig();

                if (configResponse) {
                    // Set phone number if available
                    if (configResponse.phoneNumber) {
                        setPhoneNumber(configResponse.phoneNumber.phoneNumber || '');
                    }

                    // Set email if available
                    if (configResponse.email) {
                        setEmail(configResponse.email.email || '');
                    }

                    // Set address if available
                    if (configResponse.address) {
                        setAddress(configResponse.address);
                    }

                    // Set map URL if available (note the API returns mapUrl, not mapIFrame)
                    if (configResponse.map) {
                        setMapIFrame(configResponse.map.mapUrl || '');
                    }

                    // Here we would also fetch and set features toggle state
                    // This would require additional API endpoint for features
                    // For now using default values

                    // Auto-open edit forms if data doesn't exist
                    if (!configResponse.phoneNumber && !configResponse.email) {
                        setEditingContact(true);
                    }

                    if (!configResponse.address) {
                        setEditingAddress(true);
                    }

                    if (!configResponse.map) {
                        setEditingMap(true);
                    }

                    setInitialized(true);
                }
            } catch (error) {
                console.error('Error fetching restaurant configuration:', error);
                showNotification('error', 'Failed to load restaurant configuration');
                setInitialized(true);
            }
        };

        fetchRestaurantConfig();
    }, []); // Empty dependency array - run only on mount

    // Helper function to show notifications
    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 5000);
    };

    // Validation functions
    const validatePhoneNumber = (phone) => {
        const errors = {};
        if (!phone) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^[\d\s\+\-\(\)]{10,20}$/.test(phone)) {
            errors.phoneNumber = 'Invalid phone number format';
        }
        return errors;
    };

    const validateEmail = (emailValue) => {
        const errors = {};
        if (!emailValue) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            errors.email = 'Invalid email format';
        }
        return errors;
    };

    const validateAddress = (addressData) => {
        const errors = {};
        if (!addressData.street) errors.street = 'Street is required';
        if (!addressData.city) errors.city = 'City is required';
        if (!addressData.county) errors.county = 'County is required';
        if (!addressData.eircode) errors.eircode = 'Eircode is required';
        if (!addressData.country) errors.country = 'Country is required';
        return errors;
    };

    const validateMapIFrame = (url) => {
        const errors = {};
        if (!url) {
            errors.mapIFrame = 'Map URL is required';
        }
        // Simplified validation - just check if it's a Google Maps URL
        else if (!url.includes('google.com/maps')) {
            errors.mapIFrame = 'Invalid Google Maps URL';
        }
        return errors;
    };

    // Handler functions for form submissions
    const handleContactSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const phoneErrors = validatePhoneNumber(phoneNumber);
        const emailErrors = validateEmail(email);

        if (Object.keys(phoneErrors).length > 0 || Object.keys(emailErrors).length > 0) {
            setValidationErrors({ ...phoneErrors, ...emailErrors });
            return;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            // For phone number
            let phoneResponse = { status: 'success' };
            if (phoneNumber) {
                try {
                    // Check if phone number exists
                    const phoneCheck = await restaurantConfigService.getPhoneNumber();
                    if (phoneCheck) {
                        phoneResponse = await restaurantConfigService.updatePhoneNumber({ phoneNumber });
                    } else {
                        phoneResponse = await restaurantConfigService.addPhoneNumber({ phoneNumber });
                    }
                } catch (error) {
                    // If error or no phone number exists, try to add it
                    phoneResponse = await restaurantConfigService.addPhoneNumber({ phoneNumber });
                }
            } else if (phoneNumber === '') {
                // Only attempt to delete if we have confirmed it exists
                try {
                    const phoneCheck = await restaurantConfigService.getPhoneNumber();
                    if (phoneCheck) {
                        phoneResponse = await restaurantConfigService.deletePhoneNumber();
                    }
                } catch (error) {
                    console.log('No phone number to delete');
                }
            }

            // For email
            let emailResponse = { status: 'success' };
            if (email) {
                try {
                    // Check if email exists
                    const emailCheck = await restaurantConfigService.getEmail();
                    if (emailCheck) {
                        emailResponse = await restaurantConfigService.updateEmail({ email });
                    } else {
                        emailResponse = await restaurantConfigService.addEmail({ email });
                    }
                } catch (error) {
                    // If error or no email exists, try to add it
                    emailResponse = await restaurantConfigService.addEmail({ email });
                }
            } else if (email === '') {
                // Only attempt to delete if we have confirmed it exists
                try {
                    const emailCheck = await restaurantConfigService.getEmail();
                    if (emailCheck) {
                        emailResponse = await restaurantConfigService.deleteEmail();
                    }
                } catch (error) {
                    console.log('No email to delete');
                }
            }

            if (phoneResponse.status === 'success' && emailResponse.status === 'success') {
                showNotification('success', 'Contact information updated successfully');
                setEditingContact(false);

                // Reload configuration
                const configResponse = await restaurantConfigService.getRestaurantConfig();
                if (configResponse && configResponse.phoneNumber) {
                    setPhoneNumber(configResponse.phoneNumber.phoneNumber || '');
                }
                if (configResponse && configResponse.email) {
                    setEmail(configResponse.email.email || '');
                }
            } else {
                showNotification('error', 'Failed to update contact information');
            }
        } catch (error) {
            console.error('Error updating contact information:', error);
            showNotification('error', 'Failed to update contact information');
        } finally {
            setLoading(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        // Validate address
        const addressErrors = validateAddress(address);

        if (Object.keys(addressErrors).length > 0) {
            setValidationErrors(addressErrors);
            return;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            // Check if address exists already, use post if not
            let response;
            try {
                const addressCheck = await restaurantConfigService.getAddress();
                if (addressCheck) {
                    response = await restaurantConfigService.updateAddress(address);
                } else {
                    response = await restaurantConfigService.addAddress(address);
                }
            } catch (error) {
                // If error getting address, try to add it
                response = await restaurantConfigService.addAddress(address);
            }

            if (response.status === 'success') {
                showNotification('success', 'Address updated successfully');
                setEditingAddress(false);

                // Reload configuration to get updated data
                const configResponse = await restaurantConfigService.getRestaurantConfig();
                if (configResponse && configResponse.address) {
                    setAddress(configResponse.address);
                }
            } else {
                showNotification('error', 'Failed to update address');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            showNotification('error', 'Failed to update address: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleMapSubmit = async (e) => {
        e.preventDefault();

        // Validate map URL
        const mapErrors = validateMapIFrame(mapIFrame);

        if (Object.keys(mapErrors).length > 0) {
            setValidationErrors(mapErrors);
            return;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            // Check if map exists already, use post if not
            let response;
            try {
                const mapCheck = await restaurantConfigService.getMap();
                if (mapCheck) {
                    response = await restaurantConfigService.updateMap({ mapUrl: mapIFrame });
                } else {
                    response = await restaurantConfigService.addMap({ mapUrl: mapIFrame });
                }
            } catch (error) {
                // If error getting map, try to add it
                response = await restaurantConfigService.addMap({ mapUrl: mapIFrame });
            }

            if (response.status === 'success') {
                showNotification('success', 'Map updated successfully');
                setEditingMap(false);

                // Reload configuration to get updated data
                const configResponse = await restaurantConfigService.getRestaurantConfig();
                if (configResponse && configResponse.map) {
                    setMapIFrame(configResponse.map.mapUrl || '');
                }
            } else {
                showNotification('error', 'Failed to update map');
            }
        } catch (error) {
            console.error('Error updating map:', error);
            showNotification('error', 'Failed to update map: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureToggle = (feature) => {
        setFeatures({
            ...features,
            [feature]: !features[feature]
        });

        // Here you would also call an API to save the features state
        // For now just showing a notification
        showNotification('success', `${feature} has been ${!features[feature] ? 'enabled' : 'disabled'}`);
    };

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
                        {initialized && (
                            <button
                                type="button"
                                className="edit-button-config"
                                onClick={() => setEditingContact(!editingContact)}
                            >
                                {editingContact ? 'Cancel' : 'Edit'}
                            </button>
                        )}
                    </div>

                    {!initialized ? (
                        <div className="loading-placeholder">
                            <p>Loading contact information...</p>
                        </div>
                    ) : editingContact ? (
                        <form onSubmit={handleContactSubmit}>
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
                        {initialized && (
                            <button
                                type="button"
                                className="edit-button-config"
                                onClick={() => setEditingAddress(!editingAddress)}
                            >
                                {editingAddress ? 'Cancel' : 'Edit'}
                            </button>
                        )}
                    </div>

                    {editingAddress ? (
                        <form onSubmit={handleAddressSubmit}>
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
                                        value={address.eirczxode}
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
                        {initialized && (
                            <button
                                type="button"
                                className="edit-button-config"
                                onClick={() => setEditingMap(!editingMap)}
                            >
                                {editingMap ? 'Cancel' : 'Edit'}
                            </button>
                        )}
                    </div>

                    {editingMap ? (
                        <form onSubmit={handleMapSubmit}>
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
                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Online Reservations</h4>
                                <p>Allow customers to make table reservations online</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.onlineReservations}
                                    onChange={() => handleFeatureToggle('onlineReservations')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Online Ordering</h4>
                                <p>Enable customers to place orders for pickup or delivery</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.onlineOrdering}
                                    onChange={() => handleFeatureToggle('onlineOrdering')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Menu</h4>
                                <p>Allow customers to view menu</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.menuEnabled}
                                    onChange={() => handleFeatureToggle('menuEnabled')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Home Delivery</h4>
                                <p>Allow customers for choosing home delivery as delivery option</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.homeDelivery}
                                    onChange={() => handleFeatureToggle('homeDelivery')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Order Pickup</h4>
                                <p>Allow customers to choose in store pickup as delivery option</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.orderPickup}
                                    onChange={() => handleFeatureToggle('orderPickup')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="feature-item">
                            <div className="feature-info">
                                <h4>Online Payment</h4>
                                <p>Allow customers to choose online payment as an option</p>
                            </div>
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={features.onlinePayment}
                                    onChange={() => handleFeatureToggle('onlinePayment  ')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantConfig;