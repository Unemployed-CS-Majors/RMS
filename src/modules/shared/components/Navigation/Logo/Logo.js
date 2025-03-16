import React from "react";
import { motion } from "framer-motion";
import styles from "./Logo.module.css";

const Logo = () => (
    <motion.div
        className={styles.headerLeft}
        whileHover={{ scale: 1.05 }}
    >
        <h1 className={styles.logo}>
            R<span className={styles.logoHighlight}>M</span>S
        </h1>
    </motion.div>
);

export default Logo;