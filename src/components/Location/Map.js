import React, {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
const Map = () => {
    const {config} = useContext(AuthContext)
    return (
        <div className="map-container">
            <div className="map">
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