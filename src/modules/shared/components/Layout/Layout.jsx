import React from "react";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";

/**
 * Layout component
 *
 * Renders the layout of the application, including the navigation and main content area.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed within the main area of the layout
 * @returns {JSX.Element} The Layout component
 */
const Layout = ({children}) => {
    return (
        <div className={styles.layoutContainer}>
            <Navigation/>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;