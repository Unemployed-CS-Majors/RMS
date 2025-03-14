/**
 * Utility functions for handling date and time formatting for reservations
 */

/**
 * Format date from MM/DD/YYYY to YYYY-MM-DD
 * @param {string} dateString - Date in MM/DD/YYYY format
 * @returns {string} Date in YYYY-MM-DD format
 */
export const formatDateForInput = (dateString) => {
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
        // Reorder from MM/DD/YYYY to YYYY-MM-DD
        return `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
    }
    return dateString; // Return original if format doesn't match
};

/**
 * Convert 12-hour time format to 24-hour format
 * @param {string} timeString - Time in 12-hour format (e.g., "7:30 PM")
 * @returns {string} Time in 24-hour format (e.g., "19:30")
 */
export const convertTo24Hour = (timeString) => {
    if (!timeString) return "";

    // Remove seconds part if present
    const timePart = timeString.replace(/:\d{2}\s/, " ");

    const [time, modifier] = timePart.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Convert date from YYYY-MM-DD to MM/DD/YYYY
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Date in MM/DD/YYYY format
 */
export const formatDateForStorage = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
        // Reorder from YYYY-MM-DD to MM/DD/YYYY
        return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
    }
    return dateString; // Return original if format doesn't match
};

/**
 * Convert 24-hour time format to 12-hour format
 * @param {string} timeString - Time in 24-hour format (e.g., "19:30")
 * @returns {string} Time in 12-hour format (e.g., "7:30:00 PM")
 */
export const convertTo12Hour = (timeString) => {
    if (!timeString) return "";

    const [hourStr, minuteStr] = timeString.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    return `${hour}:${minute}:00 ${ampm}`;
};

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};

/**
 * Validate time format (24-hour clock)
 * @param {string} timeString - Time string to validate (HH:MM)
 * @returns {boolean} True if time is valid
 */
export const isValidTime = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
};

/**
 * Format ID for display (truncate if needed)
 * @param {string} id - ID to format
 * @param {boolean} isMobile - Whether to format for mobile display
 * @returns {string} Formatted ID
 */
export const formatId = (id, isMobile = false) => {
    if (isMobile && id && id.length > 8) {
        return `${id.substring(0, 8)}...`;
    }
    return id;
};