
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
        <div className="rms-analytics-dashboard-card rms-analytics-chart-card">
            {title && <h3 className="rms-analytics-card-title">{title}</h3>}
            <div className="rms-analytics-chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisKey} />
                        <YAxis />
                        <Tooltip formatter={tooltipFormatter} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={stroke}
                            activeDot={{ r: 8 }}
                            name={legendName || dataKey}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartComponent;




