import React from 'react';
import layoutStyles from '../ProfileLayout.module.css';
import styles from './UpcomingReservation.module.css';
import reservationStyles from '../ReservationDetail/ReservationDetail.module.css';

/**
 * UpcomingReservation component displays the next upcoming reservation
 */
const UpcomingReservation = ({reservation, onManage, onCancel}) => {
    if (!reservation) {
        return (
            <div className={`${layoutStyles.card} ${styles.upcomingReservation}`}>
                <div className={layoutStyles.cardHeader}>
                    <h3>No Upcoming Reservations</h3>
                </div>
                <div className={layoutStyles.cardBody}>
                    <p style={{textAlign: 'center', color: '#666', fontSize: '15px'}}>
                        You don't have any upcoming reservations.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${layoutStyles.card} ${styles.upcomingReservation}`}>
            <div className={layoutStyles.cardHeader}>
                <h3>Upcoming Reservation</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                <div className={reservationStyles.reservationGrid}>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Reservation ID</span>
                        <span className={reservationStyles.fieldValue}>{reservation.id}</span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Date</span>
                        <span className={reservationStyles.fieldValue}>{reservation.date}</span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Time</span>
                        <span className={reservationStyles.fieldValue}>
                            {reservation.startTime} - {reservation.endTime}
                        </span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>People</span>
                        <span className={reservationStyles.fieldValue}>{reservation.people} people</span>
                    </div>
                </div>
                <div className={layoutStyles.cardActions}>
                    <button
                        className={layoutStyles.btnPrimary}
                        onClick={() => onManage(reservation.id)}
                    >
                        Manage Reservation
                    </button>
                    <button className={layoutStyles.btnSecondary} onClick={onCancel}>
                        Cancel Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingReservation;