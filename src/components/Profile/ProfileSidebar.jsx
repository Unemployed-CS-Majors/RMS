import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';

/**
 * ProfileSidebar component displays the navigation sidebar/header for the profile page
 */
const ProfileSidebar = ({ activeTab, handleTabChange, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close menu after tab selection (for mobile)
    const handleTabSelect = (tab) => {
        handleTabChange(tab);
        setMenuOpen(false);
    };

    return (
        <nav className="sidebar-profile">
            <div className="sidebar-header-profile">
                <h2>My Profile</h2>
                <button
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>
            <ul className={`sidebar-menu ${menuOpen ? 'show' : ''}`}>
                <li
                    className={activeTab === "account" ? "active" : ""}
                    onClick={() => handleTabSelect("account")}
                >
                    My Account
                </li>
                <li
                    className={activeTab === "reservations" ? "active" : ""}
                    onClick={() => handleTabSelect("reservations")}
                >
                    Reservations
                </li>
                <li
                    className={activeTab === "orders" ? "active" : ""}
                    onClick={() => handleTabSelect("orders")}
                >
                    Orders
                </li>
                <li className="logout-mobile" onClick={handleLogoutClick}>
                    Logout
                </li>
            </ul>
            {/* Separate logout container for desktop */}
            <div className="logout-container desktop-only">
                <button onClick={handleLogoutClick} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default ProfileSidebar;