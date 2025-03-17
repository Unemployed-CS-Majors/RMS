import React from 'react';
import styles from './PendingReservations.module.css';

/**
 * PendingReservations component
 *
 * Displays a list of pending reservations with options to approve or reject each reservation.
 *
 * @param {Object} props - Component props
 * @param {Array} props.pendingReservations - Array of pending reservation objects
 * @param {Function} props.handleApproveReservation - Function to handle approving a reservation
 * @param {Function} props.handleRejectReservation - Function to handle rejecting a reservation
 * @returns {JSX.Element} The PendingReservations component
 */
const PendingReservations = ({pendingReservations, handleApproveReservation, handleRejectReservation}) => {
    return (
        <div className={styles.reservationContainer}>
            {pendingReservations.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📋</div>
                    <p className={styles.emptyText}>No pending reservations</p>
                </div>
            ) : (
                <div className={styles.reservationGridDashboard}>
                    {pendingReservations.map(reservation => (
                        <div key={reservation.id} className={styles.reservationCard}>
                            <div className={styles.reservationContent}>
                                <div className={styles.reservationInfo}>
                                    <div className={styles.reservationHeader}>
                                        <h3 className={styles.guestName}>{reservation.fullName}</h3>
                                        <span className={styles.guestCount}>{reservation.people} guests</span>
                                    </div>

                                    <div className={styles.tableBadge}>
                                        {reservation.tableNum}
                                    </div>

                                    <div className={styles.reservationDetails}>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailIcon}>🗓️</span>
                                            <span className={styles.detailText}>{reservation.date}</span>
                                        </div>

                                        <div className={styles.detailItem}>
                                            <span className={styles.detailIcon}>⏰</span>
                                            <span
                                                className={styles.detailText}>{reservation.startTime} - {reservation.endTime}</span>
                                        </div>

                                        <div className={styles.detailItem}>
                                            <span className={styles.detailIcon}>📱</span>
                                            <span className={styles.detailText}>{reservation.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actionButtons}>
                                    <button
                                        className={styles.approveButton}
                                        onClick={() => handleApproveReservation(reservation.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={styles.rejectButton}
                                        onClick={() => handleRejectReservation(reservation.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingReservations;