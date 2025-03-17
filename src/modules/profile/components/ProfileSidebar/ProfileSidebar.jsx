import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ROUTES from '../../../../constants/routes';
import styles from './ProfileSidebar.module.css';

/**
 * ProfileSidebar component displays the navigation sidebar/header for the profile page
 */
const ProfileSidebar = ({activeTab, handleTabChange, logout}) => {
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
        <nav className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>My Profile</h2>
                <button
                    className={styles.menuToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>
            <ul className={`${styles.sidebarMenu} ${menuOpen ? styles.show : ''}`}>
                <li
                    className={activeTab === "account" ? styles.active : ""}
                    onClick={() => handleTabSelect("account")}
                >
                    My Account
                </li>
                <li
                    className={activeTab === "reservations" ? styles.active : ""}
                    onClick={() => handleTabSelect("reservations")}
                >
                    Reservations
                </li>
                <li
                    className={activeTab === "orders" ? styles.active : ""}
                    onClick={() => handleTabSelect("orders")}
                >
                    Orders
                </li>
                <li className={styles.logoutMobile} onClick={handleLogoutClick}>
                    Logout
                </li>
            </ul>
            {/* Separate logout container for desktop */}
            <div className={`${styles.logoutContainer} ${styles.desktopOnly}`}>
                <button onClick={handleLogoutClick} className={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default ProfileSidebar;