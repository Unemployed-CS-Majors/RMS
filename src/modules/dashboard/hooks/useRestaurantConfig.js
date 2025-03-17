import {useEffect, useState} from 'react';
import restaurantConfigService from '../../../services/restaurantConfig.service';

/**
 * Custom hook for managing restaurant configuration
 *
 * @param {Function} setLoading - Setter for loading state
 * @returns {Object} Restaurant configuration state and functions
 */
export const useRestaurantConfig = (setLoading) => {
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
    const [features, setFeatures] = useState({
        online_reservations: true,
        online_ordering: true,
        menu: true,
        home_delivery: true,
        order_pickup: true,
        online_payment: true,
        cash_payment: true,
        in_store_payment: true
    });

    // State for editing modes
    const [editingContact, setEditingContact] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [editingMap, setEditingMap] = useState(false);

    // State for validation errors and notifications
    const [validationErrors, setValidationErrors] = useState({});
    const [notification, setNotification] = useState({show: false, type: '', message: ''});

    /**
     * Fetch restaurant configuration from the server
     */
    const fetchRestaurantConfig = async () => {
        try {
            const configResponse = await restaurantConfigService.getRestaurantConfig();
            if (configResponse) {
                if (configResponse.phoneNumber) {
                    setPhoneNumber(configResponse.phoneNumber.phoneNumber || '');
                }
                if (configResponse.email) {
                    setEmail(configResponse.email.email || '');
                }
                if (configResponse.address) {
                    setAddress(configResponse.address);
                }
                if (configResponse.map) {
                    setMapIFrame(configResponse.map.mapUrl || '');
                }
                if (configResponse.features) {
                    const featuresObj = {};
                    configResponse.features.forEach(feature => {
                        featuresObj[feature.name] = feature.enabled;
                    });
                    setFeatures(featuresObj);
                }
                if (!configResponse.phoneNumber && !configResponse.email) {
                    setEditingContact(true);
                }
                if (!configResponse.address) {
                    setEditingAddress(true);
                }
                if (!configResponse.map) {
                    setEditingMap(true);
                }
            }
        } catch (error) {
            console.error('Error fetching restaurant configuration:', error);
            showNotification('error', 'Failed to load restaurant configuration');
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchRestaurantConfig();
    }, []);

    /**
     * Show a notification
     *
     * @param {string} type - The type of notification (e.g., 'success', 'error')
     * @param {string} message - The notification message
     */
    const showNotification = (type, message) => {
        setNotification({show: true, type, message});
        setTimeout(() => {
            setNotification({show: false, type: '', message: ''});
        }, 5000);
    };

    /**
     * Validate phone number
     *
     * @param {string} phone - The phone number to validate
     * @returns {Object} Validation errors
     */
    const validatePhoneNumber = (phone) => {
        const errors = {};
        if (!phone) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^[\d\s\+\-\(\)]{10,20}$/.test(phone)) {
            errors.phoneNumber = 'Invalid phone number format';
        }
        return errors;
    };

    /**
     * Validate email
     *
     * @param {string} emailValue - The email to validate
     * @returns {Object} Validation errors
     */
    const validateEmail = (emailValue) => {
        const errors = {};
        if (!emailValue) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            errors.email = 'Invalid email format';
        }
        return errors;
    };

    /**
     * Validate address
     *
     * @param {Object} addressData - The address to validate
     * @returns {Object} Validation errors
     */
    const validateAddress = (addressData) => {
        const errors = {};
        if (!addressData.street) errors.street = 'Street is required';
        if (!addressData.city) errors.city = 'City is required';
        if (!addressData.county) errors.county = 'County is required';
        if (!addressData.eircode) errors.eircode = 'Eircode is required';
        if (!addressData.country) errors.country = 'Country is required';
        return errors;
    };

    /**
     * Validate map iframe
     *
     * @param {string} iframe - The iframe to validate
     * @returns {Object} Validation errors
     */
    const validateMapIFrame = (iframe) => {
        const errors = {};
        if (!iframe) {
            errors.mapIFrame = 'Map iframe is required';
        } else if (!/^<iframe.*<\/iframe>$/.test(iframe)) {
            errors.mapIFrame = 'Invalid iframe format';
        }
        return errors;
    };

    /**
     * Save contact information
     * @returns {boolean} Success status
     */
    const saveContactInfo = async () => {
        const phoneErrors = validatePhoneNumber(phoneNumber);
        const emailErrors = validateEmail(email);

        if (Object.keys(phoneErrors).length > 0 || Object.keys(emailErrors).length > 0) {
            setValidationErrors({...phoneErrors, ...emailErrors});
            return false;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            if (phoneNumber) {
                await restaurantConfigService.updatePhoneNumber({phoneNumber});
            } else {
                await restaurantConfigService.deletePhoneNumber();
            }

            if (email) {
                await restaurantConfigService.updateEmail({email});
            } else {
                await restaurantConfigService.deleteEmail();
            }

            showNotification('success', 'Contact information updated successfully');
            setEditingContact(false);
            return true;
        } catch (error) {
            console.error('Error updating contact information:', error);
            showNotification('error', 'Failed to update contact information');
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Save address
     * @returns {boolean} Success status
     */
    const saveAddress = async () => {
        const addressErrors = validateAddress(address);

        if (Object.keys(addressErrors).length > 0) {
            setValidationErrors(addressErrors);
            return false;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            await restaurantConfigService.updateAddress(address);
            showNotification('success', 'Address updated successfully');
            setEditingAddress(false);
            return true;
        } catch (error) {
            console.error('Error updating address:', error);
            showNotification('error', 'Failed to update address');
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Save map
     * @returns {boolean} Success status
     */
    const saveMap = async () => {
        const mapErrors = validateMapIFrame(mapIFrame);

        if (Object.keys(mapErrors).length > 0) {
            setValidationErrors(mapErrors);
            return false;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            await restaurantConfigService.updateMap({mapIFrame});
            showNotification('success', 'Map updated successfully');
            setEditingMap(false);
            return true;
        } catch (error) {
            console.error('Error updating map:', error);
            showNotification('error', 'Failed to update map');
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Toggle feature
     *
     * @param {string} feature - The feature to toggle
     * @returns {boolean} Success status
     */
    const toggleFeature = async (feature) => {
        const newFeatures = {
            ...features,
            [feature]: !features[feature]
        };

        setFeatures(newFeatures);

        try {
            await restaurantConfigService.updateFeature({
                name: feature,
                enabled: newFeatures[feature]
            });

            showNotification('success', `${feature} has been ${newFeatures[feature] ? 'enabled' : 'disabled'}`);
            return true;
        } catch (error) {
            setFeatures(features);
            console.error('Error updating feature:', error);
            showNotification('error', `Failed to update ${feature}`);
            return false;
        }
    };

    return {
        // State
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

        // Setters
        setPhoneNumber,
        setEmail,
        setAddress,
        setMapIFrame,
        setEditingContact,
        setEditingAddress,
        setEditingMap,

        // Actions
        saveContactInfo,
        saveAddress,
        saveMap,
        toggleFeature,
        showNotification,

        // Fetch functions
        fetchRestaurantConfig
    };
};