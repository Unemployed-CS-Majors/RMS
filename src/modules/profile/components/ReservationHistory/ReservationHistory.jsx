import React from 'react';
import StatusBadge from "../StatusBadge/StatusBadge";
import {formatId} from "../../../shared/utils/dateUtils";
import layoutStyles from '../ProfileLayout.module.css';
import tableStyles from '../TableComponents.module.css';

/**
 * ReservationHistory component displays past reservations in a table
 */
const ReservationHistory = ({reservations, onManage}) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className={layoutStyles.card}>
            <div className={layoutStyles.cardHeader}>
                <h3>Reservation History</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                {reservations.length > 0 ? (
                    <div className={tableStyles.historyTableContainer}>
                        <table className={tableStyles.historyTable}>
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
                                            className={tableStyles.manageBtnSmall}
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