import {useState} from 'react';
import menuService from '../../../services/menuItem.service';

/**
 * Custom hook for managing menu items
 *
 * @param {Array} menuItems - Current menu items
 * @param {Function} setMenuItems - Setter for menu items
 * @returns {Object} Menu management functions and state
 */
export const useMenuManagement = (menuItems, setMenuItems) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Toggle add menu item dialog
     */
    const toggleAddMenuItemDialog = () => {
        setShowAddDialog(!showAddDialog);
        if (editingItem) setEditingItem(null);
    };

    /**
     * Set item for editing
     * @param {Object} item - Menu item to edit
     */
    const startEditItem = (item) => {
        setEditingItem(item);
        setShowAddDialog(true);
    };

    /**
     * Create a new menu item
     * @param {Object} itemData - Form data including the image file
     */
    const createMenuItem = async (itemData) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Add all text fields
            Object.keys(itemData).forEach(key => {
                if (key === 'imageFile' && itemData[key]) {
                    formData.append('image', itemData[key]);
                } else if (key === 'allergens' && Array.isArray(itemData[key])) {
                    formData.append('allergens', JSON.stringify(itemData[key]));
                } else if (itemData[key] !== null && itemData[key] !== undefined) {
                    formData.append(key, itemData[key]);
                }
            });

            const newItem = await menuService.create(formData);
            setMenuItems([...menuItems, newItem]);
            toggleAddMenuItemDialog();
        } catch (error) {
            console.error('Failed to create menu item:', error);
            // Implement error handling logic here
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update an existing menu item
     * @param {string} id - Item ID
     * @param {Object} itemData - Updated item data including optional image file
     */
    const updateMenuItem = async (id, itemData) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Add all text fields
            Object.keys(itemData).forEach(key => {
                if (key === 'imageFile' && itemData[key]) {
                    formData.append('image', itemData[key]);
                } else if (key === 'allergens' && Array.isArray(itemData[key])) {
                    formData.append('allergens', JSON.stringify(itemData[key]));
                } else if (itemData[key] !== null && itemData[key] !== undefined) {
                    formData.append(key, itemData[key]);
                }
            });

            const updatedItem = await menuService.update(id, formData);
            setMenuItems(menuItems.map(item =>
                item.id === id ? updatedItem : item
            ));
            toggleAddMenuItemDialog();
            setEditingItem(null);
        } catch (error) {
            console.error('Failed to update menu item:', error);
            // Implement error handling logic here
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete a menu item
     * @param {string} id - Item ID to delete
     */
    const deleteMenuItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this menu item?')) {
            return;
        }

        setLoading(true);
        try {
            await menuService.delete(id);
            setMenuItems(menuItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete menu item:', error);
            // Implement error handling logic here
        } finally {
            setLoading(false);
        }
    };

    return {
        showAddDialog,
        editingItem,
        loading,
        toggleAddMenuItemDialog,
        startEditItem,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem
    };
};
