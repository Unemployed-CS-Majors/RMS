
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisKey} />
                        <YAxis />
                        <Tooltip formatter={tooltipFormatter} />
                        <Legend />
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