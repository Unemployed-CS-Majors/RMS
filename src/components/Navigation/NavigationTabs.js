import React from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from 'react';

const NavigationTabs = ({ currentPage, handleCurrentPage, isMobile }) => {
    const { config } = useContext(AuthContext);

    // Helper function to check if a feature is enabled
    const isFeatureEnabled = (featureName) => {
        if (!config?.features || !Array.isArray(config.features)) return true;
        const feature = config.features.find(f => f.name === featureName);
        return feature ? feature.enabled : true;
    };

    let navItems = ["Home", "Reservation", "Menu", "Location"];

    // Filter out disabled features
    if (!isFeatureEnabled("online_reservations")) {
        navItems = navItems.filter(tab => tab !== 'Reservation');
    }

    if (!isFeatureEnabled("menu")) {
        navItems = navItems.filter(tab => tab !== 'Menu');
    }

    return (
        <div className={isMobile ? "mobile-header-center" : "header-center"}>
            {navItems.map((item) => (
                <motion.div
                    key={item}
                    className={isMobile ? "mobile-nav-item-container" : "nav-item-container"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div
                        className={isMobile ? "mobile-header-btn" : "header-btn"}
                        onClick={() => handleCurrentPage(item)}
                    >
                        {item}
                        {currentPage === item && window.location.pathname === '/' && (
                            <motion.div
                                className="nav-indicator"
                                layoutId="indicator"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default NavigationTabs;