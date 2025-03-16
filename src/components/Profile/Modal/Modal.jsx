import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';

/**
 * Reusable Modal component with animations
 */
const Modal = ({ isOpen, onClose, title, children, actions, maxWidth = '700px' }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Handle modal open/close animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Small delay to ensure visibility before animation starts
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Wait for the close animation to finish before removing from DOM
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close modal when pressing escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        // Lock body scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isVisible) return null;

    // Handle click outside of modal content to close
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`${styles.modalOverlay} ${isAnimating ? styles.modalOverlayVisible : ''}`}
            onClick={handleOverlayClick}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`${styles.modal} ${isAnimating ? styles.modalVisible : ''}`}
                style={{ maxWidth: maxWidth }}
            >
                <div className={styles.modalHeader}>
                    <h3>{title}</h3>
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                {actions && (
                    <div className={styles.modalActions}>
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;