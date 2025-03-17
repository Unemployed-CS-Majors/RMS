import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import styles from './ChartComponents.module.css';

const LineChartComponent = ({
                                data,
                                dataKey,
                                xAxisKey = 'name',
                                stroke = '#4f46e5',
                                title,
                                tooltipFormatter,
                                legendName
                            }) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={xAxisKey}/>
                        <YAxis/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend/>
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={stroke}
                            activeDot={{r: 8}}
                            name={legendName || dataKey}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartComponent;




