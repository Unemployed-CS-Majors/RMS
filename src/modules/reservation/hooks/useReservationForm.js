import { useState, useContext } from 'react';
import reservationService from '../../../services/reservation.service';
import { AuthContext } from '../../shared/contexts/AuthContext';

export const useReservationForm = () => {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState({hour: '12', minute: '00', ampm: 'AM'});
    const [endTime, setEndTime] = useState({hour: '01', minute: '30', ampm: 'PM'});
    const [number, setNumber] = useState('');
    const [freeTables, setFreeTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { isLoggedIn } = useContext(AuthContext);

    // Utility function to format date and time
    const formatDateTime = (date, time) => {
        try {
            if (!date || !(date instanceof Date) || isNaN(date)) {
                console.error("Invalid date object:", date);
                return null;
            }

            const formattedDate = date.toISOString().split('T')[0];

            // Validate time object
            if (!time || !time.hour || !time.minute || !time.ampm) {
                console.error("Invalid time object:", time);
                return null;
            }

            const hours = parseInt(time.hour, 10);

            // Validate hours
            if (isNaN(hours) || hours < 1 || hours > 12) {
                console.error("Invalid hours:", time.hour);
                return null;
            }

            const adjustedHours = time.ampm === 'PM' ? (hours === 12 ? 12 : hours + 12) : (hours === 12 ? 0 : hours);

            return `${formattedDate}T${String(adjustedHours).padStart(2, '0')}:${time.minute}:00`;
        } catch (err) {
            console.error("Error formatting date time:", err);
            return null;
        }
    };

    // Validation logic
    const validateInputs = () => {
        setError(null);

        if (!date) {
            setError("Please select a date before searching");
            return false;
        }

        if (!(date instanceof Date) || isNaN(date)) {
            setError("Invalid date. Please select a valid date");
            return false;
        }

        if (!startTime || !endTime) {
            setError("Please select start and end times");
            return false;
        }

        if(!number){
            setError("Please enter the number of seats");
            return false;
        }

        // Calculate start and end times in minutes for comparison
        const startHour = parseInt(startTime.hour, 10);
        const startMinute = parseInt(startTime.minute, 10);
        const startInMinutes = (startTime.ampm === 'PM' && startHour !== 12 ? startHour + 12 : startHour) * 60 + startMinute;

        const endHour = parseInt(endTime.hour, 10);
        const endMinute = parseInt(endTime.minute, 10);
        const endInMinutes = (endTime.ampm === 'PM' && endHour !== 12 ? endHour + 12 : endHour) * 60 + endMinute;

        // Check if end time is after start time
        if (endInMinutes <= startInMinutes) {
            setError("End time must be after start time");
            return false;
        }

        if (number < 1) {
            setError("Number of people must be greater than 0");
            return false;
        }

        return true;
    };

    // Search for free tables
    const searchFreeTables = async () => {
        // Reset states
        setSuccess(null);

        // Check if user is authenticated
        if (!isLoggedIn) {
            setError("Please log in to search for available tables");
            return null;
        }

        try {
            setLoading(true);
            setError(null);

            // Validate inputs
            if (!validateInputs()) {
                setLoading(false);
                return null;
            }

            const startDateTime = formatDateTime(date, startTime);
            const endDateTime = formatDateTime(date, endTime);

            // Validate formatted date times
            if (!startDateTime || !endDateTime) {
                setError("Invalid date or time format. Please try again");
                setLoading(false);
                return null;
            }

            const response = await reservationService.getFreeTables(startDateTime, endDateTime, number);

            // Validate API response
            if (!response || !Array.isArray(response)) {
                console.error("Unexpected API response format:", response);
                setError("Received invalid data from the server. Please try again");
                setLoading(false);
                return null;
            }

            const availableTables = response;
            setFreeTables(availableTables);

            if (availableTables.length === 0) {
                setError("No tables available for the selected time. Please try another time");
            } else {
                setSuccess(`Found ${availableTables.length} available table${availableTables.length > 1 ? 's' : ''}. Click on a green table to make your reservation`);
            }

            return availableTables;
        } catch (err) {
            console.error('Error fetching tables:', err);

            if (err.response && err.response.status === 401) {
                setError("Authentication error. Please log in again to continue");
            } else {
                setError("Failed to fetch available tables. Please try again");
            }

            return null;
        } finally {
            setLoading(false);
        }
    };

    // Create reservation
    const createReservation = async (tableId) => {
        // Check if user is authenticated
        if (!isLoggedIn) {
            setError("Please log in to confirm your reservation");
            return false;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            // Validate inputs
            if (!validateInputs()) {
                setLoading(false);
                return false;
            }

            const startDateTime = formatDateTime(date, startTime);
            const endDateTime = formatDateTime(date, endTime);

            // Validate formatted date times
            if (!startDateTime || !endDateTime) {
                setError("Invalid date or time format. Please try again");
                setLoading(false);
                return false;
            }

            // Validate people number
            let peopleCount;
            try {
                peopleCount = parseInt(number, 10);
                if (isNaN(peopleCount) || peopleCount < 1) {
                    setError("Please enter a valid number of people");
                    setLoading(false);
                    return false;
                }
            } catch (err) {
                setError("Please enter a valid number of people");
                setLoading(false);
                return false;
            }

            await reservationService.create(
                parseInt(tableId, 10),
                startDateTime,
                endDateTime,
                peopleCount
            );

            // Update free tables
            const updatedTables = freeTables.map((table) =>
                table.id === tableId ? {...table, isActive: false} : table
            );

            setFreeTables(updatedTables);

            // Show success message
            setSuccess(`Reservation confirmed for Table ${tableId} on ${date.toLocaleDateString()} at ${startTime.hour}:${startTime.minute} ${startTime.ampm} for ${peopleCount} ${peopleCount > 1 ? 'people' : 'person'}`);

            return true;
        } catch (err) {
            console.error('Error creating reservation:', err);

            // Provide more specific error messages based on the error
            if (err.response) {
                const status = err.response.status;
                if (status === 400) {
                    setError('Invalid reservation data. Please check your inputs and try again');
                } else if (status === 409) {
                    setError('This table has already been reserved. Please choose another table');
                } else if (status === 401) {
                    setError("Authentication error. Please log in again to continue");
                } else {
                    setError(`Failed to create reservation (Error ${status}). Please try again`);
                }
            } else if (err.request) {
                setError('Network error. Please check your connection and try again');
            } else {
                setError('Failed to create reservation. Please try again');
            }

            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        number,
        setNumber,
        freeTables,
        loading,
        error,
        success,
        searchFreeTables,
        createReservation
    };
};