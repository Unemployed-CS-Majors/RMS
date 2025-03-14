import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * ReservationDetail component - displays details for a single reservation
 */
const ReservationDetail = ({ reservation, onEdit }) => {
    if (!reservation) return null;

    return (
        <>
            <div className="reservation-field" style={{ marginBottom: '10px' }}>
                <span className="field-label">ID</span>
                <span className="field-value">{reservation.id}</span>
            </div>

            <div className="reservation-grid">
                <div className="reservation-field">
                    <span className="field-label">Date</span>
                    <span className="field-value">{reservation.date}</span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Time</span>
                    <span className="field-value">
            {reservation.startTime} - {reservation.endTime}
          </span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">People</span>
                    <span className="field-value">{reservation.people} people</span>
                </div>
                <div className="reservation-field">
                    <span className="field-label">Status</span>
                    <span className="field-value">
            <StatusBadge status={reservation.status || "Confirmed"} />
          </span>
                </div>
            </div>


            {reservation.status !== "Cancelled" && (
                <div className="modify-options" style={{ marginTop: '15px' }}>
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