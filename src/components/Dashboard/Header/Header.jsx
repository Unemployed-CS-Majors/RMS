import React from 'react';
import styles from './Header.module.css';

const Header = ({
                    activeTab,
                    editingHours,
                    toggleHoursEditMode,
                    approveAllReservations,
                    tablesEditMode,
                    toggleTablesEditMode,
                    toggleAddEmployee,
                    toggleShowFilters,
                    toggleAddMenuItem,
                }) => {
    // Function to get the appropriate icon based on active tab
    const getHeaderIcon = () => {
        switch(activeTab) {
            case 'pendingReservations':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'dashboard':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'hours':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'tables':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                );
            case 'employees':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'allReservations':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            case 'orders':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                );
            case 'restaurantConfig':
                return (
                    <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    // Get title based on active tab
    const getHeaderTitle = () => {
        switch(activeTab) {
            case 'dashboard':
                return 'Analytics Dashboard';
            case 'pendingReservations':
                return 'Reservations Requiring Approval';
            case 'hours':
                return 'Restaurant Opening Hours';
            case 'tables':
                return 'Tables Management';
            case 'employees':
                return 'Employee Management';
            case 'allReservations':
                return 'All Reservations';
            case 'menu':
                return 'Menu Management';
            case 'orders':
                return 'Order Management';
            case 'restaurantConfig':
                return 'Restaurant Configuration';
            default:
                return 'Analytics Dashboard';
        }
    };

    return (
        <header className={styles.appHeader}>
            <div className={styles.headerTitleWithIcon}>
                {getHeaderIcon()}
                <h2 className={styles.headerTitle}>
                    {getHeaderTitle()}
                </h2>
            </div>

            {activeTab === 'hours' && (
                <div className={styles.headerControls}>
                    <span className={styles.modeLabel}>{editingHours ? 'Editing Mode' : 'View Mode'}</span>
                    <label className={styles.toggleContainer}>
                        <input
                            type="checkbox"
                            className={styles.toggleInput}
                            checked={editingHours}
                            onChange={toggleHoursEditMode}
                        />
                        <span className={styles.toggleSlider}></span>
                    </label>
                </div>
            )}

            {activeTab === 'pendingReservations' && (
                <div className={styles.headerControls}>
                    <button className={`${styles.headerButton} ${styles.primaryButton}`} onClick={approveAllReservations}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Approve All
                    </button>
                </div>
            )}

            {activeTab === 'tables' && (
                <div className={styles.headerControls}>
                    <span className={styles.modeLabel}>{tablesEditMode ? 'Editing Mode' : 'View Mode'}</span>
                    <label className={styles.toggleContainer}>
                        <input
                            type="checkbox"
                            className={styles.toggleInput}
                            checked={tablesEditMode}
                            onChange={toggleTablesEditMode}
                        />
                        <span className={styles.toggleSlider}></span>
                    </label>
                </div>
            )}

            {activeTab === 'employees' && (
                <div className={styles.headerControls}>
                    <button className={`${styles.headerButton} ${styles.primaryButton}`} onClick={toggleAddEmployee}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Employee
                    </button>
                </div>
            )}

            {activeTab === 'allReservations' && (
                <div className={styles.headerControls}>
                    <button className={`${styles.headerButton} ${styles.secondaryButton}`} onClick={toggleShowFilters}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                    <button className={`${styles.headerButton} ${styles.primaryButton}`}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Reservation
                    </button>
                </div>
            )}

            {activeTab === 'menu' && (
                <div className={styles.headerControls}>
                    <button className={`${styles.headerButton} ${styles.primaryButton}`} onClick={toggleAddMenuItem}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Add Item
                    </button>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className={styles.headerControls}>
                    <button className={`${styles.headerButton} ${styles.secondaryButton}`} onClick={toggleShowFilters}>
                        <svg className={styles.headerButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;