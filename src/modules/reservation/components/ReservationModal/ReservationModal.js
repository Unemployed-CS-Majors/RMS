import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReservationModal.module.css';

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