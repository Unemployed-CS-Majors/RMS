import React, {useEffect, useState} from "react";
import Modal from "../../components/Modal/Modal";
import ReservationDetail from "../../components/ReservationDetail/ReservationDetail";
import UpcomingReservation from "../../components/UpcominReservation/UpcomingReservation";
import ReservationEditForm from "../../components/ReservationEditForm/ReservationEditForm";
import ReservationHistory from "../../components/ReservationHistory/ReservationHistory";
import layoutStyles from '../../components/ProfileLayout.module.css';
import {convertTo12Hour, convertTo24Hour, formatDateForInput, formatDateForStorage} from "../../../shared/utils/dateUtils";

/**
 * Main MyReservations component
 */
const MyReservations = ({
                            handleManage,
                            handleCancel,
                            reservations,
                            upcomingReservation,
                            refreshUpcomingReservation,
                            updateReservation,
                            initialSelectedId,
                            clearSelectedReservation
                        }) => {
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

    // Use initialSelectedId to automatically open reservation details if provided
    useEffect(() => {
        if (initialSelectedId) {
            const reservation = reservations.find(res => res.id === initialSelectedId) ||
                (upcomingReservation && upcomingReservation.id === initialSelectedId ? upcomingReservation : null);

            if (reservation) {
                setActiveReservation(reservation);
                setShowManageModal(true);
            }
        }
    }, [initialSelectedId, reservations, upcomingReservation]);

    // Handler for the manage button
    const onManageClick = (id) => {
        const reservation = id === upcomingReservation?.id
            ? upcomingReservation
            : reservations.find(res => res.id === id);

        setActiveReservation(reservation);
        setShowManageModal(true);

        // Update URL via parent component
        handleManage(id);
    };

    // Handler for closing manage modal
    const closeManageModal = () => {
        setShowManageModal(false);
        clearSelectedReservation();
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

    // Handler for submitting the edit form
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = formatDateForStorage(editFormData.date);
        const formattedStartTime = convertTo12Hour(editFormData.startTime);
        const formattedEndTime = convertTo12Hour(editFormData.endTime);

        const updatedReservation = {
            ...activeReservation,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            people: parseInt(editFormData.people)
        };

        console.log("Saving updated reservation:", updatedReservation);

        await updateReservation(updatedReservation);
        setShowEditModal(false);

        await refreshUpcomingReservation();

        setActiveReservation(updatedReservation);
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
        clearSelectedReservation();
    };

    const cancelCancellation = () => {
        setShowCancelConfirmation(false);
    };

    return (
        <div className={layoutStyles.content}>
            <div className={layoutStyles.contentHeader}>
                <h2>My Reservations</h2>
            </div>

            {/* Upcoming Reservation */}
            <UpcomingReservation
                reservation={upcomingReservation}
                onManage={onManageClick}
                onCancel={() => {
                    onCancelClick();
                    setActiveReservation(upcomingReservation);
                }}
            />

            {/* Reservation History */}
            <ReservationHistory
                reservations={reservations}
                onManage={onManageClick}
            />

            {/* Manage Reservation Modal */}
            <Modal
                isOpen={showManageModal}
                onClose={closeManageModal}
                title={`Reservation Details`}
                actions={
                    activeReservation?.status !== "Cancelled" ? (
                        <>
                            <button className={layoutStyles.btnPrimary} onClick={openEditModal}>
                                Edit
                            </button>
                            <button className={layoutStyles.btnSecondary} onClick={onCancelClick}>
                                Cancel Reservation
                            </button>
                        </>
                    ) : (
                        <button className={layoutStyles.btnPrimary} onClick={closeManageModal}>
                            Close
                        </button>
                    )
                }
            >
                {activeReservation && <ReservationDetail reservation={activeReservation} />}
            </Modal>

            {/* Edit Reservation Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={closeEditModal}
                title="Edit Reservation"
            >
                <ReservationEditForm
                    formData={editFormData}
                    onChange={handleInputChange}
                    onSubmit={handleEditSubmit}
                    onCancel={closeEditModal}
                />
            </Modal>

            {/* Cancellation Confirmation Modal */}
            <Modal
                isOpen={showCancelConfirmation}
                onClose={cancelCancellation}
                title="Confirm Cancellation"
                actions={
                    <>
                        <button className={layoutStyles.btnSecondary} onClick={() => confirmCancellation(activeReservation?.id)}>
                            Yes, Cancel
                        </button>
                        <button className={layoutStyles.btnPrimary} onClick={cancelCancellation}>
                            Keep My Reservation
                        </button>
                    </>
                }
            >
                {upcomingReservation && (
                    <>
                        <p>Are you sure you want to cancel your reservation for {upcomingReservation.date}?</p>
                        <p>This action cannot be undone.</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default MyReservations;