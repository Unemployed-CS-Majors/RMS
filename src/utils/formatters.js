// src/components/Analytics/Dashboard/utils/formatters.js

// Format currency for better display
export const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
};

// Format percentage
export const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
};

// Extract shorter day names for better display
export const getDayName = (day) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
};

// Get full day name from index
export const getFullDayName = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
};

// Format status label
export const formatStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};

// Format method label (payment, delivery)
export const formatMethodLabel = (method) => {
    return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};