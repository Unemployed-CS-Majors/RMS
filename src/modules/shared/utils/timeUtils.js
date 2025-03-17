export const convertTo12HourFormat = (time24) => {
    if (!time24) return '';

    const [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const minuteFormatted = minute < 10 ? `0${minute}` : minute;

    return `${hour12}:${minuteFormatted} ${ampm}`;
};
