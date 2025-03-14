import React, { useEffect } from 'react';

/**
 * Reusable Modal component
 */
const Modal = ({ isOpen, onClose, title, children, actions, maxWidth }) => {
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

    if (!isOpen) return null;

    // Handle click outside of modal content to close
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick} aria-modal="true" role="dialog">
            <div className="modal" style={{ maxWidth: maxWidth || '500px' }}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {actions && (
                    <div className="modal-actions">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;