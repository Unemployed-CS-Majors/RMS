import React, { useState, useEffect } from 'react';
import styles from './MenuManagement.module.css';
import MenuItemCard from './components/MenuItemCard/MenuItemCard';
import MenuItemDialog from './components/MenuItemDialog/MenuItemDialog';
import menuService from '../../../../services/menuItem.service';
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
        <div className={styles.menuManagement}>
            <div className={styles.menuHeader}>
                <div className={styles.searchFilterContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.searchInput}
                            disabled={optionsLoading || loading}
                        />
                        {searchTerm && (
                            <button
                                className={styles.clearSearchButton}
                                onClick={clearSearch}
                                aria-label="Clear search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    <div className={styles.filterContainer}>
                        <label htmlFor="filterType">Filter by type:</label>
                        <select
                            id="filterType"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={styles.filterSelect}
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
                        <div className={styles.emptyState}>
                            {searchTerm || filterType !== 'all' ?
                                <p>No menu items found matching your search and filters. Try adjusting your criteria.</p> :
                                <p>No menu items found. Add your first item to get started!</p>
                            }
                        </div>
                    ) : (
                        <>
                            <div className={styles.resultsCount}>
                                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                            </div>
                            <div className={styles.menuGrid}>
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