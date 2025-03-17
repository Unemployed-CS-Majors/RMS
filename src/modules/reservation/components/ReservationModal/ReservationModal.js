import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReservationModal.module.css';

/**
 * ReservationModal component
 *
 * Displays a modal for reserving a table with specified details.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Flag to indicate if the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} props.tableId - The ID of the table to reserve
 * @param {Date} props.date - The date of the reservation
 * @param {Object} props.startTime - The start time of the reservation
 * @param {string} props.startTime.hour - The hour of the start time
 * @param {string} props.startTime.minute - The minute of the start time
 * @param {string} props.startTime.ampm - The AM/PM of the start time
 * @param {Object} props.endTime - The end time of the reservation
 * @param {string} props.endTime.hour - The hour of the end time
 * @param {string} props.endTime.minute - The minute of the end time
 * @param {string} props.endTime.ampm - The AM/PM of the end time
 * @param {number|string} props.people - The number of people for the reservation
 * @param {Function} props.onConfirm - Function to call when the reservation is confirmed
 * @param {boolean} [props.loading=false] - Flag to indicate if the reservation is being processed
 * @returns {JSX.Element|null} The ReservationModal component
 */
const ReservationModal = ({
                              isOpen,
                              onClose,
                              tableId,
                              date,
                              startTime,
                              endTime,
                              people,
                              onConfirm,
                              loading
                          }) => {
    if (!isOpen) return null;

    // Format date and time for display
    const formatDate = (date) => {
        if (!date || !(date instanceof Date) || isNaN(date)) return 'Not specified';
        return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (time) => {
        if (!time || !time.hour || !time.minute || !time.ampm) return 'Not specified';
        return `${time.hour}:${time.minute} ${time.ampm}`;
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(tableId);
        }
    };

    // Prevent clicks inside the modal from closing it
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={handleModalClick}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Reserve Table #{tableId}</h3>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Date:</span>
                    <span className={styles.infoValue}>{formatDate(date)}</span>
                </div>

                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Time:</span>
                    <span className={styles.infoValue}>{formatTime(startTime)} to {formatTime(endTime)}</span>
                </div>

                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Party Size:</span>
                    <span className={styles.infoValue}>{people || 'Not specified'} {people && people !== 1 ? 'people' : 'person'}</span>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                    <button
                        className={styles.reserveButton}
                        onClick={handleConfirm}
                        disabled={loading || !people || !date}
                    >
                        {loading ? 'Processing...' : 'Confirm Reservation'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ReservationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    tableId: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    startTime: PropTypes.shape({
        hour: PropTypes.string,
        minute: PropTypes.string,
        ampm: PropTypes.string
    }),
    endTime: PropTypes.shape({
        hour: PropTypes.string,
        minute: PropTypes.string,
        ampm: PropTypes.string
    }),
    people: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onConfirm: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

ReservationModal.defaultProps = {
    loading: false
};

export default ReservationModal;