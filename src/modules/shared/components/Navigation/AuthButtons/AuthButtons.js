import React from "react";
import { motion } from "framer-motion";
import styles from "./AuthButtons.module.css";

/**
 * AuthButtons component
 *
 * Renders the authentication buttons for login and sign-up.
 *
 * @param {Object} props - The component props
 * @param {Function} props.handleLoginClick - The function to call when the login button is clicked
 * @param {Function} props.handleSignUpClick - The function to call when the sign-up button is clicked
 * @param {boolean} props.isMobile - Flag to indicate if the view is on a mobile device
 * @returns {JSX.Element} The AuthButtons component
 */
const AuthButtons = ({ handleLoginClick, handleSignUpClick, isMobile }) => (
    <div className={isMobile ? styles.mobileHeaderRight : styles.headerRight}>
        <motion.button
            onClick={handleLoginClick}
            className={`${styles.authBtn} ${styles.loginBtn} ${isMobile ? styles.mobileAuthBtn : ''}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
        >
            Log In
        </motion.button>

        <motion.button
            onClick={handleSignUpClick}
            className={`${styles.authBtn} ${styles.signupBtn} ${isMobile ? styles.mobileAuthBtn : ''}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
        >
            Sign Up
        </motion.button>
    </div>
);

export default AuthButtons;