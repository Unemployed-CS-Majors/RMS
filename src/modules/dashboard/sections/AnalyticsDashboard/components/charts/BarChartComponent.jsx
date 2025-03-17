import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import styles from './ChartComponents.module.css';

const BarChartComponent = ({
                               data,
                               dataKey,
                               xAxisKey = 'name',
                               fill = '#4f46e5',
                               title,
                               tooltipFormatter,
                               legendName
                           }) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={xAxisKey}/>
                        <YAxis/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend/>
                        <Bar
                            dataKey={dataKey}
                            fill={fill}
                            name={legendName || dataKey}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartComponent;