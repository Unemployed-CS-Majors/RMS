import React from "react";
import { FaUserCircle, FaRegChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import cookieManager from "../../../utils/cookieManager";
import COOKIE_KEYS from "../../../../../constants/cookieKeys";
import styles from "./ProfileButton.module.css";

/**
 * ProfileButton component
 *
 * Renders profile and dashboard buttons with animation effects.
 *
 * @param {Object} props - The component props
 * @param {Function} props.handleProfileClick - The function to call when the profile button is clicked
 * @param {Function} props.handleDashboardOnClick - The function to call when the dashboard button is clicked
 * @param {boolean} props.isMobile - Flag to indicate if the view is on a mobile device
 * @returns {JSX.Element} The ProfileButton component
 */
const ProfileButton = ({ handleProfileClick, handleDashboardOnClick, isMobile }) => {
    const user = cookieManager.get(COOKIE_KEYS.USER);
    const isAdmin = ["owner", "employee"].includes(user);

    if (isMobile) {
        return (
            <div className={styles.mobileProfileButtons}>
                <motion.button
                    onClick={handleProfileClick}
                    className={styles.mobileProfileBtn}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaUserCircle /> Profile
                </motion.button>

                {isAdmin && (
                    <motion.button
                        onClick={handleDashboardOnClick}
                        className={styles.mobileDashboardBtn}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaRegChartBar /> Dashboard
                    </motion.button>
                )}
            </div>
        );
    }

    return (
        <div className={styles.profileButtonsContainer}>
            <motion.button
                onClick={handleProfileClick}
                className={styles.profileBtn}
                whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
            >
                <FaUserCircle /> Profile
            </motion.button>

            {isAdmin && (
                <motion.button
                    onClick={handleDashboardOnClick}
                    className={styles.dashboardBtn}
                    whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaRegChartBar /> Dashboard
                </motion.button>
            )}
        </div>
    );
};

export default ProfileButton;