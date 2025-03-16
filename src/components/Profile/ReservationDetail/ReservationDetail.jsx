import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import styles from './ReservationDetail.module.css';

/**
 * ReservationDetail component - displays details for a single reservation
 */
const ReservationDetail = ({ reservation, onEdit }) => {
    if (!reservation) return null;

    return (
        <>
            <div className={styles.reservationField} style={{ marginBottom: '10px' }}>
                <span className={styles.fieldLabel}>ID</span>
                <span className={styles.fieldValue}>{reservation.id}</span>
            </div>

            <div className={styles.reservationGrid}>
                <div className={styles.reservationField}>
                    <span className={styles.fieldLabel}>Date</span>
                    <span className={styles.fieldValue}>{reservation.date}</span>
                </div>
                <div className={styles.reservationField}>
                    <span className={styles.fieldLabel}>Time</span>
                    <span className={styles.fieldValue}>
                        {reservation.startTime} - {reservation.endTime}
                    </span>
                </div>
                <div className={styles.reservationField}>
                    <span className={styles.fieldLabel}>People</span>
                    <span className={styles.fieldValue}>{reservation.people} people</span>
                </div>
                <div className={styles.reservationField}>
                    <span className={styles.fieldLabel}>Status</span>
                    <span className={styles.fieldValue}>
                        <StatusBadge status={reservation.status || "Confirmed"} />
                    </span>
                </div>
            </div>


            {reservation.status !== "Cancelled" && (
                <div className={styles.modifyOptions} style={{ marginTop: '15px' }}>
                    <h4 style={{ marginBottom: '8px', fontSize: '15px' }}>Modify Reservation</h4>
                    <p style={{
                        color: '#666',
                        fontSize: '13px',
                        marginBottom: '10px'
                    }}>
                        Need to make changes? You can modify your reservation.
                    </p>
                </div>
            )}
        </>
    );
};

export default ReservationDetail;