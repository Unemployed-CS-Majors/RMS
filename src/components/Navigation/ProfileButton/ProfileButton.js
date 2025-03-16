import React from "react";
import { FaUserCircle, FaRegChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import cookieManager from "../../../utils/cookieManager";
import COOKIE_KEYS from "../../../constants/cookieKeys";
import styles from "./ProfileButton.module.css";

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