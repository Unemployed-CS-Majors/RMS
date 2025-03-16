import { useState } from 'react';

export const useTimeRange = (initialValue = 30) => {
    const [timeRange, setTimeRange] = useState(initialValue);

    return { timeRange, setTimeRange };
};