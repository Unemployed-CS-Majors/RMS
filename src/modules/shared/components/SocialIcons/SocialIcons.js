import React from 'react';
import {FaFacebookSquare, FaInstagram, FaTiktok} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import PropTypes from 'prop-types';
import styles from './SocialIcons.module.css';

/**
 * SocialIcons component
 *
 * Displays social media icons with consistent styling.
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional class names for custom styling
 * @returns {JSX.Element} The SocialIcons component
 */
const SocialIcons = ({className = ''}) => {
    return (
        <div className={`${styles.socialsContainer} ${className}`}>
            <div className={`${styles.socials} ${styles.instagramContainer}`}>
                <FaInstagram className={styles.apps}/>
            </div>
            <div className={`${styles.socials} ${styles.xContainer}`}>
                <FaXTwitter className={styles.apps}/>
            </div>
            <div className={`${styles.socials} ${styles.facebookContainer}`}>
                <FaFacebookSquare className={styles.apps}/>
            </div>
            <div className={`${styles.socials} ${styles.tiktokContainer}`}>
                <FaTiktok className={styles.apps}/>
            </div>
        </div>
    );
};

SocialIcons.propTypes = {
    className: PropTypes.string
};

export default SocialIcons;