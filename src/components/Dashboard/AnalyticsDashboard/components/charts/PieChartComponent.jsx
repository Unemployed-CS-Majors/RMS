
import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

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
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
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
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={tooltipFormatter} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChartComponent;