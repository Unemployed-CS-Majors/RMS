import React, {useContext} from "react";
import {AuthContext} from "../../../shared/contexts/AuthContext";
import styles from "./Map.module.css";

/**
 * Map component
 *
 * Renders a Google Maps iframe based on the configuration from AuthContext.
 *
 * @returns {JSX.Element} The Map component
 */
const Map = () => {
    const {config} = useContext(AuthContext)
    return (
        <div className={styles.mapContainer}>
            <div className={styles.map}>
                <iframe
                    title="Google Maps Location"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={config?.map?.mapUrl}
                >
                    <a href="https://www.gps.ie/">gps devices</a>
                </iframe>
            </div>
        </div>
    );
};

export default Map;