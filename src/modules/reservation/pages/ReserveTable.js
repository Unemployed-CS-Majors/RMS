import React, { useState, useContext } from "react";
import styles from "./ReserveTable.module.css";
import DateTimeForm from "../components/DateTimeForm/DateTimeForm";
import FloorPlan from "../components/FloorPlan/FloorPlan";
import ReservationModal from "../components/ReservationModal/ReservationModal";
import LoginPrompt from "../components/LoginPrompt/LoginPrompt";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { useResponsiveView } from "../hooks/useResponsiveView";
import { useReservationForm } from "../hooks/useReservationForm";

const ReserveTable = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const isMobile = useResponsiveView();

    const {
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        number,
        setNumber,
        freeTables,
        loading,
        error,
        success,
        searchFreeTables,
        createReservation
    } = useReservationForm();

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);

    // Handle table selection - opens the modal
    const handleTableSelect = async (tableId) => {
        // Check if user is authenticated
        if (!isLoggedIn) {
            setError("Please log in to select a table");
            return;
        }

        // Only allow selection of available tables
        const selectedTable = freeTables.find(table => table.id.toString() === tableId);
        if (!selectedTable || !selectedTable.isActive) {
            console.error(`Table ${tableId} is not available for reservation`);
            return;
        }

        setSelectedTableId(tableId);
        setIsModalOpen(true);
    };

    // Process the actual reservation
    const handleConfirmReservation = async () => {
        const success = await createReservation(selectedTableId);
        if (success) {
            setIsModalOpen(false);
        }
    };

    // Close modal handler
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            id="reserve"
            style={{
                padding: isMobile ? '1.5rem 1rem' : '3rem 2rem',
                maxWidth: '1300px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1
                className={styles.pageTitle}
                style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    margin: isMobile ? '0 0 1rem' : '0 0 1.5rem'
                }}
            >
                Interactive Floor Plan
            </h1>

            {error && (
                <div
                    className={styles.errorMessage}
                    style={{fontSize: isMobile ? '0.9rem' : '1rem'}}
                >
                    {error}
                </div>
            )}
            {success && (
                <div
                    className={styles.successMessage}
                    style={{fontSize: isMobile ? '0.9rem' : '1rem'}}
                >
                    {success}
                </div>
            )}

            {!isLoggedIn ? (
                // Show login prompt if user is not authenticated
                <LoginPrompt isMobile={isMobile} />
            ) : (
                // Show reservation UI if user is authenticated
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column-reverse' : 'row',
                        gap: isMobile ? '1.5rem' : '2rem',
                        width: '100%'
                    }}
                >
                    <div className={styles.reserveTableContainer}>
                        <FloorPlan
                            freeTables={freeTables}
                            onTableSelect={handleTableSelect}
                        />
                    </div>
                    <div style={{
                        width: isMobile ? '100%' : '40%'
                    }}>
                        <DateTimeForm
                            date={date}
                            setDate={setDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            endTime={endTime}
                            setEndTime={setEndTime}
                            number={number}
                            setNumber={setNumber}
                            onSearch={searchFreeTables}
                            loading={loading}
                            isMobile={isMobile}
                        />
                    </div>
                </div>
            )}

            <ReservationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                tableId={selectedTableId}
                date={date}
                startTime={startTime}
                endTime={endTime}
                people={number}
                onConfirm={handleConfirmReservation}
                loading={loading}
            />
        </div>
    );
};

export default ReserveTable;