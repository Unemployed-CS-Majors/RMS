import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../constants/routes.js";
import Logo from "./Logo/Logo";
import NavigationTabs from "./NavigationTabs/NavigationTabs";
import AuthButtons from "./AuthButtons/AuthButtons";
import {AuthContext} from "../../contexts/AuthContext";
import ProfileButton from "./ProfileButton/ProfileButton";
import {FaBars, FaTimes} from "react-icons/fa";
import styles from "./Navigation.module.css";

/**
 * Navigation component
 *
 * Renders the navigation bar with logo, navigation tabs, and authentication/profile buttons.
 * Handles mobile and desktop views, and manages navigation based on URL hash.
 *
 * @returns {JSX.Element} The Navigation component
 */
const Navigation = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn} = useContext(AuthContext);

    // Set initial page based on hash only when on the root path
    useEffect(() => {
        const pathname = location.pathname;
        const hash = location.hash.replace('#', '');

        // Only set active tab from hash when on main routes
        if (pathname === '/' || pathname === ROUTES.HOME) {
            if (hash === 'Home' || hash === 'Menu' || hash === 'Location' || hash === 'Reservation') {
                setCurrentPage(hash);
            } else if (!hash) {
                // Set default hash if on homepage with no hash
                window.location.hash = 'Home';
                setCurrentPage('Home');
            }
        }
    }, [location]);

    /**
     * Handles the login button click event
     */
    const handleLoginClick = () => {
        navigate(ROUTES.AUTH);
        setMenuOpen(false);
    };

    /**
     * Handles the sign-up button click event
     */
    const handleSignUpClick = () => {
        navigate(ROUTES.AUTH);
        setMenuOpen(false);
    };

    /**
     * Handles the profile button click event
     */
    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
        setMenuOpen(false);
    };

    /**
     * Handles the dashboard button click event
     */
    const handleDashboardClick = () => {
        navigate(ROUTES.ADMIN);
        setMenuOpen(false);
    };

    /**
     * Handles the current page change event
     *
     * @param {string} page - The new current page
     */
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
        setMenuOpen(false);
        navigate('/');
        window.location.hash = page;
    };

    // Check if screen size is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Close menu when screen size changes to desktop
    useEffect(() => {
        if (!isMobile) {
            setMenuOpen(false);
        }
    }, [isMobile]);

    /**
     * Toggles the mobile menu open/close state
     */
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Check if we're on a main navigation page (home page)
    const isMainRoute = location.pathname === '/' || location.pathname === ROUTES.HOME;

    return (
        <div className={`${styles.headerContainer} ${window.scrollY > 0 ? styles.scrolled : ''}`}>
            <Logo/>

            {isMobile ? (
                <>
                    <button
                        className={styles.hamburgerMenu}
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <FaTimes/> : <FaBars/>}
                    </button>

                    {menuOpen && (
                        <div className={styles.mobileMenu}>
                            <NavigationTabs
                                currentPage={currentPage}
                                handleCurrentPage={handleCurrentPage}
                                isMainRoute={isMainRoute}
                                isMobile={true}
                            />

                            {isLoggedIn ? (
                                <ProfileButton
                                    handleProfileClick={handleProfileClick}
                                    handleDashboardOnClick={handleDashboardClick}
                                    isMobile={true}
                                />
                            ) : (
                                <AuthButtons
                                    handleLoginClick={handleLoginClick}
                                    handleSignUpClick={handleSignUpClick}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <NavigationTabs
                        currentPage={currentPage}
                        handleCurrentPage={handleCurrentPage}
                        isMainRoute={isMainRoute}
                        isMobile={false}
                    />

                    <div className={styles.headerRightContainer}>
                        {isLoggedIn ? (
                            <ProfileButton
                                handleProfileClick={handleProfileClick}
                                handleDashboardOnClick={handleDashboardClick}
                                isMobile={false}
                            />
                        ) : (
                            <AuthButtons
                                handleLoginClick={handleLoginClick}
                                handleSignUpClick={handleSignUpClick}
                                isMobile={false}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Navigation;