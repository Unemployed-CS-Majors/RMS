import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateTimeForm.module.css";

/**
 * DateTimeForm component
 *
 * Renders a form for selecting a reservation date, start time, end time, and number of people.
 * Includes a search button to find available tables.
 *
 * @param {Object} props - The component props
 * @param {Date} props.date - The selected date
 * @param {Function} props.setDate - Function to set the selected date
 * @param {Object} props.startTime - The selected start time
 * @param {Function} props.setStartTime - Function to set the start time
 * @param {Object} props.endTime - The selected end time
 * @param {Function} props.setEndTime - Function to set the end time
 * @param {number} props.number - The number of people for the reservation
 * @param {Function} props.setNumber - Function to set the number of people
 * @param {Function} props.onSearch - Function to handle the search action
 * @param {boolean} props.loading - Whether the search is in progress
 * @returns {JSX.Element} The DateTimeForm component
 */
const DateTimeForm = ({
                          date,
                          setDate,
                          startTime,
                          setStartTime,
                          endTime,
                          setEndTime,
                          number,
                          setNumber,
                          onSearch,
                          loading
                      }) => {
    // Generate hours options (1-12)
    const hoursOptions = Array.from({length: 12}, (_, i) => ({
        value: String(i + 1).padStart(2, "0"),
        label: String(i + 1).padStart(2, "0")
    }));

    // Generate minutes options (00, 15, 30, 45)
    const minutesOptions = ["00", "15", "30", "45"].map(value => ({
        value,
        label: value
    }));

    // Handle hour change for start time
    const handleStartHourChange = (e) => {
        setStartTime({...startTime, hour: e.target.value});
    };

    // Handle minute change for start time
    const handleStartMinuteChange = (e) => {
        setStartTime({...startTime, minute: e.target.value});
    };

    // Handle AM/PM change for start time
    const handleStartAmPmChange = (e) => {
        setStartTime({...startTime, ampm: e.target.value});
    };

    // Handle hour change for end time
    const handleEndHourChange = (e) => {
        setEndTime({...endTime, hour: e.target.value});
    };

    // Handle minute change for end time
    const handleEndMinuteChange = (e) => {
        setEndTime({...endTime, minute: e.target.value});
    };

    // Handle AM/PM change for end time
    const handleEndAmPmChange = (e) => {
        setEndTime({...endTime, ampm: e.target.value});
    };

    // Filter to disable past dates
    const filterPastDates = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    return (
        <div className={styles.reservationForm}>
            <h3>Make a Reservation</h3>

            <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={date => setDate(date)}
                    dateFormat="MM/dd/yyyy"
                    minDate={new Date()}
                    filterDate={filterPastDates}
                    placeholderText="Select a date"
                    className={styles.inputField}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="startTime">Start Time</label>
                <div className={styles.timeSelectContainer}>
                    <select
                        id="startHour"
                        value={startTime.hour}
                        onChange={handleStartHourChange}
                        className={styles.selectField}
                    >
                        {hoursOptions.map(option => (
                            <option key={`start-hour-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        id="startMinute"
                        value={startTime.minute}
                        onChange={handleStartMinuteChange}
                        className={styles.selectField}
                    >
                        {minutesOptions.map(option => (
                            <option key={`start-minute-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        id="startAmPm"
                        value={startTime.ampm}
                        onChange={handleStartAmPmChange}
                        className={styles.selectField}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="endTime">End Time</label>
                <div className={styles.timeSelectContainer}>
                    <select
                        id="endHour"
                        value={endTime.hour}
                        onChange={handleEndHourChange}
                        className={styles.selectField}
                    >
                        {hoursOptions.map(option => (
                            <option key={`end-hour-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        id="endMinute"
                        value={endTime.minute}
                        onChange={handleEndMinuteChange}
                        className={styles.selectField}
                    >
                        {minutesOptions.map(option => (
                            <option key={`end-minute-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        id="endAmPm"
                        value={endTime.ampm}
                        onChange={handleEndAmPmChange}
                        className={styles.selectField}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="number">Number of People</label>
                <input
                    id="number"
                    type="number"
                    min="1"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    placeholder="Enter number of guests"
                    className={styles.inputField}
                />
            </div>

            <button
                className={styles.searchButton}
                onClick={onSearch}
                disabled={loading}
            >
                {loading ? "Searching..." : "Find Available Tables"}
            </button>

            <div className={styles.helperText}>
                Select a date and time to check table availability, then click on an available table to make your
                reservation.
            </div>
        </div>
    );
};

export default DateTimeForm;