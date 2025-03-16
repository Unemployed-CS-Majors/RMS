
import React from 'react';

export const CenteredMetric = ({ title, value, description }) => {
    return (
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
                <div className="rms-analytics-center-stat">
                    <h1 className="rms-analytics-large-stat">{value}</h1>
                    {description && <p className="rms-analytics-stat-description">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export const MetricsGrid = ({ title, metrics }) => {
    return (
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
                <div className="rms-analytics-stats-grid">
                    {metrics.map((metric, index) => (
                        <div key={index} className="rms-analytics-stat-item">
                            <h4 className="rms-analytics-stat-title">{metric.title}</h4>
                            <p className="rms-analytics-stat-number">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MetricsList = ({ title, metrics }) => {
    return (
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
                <div className="rms-analytics-metrics-container">
                    {metrics.map((metric, index) => (
                        <div key={index} className="rms-analytics-metric">
                            <h4 className="rms-analytics-metric-title">{metric.title}</h4>
                            <p className="rms-analytics-metric-value">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};