import { useState, useEffect } from 'react';
import restaurantConfigService from '../../../services/restaurantConfig.service';

/**
 * Custom hook for restaurant configuration management
 *
 * @param {Function} setLoading - Loading state setter
 * @returns {Object} - Restaurant configuration state and management functions
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
        onlineReservations: true,
        onlineOrdering: true,
        menuEnabled: true,
        homeDelivery: true,
        orderPickup: true,
        onlinePayment: true
    });

    // State for editing modes
    const [editingContact, setEditingContact] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [editingMap, setEditingMap] = useState(false);

    // State for validation errors and notifications
    const [validationErrors, setValidationErrors] = useState({});
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    // Fetch restaurant configuration
    const fetchRestaurantConfig = async () => {
        setLoading(true);
        try {
            const configResponse = await restaurantConfigService.getRestaurantConfig();

            if (configResponse.data) {
                // Set phone number if available
                if (configResponse.data.phoneNumber) {
                    setPhoneNumber(configResponse.data.phoneNumber.phoneNumber || '');
                }

                // Set email if available
                if (configResponse.data.email) {
                    setEmail(configResponse.data.email.email || '');
                }

                // Set address if available
                if (configResponse.data.address) {
                    setAddress(configResponse.data.address);
                }

                // Set map iframe if available
                if (configResponse.data.map) {
                    setMapIFrame(configResponse.data.map.mapIFrame || '');
                }
            }

            // Fetch features (mock for now)
            // In a real implementation, you would call the API
            // const featuresResponse = await restaurantConfigService.getFeatures();
            // setFeatures(featuresResponse.data);
        } catch (error) {
            console.error('Error fetching restaurant configuration:', error);
            showNotification('error', 'Failed to load restaurant configuration');
        } finally {
            setLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchRestaurantConfig();
    }, []);

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

    const validateMapIFrame = (iframe) => {
        const errors = {};
        if (!iframe) {
            errors.mapIFrame = 'Map iframe is required';
        } else if (!/^<iframe.*<\/iframe>$/.test(iframe)) {
            errors.mapIFrame = 'Invalid iframe format';
        }
        return errors;
    };

    // Save contact information
    const saveContactInfo = async () => {
        // Validate inputs
        const phoneErrors = validatePhoneNumber(phoneNumber);
        const emailErrors = validateEmail(email);

        if (Object.keys(phoneErrors).length > 0 || Object.keys(emailErrors).length > 0) {
            setValidationErrors({ ...phoneErrors, ...emailErrors });
            return false;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            // Update phone number
            if (phoneNumber) {
                await restaurantConfigService.updatePhoneNumber({ phoneNumber });
            } else {
                await restaurantConfigService.deletePhoneNumber();
            }

            // Update email
            if (email) {
                await restaurantConfigService.updateEmail({ email });
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

    // Save address
    const saveAddress = async () => {
        // Validate address
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

    // Save map
    const saveMap = async () => {
        // Validate map iframe
        const mapErrors = validateMapIFrame(mapIFrame);

        if (Object.keys(mapErrors).length > 0) {
            setValidationErrors(mapErrors);
            return false;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            await restaurantConfigService.updateMap({ mapIFrame });
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

    // Toggle feature
    const toggleFeature = async (feature) => {
        const newFeatures = {
            ...features,
            [feature]: !features[feature]
        };

        setFeatures(newFeatures);

        try {
            // This would be implemented in a real application
            // await restaurantConfigService.toggleFeature(feature, newFeatures[feature]);
            showNotification('success', `${feature} has been ${newFeatures[feature] ? 'enabled' : 'disabled'}`);
            return true;
        } catch (error) {
            // Revert on error
            setFeatures(features);
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