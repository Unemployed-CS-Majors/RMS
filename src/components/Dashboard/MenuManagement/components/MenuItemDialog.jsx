import React, { useState, useEffect } from 'react';

/**
 * MenuItemDialog component
 *
 * Dialog for creating or editing a menu item
 *
 * @param {Object} item - Menu item to edit (null for new item)
 * @param {Object} menuOptions - Object containing itemTypes and allergens arrays
 * @param {Function} onClose - Function to close the dialog
 * @param {Function} onSave - Function to save the item
 */
const MenuItemDialog = ({ item, menuOptions, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        type: '',
        calories: '',
        avgWaitTime: '',
        allergens: [],
        imageFile: null,
        imagePreview: null
    });
    const [errors, setErrors] = useState({});

    // Initialize form when editing an existing item
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                description: item.description || '',
                price: item.price ? item.price.toString() : '',
                type: item.type || '',
                calories: item.calories ? item.calories.toString() : '',
                avgWaitTime: item.avgWaitTime ? item.avgWaitTime.toString() : '',
                allergens: item.allergens || [],
                imageFile: null,
                imagePreview: item.imageUrl || null
            });
        }
    }, [item]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Handle allergen checkbox changes
    const handleAllergenChange = (allergenValue) => {
        const updatedAllergens = [...formData.allergens];

        if (updatedAllergens.includes(allergenValue)) {
            // Remove allergen if already selected
            const index = updatedAllergens.indexOf(allergenValue);
            updatedAllergens.splice(index, 1);
        } else {
            // Add allergen
            updatedAllergens.push(allergenValue);
        }

        setFormData({
            ...formData,
            allergens: updatedAllergens
        });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file is an image
        if (!file.type.startsWith('image/')) {
            setErrors({
                ...errors,
                imageFile: 'File must be an image'
            });
            return;
        }

        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);

        setFormData({
            ...formData,
            imageFile: file,
            imagePreview: previewUrl
        });

        // Clear error for this field
        if (errors.imageFile) {
            setErrors({
                ...errors,
                imageFile: null
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }

        if (!formData.type) newErrors.type = 'Type is required';

        if (formData.calories && (isNaN(parseInt(formData.calories)) || parseInt(formData.calories) < 0)) {
            newErrors.calories = 'Calories must be a non-negative number';
        }

        if (formData.avgWaitTime && (isNaN(parseInt(formData.avgWaitTime)) || parseInt(formData.avgWaitTime) < 0)) {
            newErrors.avgWaitTime = 'Average wait time must be a non-negative number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Prepare data for submission
        const submitData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            type: formData.type,
            allergens: formData.allergens,
            imageFile: formData.imageFile
        };

        // Add optional fields only if they have values
        if (formData.calories) submitData.calories = parseInt(formData.calories);
        if (formData.avgWaitTime) submitData.avgWaitTime = parseInt(formData.avgWaitTime);

        onSave(submitData);
    };

    return (
        <div className="menu-item-dialog-overlay">
            <div className="menu-item-dialog">
                <div className="dialog-header">
                    <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="menu-item-form">
                    <div className="form-columns">
                        <div className="form-left-column">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'input-error' : ''}
                                    required
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={errors.description ? 'input-error' : ''}
                                    required
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price (€) *</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    className={errors.price ? 'input-error' : ''}
                                    required
                                />
                                {errors.price && <div className="error-message">{errors.price}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Type *</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={errors.type ? 'input-error' : ''}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    {menuOptions && menuOptions.itemTypes && menuOptions.itemTypes.map(type => (
                                        <option key={type.key} value={type.value}>
                                            {type.key.charAt(0) + type.key.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && <div className="error-message">{errors.type}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="calories">Calories (optional)</label>
                                <input
                                    type="number"
                                    id="calories"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    min="0"
                                    className={errors.calories ? 'input-error' : ''}
                                />
                                {errors.calories && <div className="error-message">{errors.calories}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="avgWaitTime">Average Wait Time (min) (optional)</label>
                                <input
                                    type="number"
                                    id="avgWaitTime"
                                    name="avgWaitTime"
                                    value={formData.avgWaitTime}
                                    onChange={handleChange}
                                    min="0"
                                    className={errors.avgWaitTime ? 'input-error' : ''}
                                />
                                {errors.avgWaitTime && <div className="error-message">{errors.avgWaitTime}</div>}
                            </div>
                        </div>

                        <div className="form-right-column">
                            <div className="form-group">
                                <label>Image (optional)</label>
                                <div className="image-upload-container">
                                    {formData.imagePreview ? (
                                        <div className="image-preview-container">
                                            <img
                                                src={formData.imagePreview}
                                                alt="Preview"
                                                className="image-preview"
                                            />
                                            <button
                                                type="button"
                                                className="remove-image-button"
                                                onClick={() => setFormData({
                                                    ...formData,
                                                    imageFile: null,
                                                    imagePreview: null
                                                })}
                                                aria-label="Remove image"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <input
                                                type="file"
                                                id="imageFile"
                                                name="imageFile"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className={errors.imageFile ? 'input-error' : ''}
                                            />
                                            <div className="upload-instructions">
                                                Click to upload or drag and drop<br />
                                                (JPG, PNG, GIF)
                                            </div>
                                        </div>
                                    )}
                                    {errors.imageFile && <div className="error-message">{errors.imageFile}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Allergens (optional)</label>
                                <div className="allergens-checkboxes">
                                    {menuOptions && menuOptions.allergens && menuOptions.allergens.map(allergen => (
                                        <div key={allergen.key} className="allergen-checkbox">
                                            <input
                                                type="checkbox"
                                                id={`allergen-${allergen.value}`}
                                                checked={formData.allergens.includes(allergen.value)}
                                                onChange={() => handleAllergenChange(allergen.value)}
                                            />
                                            <label htmlFor={`allergen-${allergen.value}`}>
                                                {allergen.key.charAt(0) + allergen.key.slice(1).toLowerCase()}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            {item ? 'Save Changes' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuItemDialog;