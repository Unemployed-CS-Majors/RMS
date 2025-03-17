import {convertTo12HourFormat} from "../../shared/utils/timeUtils";

/**
 * Formats the opening hours into a more readable format.
 *
 * @param {Array} openingHours - An array of objects representing the opening hours.
 * @returns {Array} An array of objects with formatted day and hours.
 */
export const useFormattedOpeningHours = (openingHours) => {
    return openingHours
        .filter(hours => hours.startTime && hours.endTime)
        .map(hours => ({
            day: hours.day.charAt(0).toUpperCase() + hours.day.slice(1),
            hours: `${convertTo12HourFormat(hours.startTime)} - ${convertTo12HourFormat(hours.endTime)}`
        }));
};