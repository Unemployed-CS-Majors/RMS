import React from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import styles from './ChartComponents.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PieChartComponent = ({
                               data,
                               dataKey = 'value',
                               nameKey = 'name',
                               title,
                               tooltipFormatter,
                               labelFormatter = (entry) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
                           }) => {
    return (
        <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey={dataKey}
                            nameKey={nameKey}
                            label={labelFormatter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default PieChartComponent;