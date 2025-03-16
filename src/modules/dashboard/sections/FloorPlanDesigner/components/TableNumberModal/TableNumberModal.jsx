import React, { useState } from 'react';
import styles from './TableNumberModal.module.css';

const TableNumberModal = ({ onConfirm, onCancel, position }) => {
    const [tableNum, setTableNum] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the input - ensure it's not empty and is a valid number
        if (!tableNum.trim()) {
            setError('Please enter a table number');
            return;
        }

        // Clear any previous errors
        setError('');

        // Call the onConfirm callback with the table number
        onConfirm(tableNum.trim());
    };

    // Position the modal near the click position
    const modalStyle = {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return (
        <div className={styles.tableModalBackdrop}>
            <div className={styles.tableNumberModal} style={modalStyle}>
                <div className={styles.modalHeader}>
                    <h3>Add New Table</h3>
                    <button className={styles.closeButton} onClick={onCancel}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <label htmlFor="tableNum">Table Number:</label>
                        <input
                            type="text"
                            id="tableNum"
                            value={tableNum}
                            onChange={(e) => setTableNum(e.target.value)}
                            placeholder="Enter table number"
                            autoFocus
                        />
                        {error && <div className={styles.errorMessage}>{error}</div>}
                    </div>
                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.confirmButton}
                        >
                            Add Table
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TableNumberModal;