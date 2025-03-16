import React from 'react';
import { FaInstagram, FaFacebookSquare, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PropTypes from 'prop-types';
import styles from './SocialIcons.module.css';

/**
 * Component for displaying social media icons with consistent styling
 */
const SocialIcons = ({ className = '' }) => {
    return (
        <div className={`${styles.socialsContainer} ${className}`}>
            <div className={`${styles.socials} ${styles.instagramContainer}`}>
                <FaInstagram className={styles.apps} />
            </div>
            <div className={`${styles.socials} ${styles.xContainer}`}>
                <FaXTwitter className={styles.apps} />
            </div>
            <div className={`${styles.socials} ${styles.facebookContainer}`}>
                <FaFacebookSquare className={styles.apps} />
            </div>
            <div className={`${styles.socials} ${styles.tiktokContainer}`}>
                <FaTiktok className={styles.apps} />
            </div>
        </div>
    );
};

SocialIcons.propTypes = {
    className: PropTypes.string
};

export default SocialIcons;