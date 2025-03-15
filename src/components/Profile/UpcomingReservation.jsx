/**
 * UpcomingReservation component displays the next upcoming reservation
 */
const UpcomingReservation = ({reservation, onManage, onCancel}) => {
    if (!reservation) {
        return (
            <div className="card upcoming-reservation">
                <div className="card-header">
                    <h3>No Upcoming Reservations</h3>
                </div>
                <div className="card-body">
                    <p style={{textAlign: 'center', color: '#666', fontSize: '15px'}}>
                        You don't have any upcoming reservations.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card upcoming-reservation">
            <div className="card-header">
                <h3>Upcoming Reservation</h3>
            </div>
            <div className="card-body">
                <div className="reservation-grid">
                    <div className="reservation-field">
                        <span className="field-label">Reservation ID</span>
                        <span className="field-value">{reservation.id}</span>
                    </div>
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
                </div>
                <div className="card-actions">
                    <button
                        className="btn-primary"
                        onClick={() => onManage(reservation.id)}
                    >
                        Manage Reservation
                    </button>
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancel Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingReservation;