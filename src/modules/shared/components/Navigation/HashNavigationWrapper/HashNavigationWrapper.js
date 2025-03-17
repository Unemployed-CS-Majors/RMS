import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../../../../home/pages/Home';
import Menu from '../../../../menu/pages/Menu';
import Location from '../../../../location/pages/Location';
import ReserveTable from '../../../../reservation/pages/ReserveTable';

/**
 * HashNavigationWrapper component
 *
 * Manages navigation based on URL hash and renders the corresponding component.
 *
 * @returns {JSX.Element} The HashNavigationWrapper component
 */
const HashNavigationWrapper = () => {
    const [activeView, setActiveView] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');

        if (hash && ['Home', 'Menu', 'Location', 'Reservation'].includes(hash)) {
            setActiveView(hash);
        } else if (!hash) {
            // Set default hash if none exists
            window.location.hash = 'Home';
            setActiveView('Home');
        }
    }, [location.hash]);

    /**
     * Renders the component based on the active view.
     *
     * @returns {JSX.Element} The component corresponding to the active view
     */
    const renderActiveComponent = () => {
        switch (activeView) {
            case 'Menu':
                return <Menu />;
            case 'Location':
                return <Location />;
            case 'Reservation':
                return <ReserveTable />;
            case 'Home':
            default:
                return <Home />;
        }
    };

    return (
        <div className="hash-navigation-content">
            {renderActiveComponent()}
        </div>
    );
};

export default HashNavigationWrapper;