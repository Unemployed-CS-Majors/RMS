import StatusBadge from "./StatusBadge";
import {formatId} from "../../utils/dateUtils";

/**
 * ReservationHistory component displays past reservations in a table
 */
const ReservationHistory = ({reservations, onManage}) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="card history-card">
            <div className="card-header">
                <h3>Reservation History</h3>
            </div>
            <div className="card-body">
                {reservations.length > 0 ? (
                    <div className="history-table-container">
                        <table className="history-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>People</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reservations.map((res) => (
                                <tr key={res.id}>
                                    <td>{formatId(res.id, isMobile)}</td>
                                    <td>{res.date}</td>
                                    <td>
                                        {res.startTime.substring(0, 5)} - {res.endTime.substring(0, 5)}
                                    </td>
                                    <td>{res.people}</td>
                                    <td>
                                        <StatusBadge status={res.status || "Completed"}/>
                                    </td>
                                    <td>
                                        <button
                                            className="manage-btn-small"
                                            onClick={() => onManage(res.id)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{textAlign: 'center', color: '#666', fontSize: '15px'}}>
                        No reservation history found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ReservationHistory;