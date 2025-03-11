import React, { useState, useEffect } from 'react';
import './MenuManagement.css';
import MenuItemCard from './components/MenuItemCard';
import MenuItemDialog from './components/MenuItemDialog';
import menuService from '../../../services/menuItem.service';
import LoadingIndicator from '../Loading/LoadingIndicator';

const MenuManagement = ({
                            menuItems,
                            createMenuItem,
                            updateMenuItem,
                            deleteMenuItem,
                            showDialog,
                            editingItem,
                            setShowDialog,
                            startEditItem,
                            loading
                        }) => {
    const [menuOptions, setMenuOptions] = useState({ itemTypes: [], allergens: [] });
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(true);

    useEffect(() => {
        const fetchMenuOptions = async () => {
            setOptionsLoading(true);
            try {
                console.log('Fetching menu options...');
                const options = await menuService.getOptions();
                console.log('Menu options received:', options);
                setMenuOptions(options || { itemTypes: [], allergens: [] });
            } catch (error) {
                console.error('Failed to fetch menu options:', error);
                setMenuOptions({ itemTypes: [], allergens: [] });
            } finally {
                setOptionsLoading(false);
            }
        };

        fetchMenuOptions();
    }, []);

    // Filter menu items based on type and search term
    useEffect(() => {
        const filterItems = () => {
            if (!Array.isArray(menuItems)) {
                setFilteredItems([]);
                return;
            }

            let filtered = [...menuItems];

            // Filter by type
            if (filterType !== 'all') {
                filtered = filtered.filter(item => item.type === filterType);
            }

            // Filter by search term
            if (searchTerm.trim() !== '') {
                const searchLower = searchTerm.toLowerCase().trim();
                filtered = filtered.filter(item =>
                    item.name.toLowerCase().includes(searchLower) ||
                    (item.calories && item.calories.toString().includes(searchLower)) ||
                    (item.price && item.price.toString().includes(searchLower))
                );
            }

            setFilteredItems(filtered);
        };

        filterItems();
    }, [filterType, searchTerm, menuItems]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    console.log('MenuManagement render state:', {
        menuItemsCount: filteredItems.length,
        menuOptions,
        loading,
        optionsLoading,
        searchTerm
    });

    return (
        <div className="menu-management">
            <div className="menu-header">
                <div className="search-filter-container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                            disabled={optionsLoading || loading}
                        />
                        {searchTerm && (
                            <button
                                className="clear-search-button"
                                onClick={clearSearch}
                                aria-label="Clear search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    <div className="filter-container">
                        <label htmlFor="filterType">Filter by type:</label>
                        <select
                            id="filterType"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="filter-select"
                            disabled={optionsLoading || loading}
                        >
                            <option value="all">All Items</option>
                            {menuOptions && menuOptions.itemTypes && menuOptions.itemTypes.map(type => (
                                <option key={type.key} value={type.value}>
                                    {type.key.charAt(0) + type.key.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading || optionsLoading ? (
                <LoadingIndicator text="Loading menu items..." />
            ) : (
                <>
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            {searchTerm || filterType !== 'all' ?
                                <p>No menu items found matching your search and filters. Try adjusting your criteria.</p> :
                                <p>No menu items found. Add your first item to get started!</p>
                            }
                        </div>
                    ) : (
                        <>
                            <div className="results-count">
                                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                            </div>
                            <div className="menu-grid">
                                {filteredItems.map(item => (
                                    <MenuItemCard
                                        key={item.id}
                                        item={item}
                                        onEdit={() => startEditItem(item)}
                                        onDelete={() => deleteMenuItem(item.id)}
                                        allergens={menuOptions.allergens}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

            {showDialog && (
                <MenuItemDialog
                    item={editingItem}
                    menuOptions={menuOptions}
                    onClose={() => setShowDialog(false)}
                    onSave={editingItem ?
                        (data) => updateMenuItem(editingItem.id, data) :
                        createMenuItem
                    }
                />
            )}
        </div>
    );
};

export default MenuManagement;