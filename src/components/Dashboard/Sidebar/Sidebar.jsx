import React, { useState, useEffect } from 'react';
import cookieManager from "../../../utils/cookieManager";
import cookieKeys from "../../../constants/cookieKeys";
import "./Sidebar.css";

const Sidebar = ({activeTab, setActiveTab, pendingReservations, onToggle}) => {
    const [collapsed, setCollapsed] = useState(false);

    // State for section collapse
    const [collapsedSections, setCollapsedSections] = useState({
        navigation: false,
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

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

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
                className="sidebar-toggle"
                onClick={toggleSidebar}
            >
                {collapsed ? '☰' : '✕'}
            </button>

            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    {
                        !collapsed && (
                            <h1 className="sidebar-title">
                                {collapsed ? '' : 'Dashboard'}
                            </h1>
                        )
                    }

                    <button
                        className="sidebar-collapse-btn"
                        onClick={toggleSidebar}
                    >
                        {collapsed ? '→' : '←'}
                    </button>
                </div>
                <nav className="sidebar-nav custom-scrollbar">
                    {/* General Navigation */}
                    <div className="nav-section">
                        {!collapsed && (
                            <div
                                className={`section-header ${collapsedSections.navigation ? 'collapsed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('navigation');
                                }}
                            >
                                <div className="section-label">Navigation</div>
                                <div className="section-toggle">
                                    {collapsedSections.navigation ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.navigation || collapsed) && (
                            <div className="section-content">
                                <button
                                    className="nav-button external-link-button"
                                    onClick={() => {
                                        // Show confirmation dialog before navigating away
                                        if (window.confirm("Leave dashboard and go to customer website?")) {
                                            window.location.href = '/';
                                        }
                                    }}
                                    title="Customer Website"
                                >
                                    <span className="nav-icon">🌐</span>
                                    {!collapsed && (
                                        <>
                                            <span className="nav-text">Customer Site</span>
                                            <span className="external-link-icon">↗</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    className={`nav-button dashboard-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('dashboard')}
                                    title="Dashboard Overview"
                                >
                                    <span className="nav-icon">📊</span>
                                    {!collapsed && (
                                        <span className="nav-text">Dashboard</span>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reservations Section */}
                    <div className="nav-section">
                        {!collapsed && (
                            <div
                                className={`section-header ${collapsedSections.reservations ? 'collapsed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('reservations');
                                }}
                            >
                                <div className="section-label">Reservations</div>
                                <div className="section-toggle">
                                    {collapsedSections.reservations ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.reservations || collapsed) && (
                            <div className="section-content">
                                <button
                                    className={`nav-button ${activeTab === 'pendingReservations' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pendingReservations')}
                                    title="Pending Reservations"
                                >
                                    <span className="nav-icon">📋</span>
                                    {!collapsed && (
                                        <span className="nav-text">Pending Reservations</span>
                                    )}
                                    {pendingReservations.length > 0 && (
                                        <span className="notification-badge">
                                            {pendingReservations.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    className={`nav-button ${activeTab === 'allReservations' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('allReservations')}
                                    title="All Reservations"
                                >
                                    <span className="nav-icon">📅</span>
                                    {!collapsed && (
                                        <span className="nav-text">All Reservations</span>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Orders Section */}
                    <div className="nav-section">
                        {!collapsed && (
                            <div
                                className={`section-header ${collapsedSections.orders ? 'collapsed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection('orders');
                                }}
                            >
                                <div className="section-label">Orders</div>
                                <div className="section-toggle">
                                    {collapsedSections.orders ? '►' : '▼'}
                                </div>
                            </div>
                        )}
                        {(!collapsedSections.orders || collapsed) && (
                            <div className="section-content">
                                <button
                                    className={`nav-button ${activeTab === 'orders' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                    title="Orders"
                                >
                                    <span className="nav-icon">🛒</span>
                                    {!collapsed && (
                                        <span className="nav-text">Order Management</span>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Restaurant Management Section - Only for Owner */}
                    {isOwner && (
                        <div className="nav-section">
                            {!collapsed && (
                                <div
                                    className={`section-header ${collapsedSections.management ? 'collapsed' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSection('management');
                                    }}
                                >
                                    <div className="section-label">Restaurant Management</div>
                                    <div className="section-toggle">
                                        {collapsedSections.management ? '►' : '▼'}
                                    </div>
                                </div>
                            )}
                            {(!collapsedSections.management || collapsed) && (
                                <div className="section-content">
                                    <button
                                        className={`nav-button ${activeTab === 'tables' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tables')}
                                        title="Tables Management"
                                    >
                                        <span className="nav-icon">🪑</span>
                                        {!collapsed && (
                                            <span className="nav-text">Tables</span>
                                        )}
                                    </button>

                                    <button
                                        className={`nav-button ${activeTab === 'menu' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('menu')}
                                        title="Menu Management"
                                    >
                                        <span className="nav-icon">🍽️</span>
                                        {!collapsed && (
                                            <span className="nav-text">Menu</span>
                                        )}
                                    </button>

                                    <button
                                        className={`nav-button ${activeTab === 'hours' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('hours')}
                                        title="Opening Hours"
                                    >
                                        <span className="nav-icon">🕒</span>
                                        {!collapsed && (
                                            <span className="nav-text">Opening Hours</span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Administration Section - Only for Owner */}
                    {isOwner && (
                        <div className="nav-section">
                            {!collapsed && (
                                <div
                                    className={`section-header ${collapsedSections.administration ? 'collapsed' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSection('administration');
                                    }}
                                >
                                    <div className="section-label">Administration</div>
                                    <div className="section-toggle">
                                        {collapsedSections.administration ? '►' : '▼'}
                                    </div>
                                </div>
                            )}
                            {(!collapsedSections.administration || collapsed) && (
                                <div className="section-content">
                                    <button
                                        className={`nav-button ${activeTab === 'employees' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('employees')}
                                        title="Employees"
                                    >
                                        <span className="nav-icon">👥</span>
                                        {!collapsed && (
                                            <span className="nav-text">Employees</span>
                                        )}
                                    </button>

                                    <button
                                        className={`nav-button ${activeTab === 'restaurantConfig' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('restaurantConfig')}
                                        title="Restaurant Configuration"
                                    >
                                        <span className="nav-icon">⚙️</span>
                                        {!collapsed && (
                                            <span className="nav-text">Settings</span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>

            {!collapsed && window.innerWidth <= 768 && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;