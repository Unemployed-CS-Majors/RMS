import React from "react";
import {FaHome} from "react-icons/fa";
import styles from './HomeButton.module.css';

/**
 * Home button component for navigation
 *
 * @param {Function} onClick - Function to navigate home
 * @returns {JSX.Element} Home button component
 */
const HomeButton = ({onClick}) => {
    return (
        <div className={styles.returnHomeButton} onClick={onClick}>
            <FaHome/>
            <span>Home</span>
        </div>
    );
};

export default HomeButton;