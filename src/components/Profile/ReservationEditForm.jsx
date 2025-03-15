import React from 'react';
import { isValidDate, isValidTime } from '../../utils/dateUtils';

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
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="edit-input"
                    value={formData.date}
                    onChange={onChange}
                    required
                />
                <small>Format: YYYY-MM-DD</small>
            </div>

            <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="edit-input"
                    value={formData.startTime}
                    onChange={onChange}
                    required
                />
                <small>24-hour format (e.g., 18:30)</small>
            </div>

            <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="edit-input"
                    value={formData.endTime}
                    onChange={onChange}
                    required
                />
                <small>24-hour format (e.g., 20:00)</small>
            </div>

            <div className="modal-actions">
                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ReservationEditForm;