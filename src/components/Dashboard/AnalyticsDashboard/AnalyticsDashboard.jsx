// src/components/Analytics/Dashboard/AnalyticsDashboard.jsx
import React from 'react';
import LoadingIndicator from "../Loading/LoadingIndicator";
import FilterBar from './components/common/FilterBar';
import SummaryCards from './components/common/SummaryCards';
import NavigationTabs from './components/common/NavigationTabs';
import Summary from './components/sections/Summary';
import Revenue from './components/sections/Revenue';
import Orders from './components/sections/Orders';
import MenuItems from './components/sections/MenuItems';
import Reservations from './components/sections/Reservations';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { useTimeRange } from './hooks/useTimeRange';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = ({ loading: externalLoading, setLoading }) => {
    const { timeRange, setTimeRange } = useTimeRange(30);
    const {
        analyticsData,
        loading,
        error,
        fetchData
    } = useAnalyticsData(timeRange, setLoading);
    const [activeSection, setActiveSection] = React.useState('summary');

    // Handle error state
    if (error) {
        return (
            <div className="rms-analytics-error">
                <div className="rms-analytics-error-message">
                    <p>{error}</p>
                    <button
                        className="rms-analytics-retry-button"
                        onClick={fetchData}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Handle loading state
    if (loading || externalLoading) {
        return <LoadingIndicator text="Loading analytics data..." />;
    }

    // Handle no data state
    if (!analyticsData) {
        return null;
    }

    // Render appropriate section based on active tab
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'summary':
                return <Summary analyticsData={analyticsData} />;
            case 'revenue':
                return <Revenue analyticsData={analyticsData} timeRange={timeRange} />;
            case 'orders':
                return <Orders analyticsData={analyticsData} />;
            case 'menu':
                return <MenuItems analyticsData={analyticsData} />;
            case 'reservations':
                return <Reservations analyticsData={analyticsData} timeRange={timeRange} />;
            default:
                return <Summary analyticsData={analyticsData} />;
        }
    };

    return (
        <div className="rms-analytics-dashboard">
            <FilterBar
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />

            <SummaryCards dashboardSummary={analyticsData.dashboardSummary}
                          operationalAnalytics={analyticsData.operationalAnalytics}
            />

            <NavigationTabs
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="rms-analytics-content">
                {renderActiveSection()}
            </div>
        </div>
    );
};

export default AnalyticsDashboard;