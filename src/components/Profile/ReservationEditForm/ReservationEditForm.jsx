import React from 'react';
import { isValidDate, isValidTime } from '../../../utils/dateUtils';
import styles from './FormComponents.module.css';
import layoutStyles from '../ProfileLayout.module.css';

/**
 * ReservationEditForm component for editing reservation details
 */
const ReservationEditForm = ({
                                 formData,
                                 onChange,
                                 onSubmit,
                                 onCancel
                             }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!isValidDate(formData.date)) {
            alert("Please enter a valid date in YYYY-MM-DD format");
            return;
        }

        if (!isValidTime(formData.startTime) || !isValidTime(formData.endTime)) {
            alert("Please enter valid times in 24-hour format (HH:MM)");
            return;
        }

        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className={styles.editInput}
                    value={formData.date}
                    onChange={onChange}
                    required
                />
                <small className={styles.inputSmallText}>Format: YYYY-MM-DD</small>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="startTime">Start Time</label>
                <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className={styles.editInput}
                    value={formData.startTime}
                    onChange={onChange}
                    required
                />
                <small className={styles.inputSmallText}>24-hour format (e.g., 18:30)</small>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="endTime">End Time</label>
                <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className={styles.editInput}
                    value={formData.endTime}
                    onChange={onChange}
                    required
                />
                <small className={styles.inputSmallText}>24-hour format (e.g., 20:00)</small>
            </div>

            <div className={styles.modalActions}>
                <button type="submit" className={layoutStyles.btnPrimary}>
                    Save Changes
                </button>
                <button type="button" className={layoutStyles.btnSecondary} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ReservationEditForm;