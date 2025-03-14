import React, { useState } from "react";

const MyReservations = ({ handleManage, handleCancel, reservations, upcomingReservation, refreshUpcomingReservation, updateReseravation }) => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeReservation, setActiveReservation] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    people: 0
  });

  // Handler for the manage button
  const onManageClick = (id) => {
    const reservation = id === upcomingReservation?.id 
      ? upcomingReservation 
      : reservations.find(res => res.id === id);
    
    setActiveReservation(reservation);
    setShowManageModal(true);
  };

  // Handler for closing manage modal
  const closeManageModal = () => {
    setShowManageModal(false);
  };

  // Format date from MM/DD/YYYY to YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
      // Reorder from MM/DD/YYYY to YYYY-MM-DD
      return `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
    }
    return dateString; // Return original if format doesn't match
  };

  // Convert 12-hour time format to 24-hour format
  const convertTo24Hour = (timeString) => {
    if (!timeString) return "";
    
    // Remove seconds part if present
    const timePart = timeString.replace(/:\d{2}\s/, " ");
    
    const [time, modifier] = timePart.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Handler for opening edit modal
  const openEditModal = () => {
    setEditFormData({
      date: formatDateForInput(activeReservation.date),
      startTime: convertTo24Hour(activeReservation.startTime),
      endTime: convertTo24Hour(activeReservation.endTime),
      people: activeReservation.people
    });
    setShowManageModal(false);
    setShowEditModal(true);
  };

  // Handler for closing edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setShowManageModal(true);
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Validate date format (YYYY-MM-DD)
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  // Validate time format (24-hour clock)
  const isValidTime = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
  };

  // Convert date from YYYY-MM-DD to MM/DD/YYYY
  const formatDateForStorage = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      // Reorder from YYYY-MM-DD to MM/DD/YYYY
      return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
    }
    return dateString; // Return original if format doesn't match
  };

  // Convert 24-hour time format to 12-hour format
  const convertTo12Hour = (timeString) => {
    if (!timeString) return "";
    
    const [hourStr, minuteStr] = timeString.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    
    return `${hour}:${minute}:00 ${ampm}`;
  };

  // Handler for submitting the edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!isValidDate(editFormData.date)) {
      alert("Please enter a valid date in YYYY-MM-DD format");
      return;
    }
    
    if (!isValidTime(editFormData.startTime) || !isValidTime(editFormData.endTime)) {
      alert("Please enter valid times in 24-hour format (HH:MM)");
      return;
    }
    
    const formattedDate = formatDateForStorage(editFormData.date);
    const formattedStartTime = convertTo12Hour(editFormData.startTime);
    const formattedEndTime = convertTo12Hour(editFormData.endTime);
    
    const updatedReseravation = {
      ...activeReservation,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      people: parseInt(editFormData.people)
    };
    
    console.log("Saving updated reservation:", updatedReseravation);
    
    await updateReseravation(updatedReseravation);
    setShowEditModal(false);
    
    await refreshUpcomingReservation();
    
    setActiveReservation(updatedReseravation);
    setShowManageModal(true);
  };

  const onCancelClick = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancellation = async (id) => {    
    await handleCancel(id);
    await refreshUpcomingReservation();
    setShowCancelConfirmation(false);
    setShowManageModal(false);
  };

  const cancelCancellation = () => {
    setShowCancelConfirmation(false);
  };

  return (
    <div className="content">
      <div className="content-header">
        <h2>My Reservations</h2>
      </div>

      {upcomingReservation ? (
        <div className="card upcoming-reservation">
          <div className="card-header">
            <h3>Upcoming Reservation</h3>
          </div>
          <div className="card-body">
            <div className="reservation-grid">
              <div className="reservation-field">
                <span className="field-label">Reservation ID</span>
                <span className="field-value">{upcomingReservation.id}</span>
              </div>
              <div className="reservation-field">
                <span className="field-label">Date</span>
                <span className="field-value">{upcomingReservation.date}</span>
              </div>
              <div className="reservation-field">
                <span className="field-label">Time</span>
                <span className="field-value">
                  {upcomingReservation.startTime} - {upcomingReservation.endTime}
                </span>
              </div>
              <div className="reservation-field">
                <span className="field-label">People</span>
                <span className="field-value">{upcomingReservation.people} people</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="btn-primary"
                onClick={() => onManageClick(upcomingReservation.id)}
              >
                Manage Reservation
              </button>
              <button className="btn-secondary" onClick={onCancelClick}>
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card upcoming-reservation">
          <div className="card-header">
            <h3>No Upcoming Reservations</h3>
          </div>
          <div className="card-body">
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
              You don't have any upcoming reservations.
            </p>
          </div>
        </div>
      )}

      {/* Manage Reservation Modal */}
      {showManageModal && activeReservation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Reservation Details - #{activeReservation.id}</h3>
            </div>
            <div className="modal-body">
              <div className="reservation-grid">
                <div className="reservation-field">
                  <span className="field-label">Date</span>
                  <span className="field-value">{activeReservation.date}</span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Time</span>
                  <span className="field-value">
                    {activeReservation.startTime} - {activeReservation.endTime}
                  </span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">People</span>
                  <span className="field-value">{activeReservation.people} people</span>
                </div>
                <div className="reservation-field">
                  <span className="field-label">Status</span>
                  <span className="field-value" style={{ 
                    color: activeReservation.status === "Cancelled" ? "#e74c3c" : "#4CAF50",
                    fontWeight: "500"
                  }}>
                    {activeReservation.status || "Confirmed"}
                  </span>
                </div>
              </div>

              {activeReservation.specialRequests && (
                <div className="special-requests" style={{ marginTop: '20px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Special Requests</h4>
                  <p style={{ 
                    padding: '15px', 
                    backgroundColor: '#f8f8f8', 
                    borderRadius: '8px',
                    color: '#555',
                    lineHeight: '1.5'
                  }}>
                    {activeReservation.specialRequests}
                  </p>
                </div>
              )}

              {activeReservation.status !== "Cancelled" && (
                <div className="modify-options" style={{ marginTop: '20px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Modify Reservation</h4>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    marginBottom: '15px' 
                  }}>
                    Need to make changes? You can modify your reservation.
                  </p>
                </div>
              )}
            </div>
            <div className="modal-actions">
              {activeReservation.status !== "Cancelled" && (
                <button className="btn-primary" onClick={openEditModal}>
                  Edit
                </button>
              )}
              <button className="btn-primary" onClick={closeManageModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reservation Modal */}
      {showEditModal && activeReservation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Reservation - #{activeReservation.id}</h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="date">Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleInputChange}
                    required
                    pattern="\d{4}-\d{2}-\d{2}"
                  />
                  <small>Format: YYYY-MM-DD (e.g., 2025-03-13)</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="startTime">Start Time (24-hour format)</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={editFormData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                  <small>24-hour format (e.g., 18:30)</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="endTime">End Time (24-hour format)</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={editFormData.endTime}
                    onChange={handleInputChange}
                    required
                  />
                  <small>24-hour format (e.g., 20:00)</small>
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button type="button" className="btn-secondary" onClick={closeEditModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Cancellation</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel your reservation for {upcomingReservation.date} at {upcomingReservation.startTime}?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={cancelCancellation}>
                Keep My Reservation
              </button>
              <button className="btn-secondary" onClick={() => confirmCancellation(upcomingReservation.id)}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card history-card">
        <div className="card-header">
          <h3>Reservation History</h3>
        </div>
        <div className="card-body">
          {reservations.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>People</th>
                  <th>Status</th>
                  <th>Manage Reservations</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.date}</td>
                    <td>
                      {res.startTime} - {res.endTime}
                    </td>
                    <td>{res.people} people</td>
                    <td style={{ 
                      color: res.status === "Cancelled" ? "#e74c3c" : "#4CAF50",
                      fontWeight: "500"
                    }}>
                      {res.status || "Completed"}
                    </td>
                    <td>
                      <button
                        className="manage-btn-small"
                        onClick={() => onManageClick(res.id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '15px' }}>
              No reservation history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;