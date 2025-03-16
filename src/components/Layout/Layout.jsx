import React from "react";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div className={styles.layoutContainer}>
            <Navigation />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;