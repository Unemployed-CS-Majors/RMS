import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Dashboard.module.css';

// Components
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import PendingReservations from '../sections/PendingReservations/PendingReservations';
import OpeningHours from '../sections/OpeningHours/OpeningHours';
import EmployeeManagement from '../sections/EmployeeManagement/EmployeeManagement';
import AllReservations from '../sections/AllReservations/AllReservations';
import FloorPlanDesigner from '../sections/FloorPlanDesigner/FloorPlanDesigner';
import MenuManagement from '../sections/MenuManagement/MenuManagement';
import RestaurantConfig from '../sections/RestaurantConfig/RestaurantConfig';
import LoadingIndicator from '../sections/Loading/LoadingIndicator';
import { useActiveTab } from '../hooks/useActiveTab';
import { useReservationManagement } from '../hooks/useReservationManagement';
import { useHoursManagement } from '../hooks/useHoursManagement';
import { useEmployeeManagement } from '../hooks/useEmployeeManagement';
import { useTablesManagement } from '../hooks/useTablesManagement';
import { useMenuManagement } from '../hooks/useMenuManagement';
import { useWebSocket } from '../hooks/useWebSocket';
import { useUIState } from '../hooks/useUIState';
import OrderManagement from "../sections/Orders/OrderManagement";
import AnalyticsDashboard from "../sections/AnalyticsDashboard/AnalyticsDashboard";

/**
 * RestaurantDashboard component
 *
 * This component serves as the main dashboard for managing various aspects of the restaurant.
 * It includes sections for reservations, opening hours, employee management, menu management, and more.
 */
const RestaurantDashboard = () => {
    const { tab } = useParams();
    const location = useLocation();

    // State for data
    const [allReservations, setAllReservations] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);

    // UI state management
    const {
        reservationFilterMode,
        sidebarCollapsed,
        loading,
        setLoading,
        toggleReservationFilterMode,
        handleSidebarToggle
    } = useUIState();

    // Tab management
    const [activeTab, setActiveTab] = useActiveTab(
        tab || 'dashboard',
        setAllReservations,
        setOpeningHours,
        setPendingReservations,
        setTables,
        setEmployees,
        setMenuItems,
        setOrders,
        setLoading
    );

    // Reservation management
    const {
        handleApproveReservation,
        approveAllReservations,
        handleRejectReservation
    } = useReservationManagement(
        pendingReservations,
        setPendingReservations,
        setAllReservations,
        setLoading
    );

    // Hours management
    const {
        editingHours,
        handleHoursChange,
        handleToggleDay,
        toggleHoursEditMode,
        saveHours
    } = useHoursManagement(
        openingHours,
        setOpeningHours,
        setLoading
    );

    // Tables management
    const {
        tablesEditMode,
        getTableName,
        toggleTablesEditMode
    } = useTablesManagement(tables);

    // Employee management
    const {
        addEmployee,
        handleRemoveEmployee,
        createNewEmployee,
        updateEmployeeRole,
        toggleAddEmployee,
        setAddEmployee
    } = useEmployeeManagement(employees, setEmployees);

    // Menu management
    const {
        showAddDialog: showAddMenuItem,
        editingItem,
        toggleAddMenuItemDialog,
        startEditItem,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem
    } = useMenuManagement(menuItems, setMenuItems);

    // WebSocket connection
    useWebSocket(
        'wss://rms.bushive.app',
        activeTab,
        pendingReservations,
        setPendingReservations
    );

    // Set default route on initial load if no tab is specified
    useEffect(() => {
        if (!tab && location.pathname === '/dashboard') {
            setActiveTab('pendingReservations');
        }
    }, [location, tab, setActiveTab]);

    return (
        <div className={`${styles.flex} ${styles.hScreen} ${styles.bgGray100}`}>
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingReservations={pendingReservations}
                onToggle={handleSidebarToggle}
            />
            <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
                <Header
                    activeTab={activeTab}
                    editingHours={editingHours}
                    toggleHoursEditMode={toggleHoursEditMode}
                    tablesEditMode={tablesEditMode}
                    toggleTablesEditMode={toggleTablesEditMode}
                    approveAllReservations={approveAllReservations}
                    toggleAddEmployee={toggleAddEmployee}
                    toggleAddMenuItem={toggleAddMenuItemDialog}
                    toggleShowFilters={toggleReservationFilterMode}
                />
                <main className={`${styles.dashboardContent} ${styles.overflowYAuto} ${styles.p6}`}>
                    {loading ? (
                        <LoadingIndicator text={`Loading ${activeTab.replace(/([A-Z])/g, ' $1').trim()}...`}/>
                    ) : (
                        <>
                            {activeTab === 'dashboard' && (
                                <AnalyticsDashboard
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            )}
                            {activeTab === 'pendingReservations' && (
                                <PendingReservations
                                    pendingReservations={pendingReservations}
                                    handleApproveReservation={handleApproveReservation}
                                    handleRejectReservation={handleRejectReservation}
                                    getTableName={getTableName}
                                />
                            )}
                            {activeTab === 'hours' && (
                                <OpeningHours
                                    openingHours={openingHours}
                                    editingHours={editingHours}
                                    handleHoursChange={handleHoursChange}
                                    handleToggleDay={handleToggleDay}
                                    saveHours={saveHours}
                                />
                            )}
                            {activeTab === 'tables' && (
                                <FloorPlanDesigner editMode={tablesEditMode}/>
                            )}
                            {activeTab === 'employees' && (
                                <EmployeeManagement
                                    employees={employees}
                                    handleRemoveEmployee={handleRemoveEmployee}
                                    createNewEmployee={createNewEmployee}
                                    updateEmployeeRole={updateEmployeeRole}
                                    showDialog={addEmployee}
                                    setShowDialog={setAddEmployee}
                                />
                            )}
                            {activeTab === 'allReservations' && (
                                <AllReservations
                                    allReservations={allReservations}
                                    getTableName={getTableName}
                                    setFiltersVisible={toggleReservationFilterMode}
                                    filtersVisible={reservationFilterMode}
                                />
                            )}
                            {activeTab === 'menu' && (
                                <MenuManagement
                                    menuItems={menuItems}
                                    createMenuItem={createMenuItem}
                                    updateMenuItem={updateMenuItem}
                                    deleteMenuItem={deleteMenuItem}
                                    showDialog={showAddMenuItem}
                                    editingItem={editingItem}
                                    setShowDialog={toggleAddMenuItemDialog}
                                    startEditItem={startEditItem}
                                    loading={loading}
                                />
                            )}
                            {activeTab === 'orders' && (
                                <OrderManagement
                                    orders={orders}
                                    loading={loading}
                                    toggleShowFilters={toggleReservationFilterMode}
                                    showFilters={reservationFilterMode}
                                />
                            )}
                            {activeTab === 'restaurantConfig' && (
                                <RestaurantConfig
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RestaurantDashboard;