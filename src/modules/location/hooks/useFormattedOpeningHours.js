import {convertTo12HourFormat} from "../../shared/utils/timeUtils";

export const useFormattedOpeningHours = (openingHours) => {
    return openingHours
        .filter(hours => hours.startTime && hours.endTime)
        .map(hours => ({
            day: hours.day.charAt(0).toUpperCase() + hours.day.slice(1),
            hours: `${convertTo12HourFormat(hours.startTime)} - ${convertTo12HourFormat(hours.endTime)}`
        }));
};