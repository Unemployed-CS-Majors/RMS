import React from 'react';
import styles from './NavigationTabs.module.css';

/**
 * NavigationTabs component for switching between different sections
 *
 * @param {Object} props - Component props
 * @param {string} props.activeSection - The currently active section
 * @param {Function} props.setActiveSection - Function to set the active section
 * @returns {JSX.Element} The NavigationTabs component
 */
const NavigationTabs = ({ activeSection, setActiveSection }) => {
    // Define all tabs initially
    let tabs = [
        { id: 'summary', label: 'Overview' },
        { id: 'revenue', label: 'Revenue' },
        { id: 'orders', label: 'Orders' },
        { id: 'menu', label: 'Menu Items' },
        { id: 'reservations', label: 'Reservations' }
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activeSection === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveSection(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default NavigationTabs;