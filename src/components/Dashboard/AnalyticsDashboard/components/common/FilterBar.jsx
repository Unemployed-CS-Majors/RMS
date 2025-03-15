
import React from 'react';

const FilterBar = ({ timeRange, setTimeRange }) => {
    return (
        <div className="rms-analytics-filter-bar">
            <div className="rms-analytics-filter-group">
                <label className="rms-analytics-filter-label">Time Range:</label>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(Number(e.target.value))}
                    className="rms-analytics-filter-select"
                >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;




