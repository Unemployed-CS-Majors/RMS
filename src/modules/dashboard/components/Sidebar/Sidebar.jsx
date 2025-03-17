import React, {useEffect, useState} from 'react';
import cookieManager from "../../../shared/utils/cookieManager";
import cookieKeys from "../../../../constants/cookieKeys";
import styles from "./Sidebar.module.css";

/**
 * Sidebar component for the dashboard, providing navigation and management options.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.activeTab - The currently active tab.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @param {Array} props.pendingReservations - List of pending reservations.
 * @param {Function} props.onToggle - Function to notify parent component when sidebar state changes.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({activeTab, setActiveTab, pendingReservations, onToggle}) => {
    const [collapsed, setCollapsed] = useState(false);

    // State for section collapse
    const [collapsedSections, setCollapsedSections] = useState({
        navigation: false,
        analytics: false,  // Added new section for analytics
        reservations: false,
        orders: false,
        management: false,
        administration: false
    });

    // Check screen size on mount and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Notify parent component when sidebar state changes
    useEffect(() => {
        if (onToggle) {
            onToggle(collapsed);
        }
    }, [collapsed, onToggle]);

    /**
     * Toggles the sidebar collapsed state.
     */
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    /**
     * Toggles the collapse state of a section.
     *
     * @param {string} section - The section to toggle.
     */
    const toggleSection = (section) => {
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const isOwner = cookieManager.get(cookieKeys.USER) === 'owner';

    return (
        <>
            <button
                className={styles.sidebarToggle}
                onClick={toggleSidebar}
            >
                {collapsed ? '☰' : '✕'}
            </button>

            <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    {
                        !collapsed && (
                            <h1 className={styles.sidebarTitle}>
                                {collapsed ? '' : 'Dashboard'}
                            </h1>
                        )
                    }

                    <button
                        className={styles.sidebarCollapseBtn}
                        onClick={toggleSidebar}
                    >
                        {collapsed ? '→' : '←'}
                    </button>
                </div>
                <nav className={styles.sidebarNav}>
                    <div className={styles.navSection}>
                        {!collapsed && (
                            <div
                                className={`${styles.sectionHeader} ${collapsedSections.navigation ? styles.sectionHeaderCollapsed : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('navigation');
                                }}
                            >
                                <div className={styles.sectionLabel}>Navigation</div>
                                <div className={styles.sectionToggle}>
                                    {collapsedSections.navigation ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.navigation || collapsed) && (
                            <div className={styles.sectionContent}>
                                <button
                                    className={`${styles.navButton} ${styles.externalLinkButton}`}
                                    onClick={() => {
                                        // Show confirmation dialog before navigating away
                                        if (window.confirm("Leave dashboard and go to customer website?")) {
                                            window.location.href = '/';
                                        }
                                    }}
                                    title="Customer Website"
                                >
                                    <span className={styles.navIcon}>🌐</span>
                                    {!collapsed && (
                                        <>
                                            <span className={styles.navText}>Customer Site</span>
                                            <span className={styles.externalLinkIcon}>↗</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {isOwner && (
                        <div className={styles.navSection}>
                            {!collapsed && (
                                <div
                                    className={`${styles.sectionHeader} ${collapsedSections.analytics ? styles.sectionHeaderCollapsed : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSection('analytics');
                                    }}
                                >
                                    <div className={styles.sectionLabel}>Analytics</div>
                                    <div className={styles.sectionToggle}>
                                        {collapsedSections.analytics ? '►' : '▼'}
                                    </div>
                                </div>
                            )}
                            {(!collapsedSections.analytics || collapsed) && (
                                <div className={styles.sectionContent}>
                                    <button
                                        className={`${styles.navButton} ${styles.dashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('dashboard')}
                                        title="Dashboard Overview"
                                    >
                                        <span className={styles.navIcon}>📊</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Analytics Dashboard</span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                    }

                    <div className={styles.navSection}>
                        {!collapsed && (
                            <div
                                className={`${styles.sectionHeader} ${collapsedSections.reservations ? styles.sectionHeaderCollapsed : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('reservations');
                                }}
                            >
                                <div className={styles.sectionLabel}>Reservations</div>
                                <div className={styles.sectionToggle}>
                                    {collapsedSections.reservations ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.reservations || collapsed) && (
                            <div className={styles.sectionContent}>
                                <button
                                    className={`${styles.navButton} ${activeTab === 'pendingReservations' ? styles.active : ''}`}
                                    onClick={() => setActiveTab('pendingReservations')}
                                    title="Pending Reservations"
                                >
                                    <span className={styles.navIcon}>📋</span>
                                    {!collapsed && (
                                        <span className={styles.navText}>Pending Reservations</span>
                                    )}
                                    {pendingReservations.length > 0 && (
                                        <span className={styles.notificationBadge}>
                                            {pendingReservations.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    className={`${styles.navButton} ${activeTab === 'allReservations' ? styles.active : ''}`}
                                    onClick={() => setActiveTab('allReservations')}
                                    title="All Reservations"
                                >
                                    <span className={styles.navIcon}>📅</span>
                                    {!collapsed && (
                                        <span className={styles.navText}>All Reservations</span>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Orders Section */}
                    <div className={styles.navSection}>
                        {!collapsed && (
                            <div
                                className={`${styles.sectionHeader} ${collapsedSections.orders ? styles.sectionHeaderCollapsed : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('orders');
                                }}
                            >
                                <div className={styles.sectionLabel}>Orders</div>
                                <div className={styles.sectionToggle}>
                                    {collapsedSections.orders ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.orders || collapsed) && (
                            <div className={styles.sectionContent}>
                                <button
                                    className={`${styles.navButton} ${activeTab === 'orders' ? styles.active : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                    title="Orders"
                                >
                                    <span className={styles.navIcon}>🛒</span>
                                    {!collapsed && (
                                        <span className={styles.navText}>Order Management</span>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {isOwner && (
                        <div className={styles.navSection}>
                            {!collapsed && (
                                <div
                                    className={`${styles.sectionHeader} ${collapsedSections.management ? styles.sectionHeaderCollapsed : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSection('management');
                                    }}
                                >
                                    <div className={styles.sectionLabel}>Restaurant Management</div>
                                    <div className={styles.sectionToggle}>
                                        {collapsedSections.management ? '►' : '▼'}
                                    </div>
                                </div>
                            )}
                            {(!collapsedSections.management || collapsed) && (
                                <div className={styles.sectionContent}>
                                    <button
                                        className={`${styles.navButton} ${activeTab === 'tables' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('tables')}
                                        title="Tables Management"
                                    >
                                        <span className={styles.navIcon}>🪑</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Tables</span>
                                        )}
                                    </button>

                                    <button
                                        className={`${styles.navButton} ${activeTab === 'menu' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('menu')}
                                        title="Menu Management"
                                    >
                                        <span className={styles.navIcon}>🍽️</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Menu</span>
                                        )}
                                    </button>

                                    <button
                                        className={`${styles.navButton} ${activeTab === 'hours' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('hours')}
                                        title="Opening Hours"
                                    >
                                        <span className={styles.navIcon}>🕒</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Opening Hours</span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isOwner && (
                        <div className={styles.navSection}>
                            {!collapsed && (
                                <div
                                    className={`${styles.sectionHeader} ${collapsedSections.administration ? styles.sectionHeaderCollapsed : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSection('administration');
                                    }}
                                >
                                    <div className={styles.sectionLabel}>Administration</div>
                                    <div className={styles.sectionToggle}>
                                        {collapsedSections.administration ? '►' : '▼'}
                                    </div>
                                </div>
                            )}
                            {(!collapsedSections.administration || collapsed) && (
                                <div className={styles.sectionContent}>
                                    <button
                                        className={`${styles.navButton} ${activeTab === 'employees' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('employees')}
                                        title="Employees"
                                    >
                                        <span className={styles.navIcon}>👥</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Employees</span>
                                        )}
                                    </button>

                                    <button
                                        className={`${styles.navButton} ${activeTab === 'restaurantConfig' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('restaurantConfig')}
                                        title="Restaurant Configuration"
                                    >
                                        <span className={styles.navIcon}>⚙️</span>
                                        {!collapsed && (
                                            <span className={styles.navText}>Settings</span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>

            {!collapsed && window.innerWidth <= 768 && (
                <div className={styles.sidebarOverlay} onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;