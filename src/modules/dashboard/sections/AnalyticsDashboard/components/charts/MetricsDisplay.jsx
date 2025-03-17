import React from 'react';
import styles from './ChartComponents.module.css';

export const CenteredMetric = ({title, value, description}) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <div className={styles.centerStat}>
                    <h1 className={styles.largeStat}>{value}</h1>
                    {description && <p className={styles.statDescription}>{description}</p>}
                </div>
            </div>
        </div>
    );
};

export const MetricsGrid = ({title, metrics}) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <div className={styles.statsGrid}>
                    {metrics.map((metric, index) => (
                        <div key={index} className={styles.statItem}>
                            <h4 className={styles.statTitle}>{metric.title}</h4>
                            <p className={styles.statNumber}>{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MetricsList = ({title, metrics}) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <div className={styles.metricsContainer}>
                    {metrics.map((metric, index) => (
                        <div key={index} className={styles.metric}>
                            <h4 className={styles.metricTitle}>{metric.title}</h4>
                            <p className={styles.metricValue}>{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};