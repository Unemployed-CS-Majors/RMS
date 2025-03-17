import React from 'react';
import styles from './OpeningHours.module.css';

/**
 * OpeningHours component
 *
 * Displays and allows editing of opening hours for each day of the week.
 *
 * @param {Object} props - Component props
 * @param {Array} props.openingHours - Array of opening hours objects
 * @param {boolean} props.editingHours - Flag indicating if the hours are being edited
 * @param {Function} props.handleHoursChange - Function to handle changes to the hours
 * @param {Function} props.handleToggleDay - Function to handle toggling the open/closed status of a day
 * @param {Function} props.saveHours - Function to save the edited hours
 * @returns {JSX.Element} The OpeningHours component
 */
const OpeningHours = ({openingHours, editingHours, handleHoursChange, handleToggleDay, saveHours}) => {
    return (
        <div className={styles.hoursContainer}>
            <div className={styles.hoursTableContainer}>
                <table className={styles.hoursTable}>
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th>Status</th>
                        <th>Opening Time</th>
                        <th>Closing Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(openingHours) && openingHours.map((hours) => (
                        <tr key={hours.day}>
                            <td className={styles.dayCell}>
                                <span className={styles.dayName}>{hours.day}</span>
                            </td>
                            <td>
                                {editingHours ? (
                                    <div className={styles.statusToggle}>
                                        <label className={styles.toggleSwitch}>
                                            <input
                                                type="checkbox"
                                                checked={hours.isOpen}
                                                onChange={() => handleToggleDay(hours.dayId)}
                                            />
                                            <span className={styles.toggleSlider}></span>
                                        </label>
                                        <span className={styles.toggleLabel}>{hours.isOpen ? 'Open' : 'Closed'}</span>
                                    </div>
                                ) : (
                                    <span className={`${styles.statusIndicator} ${hours.isOpen ? styles.statusOpen : styles.statusClosed}`}>
                      {hours.isOpen ? 'Open' : 'Closed'}
                    </span>
                                )}
                            </td>
                            <td>
                                {editingHours ? (
                                    <div className={styles.timeInputWrapper}>
                                        <input
                                            type="time"
                                            className={`${styles.timeInput} ${!hours.isOpen ? styles.disabled : ''}`}
                                            value={hours.startTime}
                                            disabled={!hours.isOpen}
                                            onChange={(e) => handleHoursChange(hours.dayId, 'startTime', e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <span className={styles.timeDisplay}>{hours.startTime}</span>
                                )}
                            </td>
                            <td>
                                {editingHours ? (
                                    <div className={styles.timeInputWrapper}>
                                        <input
                                            type="time"
                                            className={`${styles.timeInput} ${!hours.isOpen ? styles.disabled : ''}`}
                                            value={hours.endTime}
                                            disabled={!hours.isOpen}
                                            onChange={(e) => handleHoursChange(hours.dayId, 'endTime', e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <span className={styles.timeDisplay}>{hours.endTime}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editingHours && (
                <div className={styles.saveButtonContainer}>
                    <button className={styles.saveButton} onClick={saveHours}>
                        <span className={styles.saveIcon}>💾</span>
                        <span>Save Hours</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default OpeningHours;