
import React from 'react';

const NavigationTabs = ({ activeSection, setActiveSection }) => {
    const tabs = [
        { id: 'summary', label: 'Overview' },
        { id: 'revenue', label: 'Revenue' },
        { id: 'orders', label: 'Orders' },
        { id: 'menu', label: 'Menu Items' },
        { id: 'reservations', label: 'Reservations' }
    ];

    return (
        <div className="rms-analytics-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`rms-analytics-tab ${activeSection === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default NavigationTabs;