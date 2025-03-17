import React, { useEffect, useRef } from 'react';
import styles from './ElementDetails.module.css';

/**
 * ElementDetails component for displaying and managing details of a selected element
 *
 * @param {Object} props - Component props
 * @param {Object} props.selectedElement - The currently selected element
 * @param {Object} props.elementDetailsPosition - The position of the element details panel
 * @param {Function} props.rotateElement - Function to rotate the selected element
 * @param {Function} props.deleteElement - Function to delete the selected element
 * @param {Function} props.activateTable - Function to activate the selected table element
 * @param {Function} props.deactivateTable - Function to deactivate the selected table element
 * @param {Function} props.onClose - Function to close the element details panel
 * @returns {JSX.Element} The ElementDetails component
 */
const ElementDetails = ({
                            selectedElement,
                            elementDetailsPosition,
                            rotateElement,
                            deleteElement,
                            activateTable,
                            deactivateTable,
                            onClose
                        }) => {
    const detailsRef = useRef(null);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Ensure the panel stays within viewport bounds
    const adjustPosition = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let xPos = elementDetailsPosition.x;
        let yPos = elementDetailsPosition.y;

        // Assumed panel dimensions - adjust as needed
        const panelWidth = 250;
        const panelHeight = 220;

        // Adjust horizontal position if needed
        if (xPos + panelWidth > windowWidth) {
            xPos = windowWidth - panelWidth - 10;
        }

        // Adjust vertical position if needed
        if (yPos + panelHeight > windowHeight) {
            yPos = windowHeight - panelHeight - 10;
        }

        return { left: xPos, top: yPos };
    };

    return (
        <div
            ref={detailsRef}
            className={styles.elementDetails}
            style={adjustPosition()}
        >
            <div className={styles.elementDetailsHeader}>
                <h3>{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} #{selectedElement.intId}</h3>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>

            <div className={styles.elementDetailsContent}>
                <p>
                    <strong>Position:</strong> (
                    {selectedElement.x !== undefined
                        ? `${Math.round(selectedElement.x)}, ${Math.round(selectedElement.y)}`
                        : `${Math.round(selectedElement.x1)}, ${Math.round(selectedElement.y1)}`}
                    )
                </p>
                <p><strong>Rotation:</strong> {selectedElement.rotation || 0}°</p>

                <div className={styles.elementDetailsActions}>
                    <button
                        className={`${styles.actionButton} ${styles.rotateButton}`}
                        onClick={() => rotateElement(selectedElement)}
                    >
                        <span className={styles.buttonIcon}>↻</span> Rotate
                    </button>

                    <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => deleteElement(selectedElement)}
                    >
                        <span className={styles.buttonIcon}>✕</span> Delete
                    </button>

                    {selectedElement.type === 'table' && (
                        !selectedElement.isActive ? (
                            <button
                                className={`${styles.actionButton} ${styles.activateButton}`}
                                onClick={() => activateTable(selectedElement)}
                            >
                                <span className={styles.buttonIcon}>✓</span> Activate
                            </button>
                        ) : (
                            <button
                                className={`${styles.actionButton} ${styles.deactivateButton}`}
                                onClick={() => deactivateTable(selectedElement)}
                            >
                                <span className={styles.buttonIcon}>✗</span> Deactivate
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ElementDetails;