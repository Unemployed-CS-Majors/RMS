import React from 'react';
import { FaInstagram, FaFacebookSquare, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PropTypes from 'prop-types';
import './SocialIcons.css';

/**
 * Component for displaying social media icons with consistent styling
 */
const SocialIcons = ({ className = '' }) => {
    return (
        <div className={`socials-container ${className}`}>
            <div className="socials instagram-container">
                <FaInstagram className="apps" />
            </div>
            <div className="socials x-container">
                <FaXTwitter className="apps" />
            </div>
            <div className="socials facebook-container">
                <FaFacebookSquare className="apps" />
            </div>
            <div className="socials tiktok-container">
                <FaTiktok className="apps" />
            </div>
        </div>
    );
};

SocialIcons.propTypes = {
    className: PropTypes.string
};

export default SocialIcons;