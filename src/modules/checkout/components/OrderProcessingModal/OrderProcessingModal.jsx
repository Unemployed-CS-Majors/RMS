import React, {useEffect, useState} from 'react';
import {FiCheckCircle, FiCreditCard} from 'react-icons/fi';
import styles from './OrderProcessingModal.module.css';

/**
 * OrderProcessingModal component displays a modal with the order processing status.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Flag indicating if the modal is open.
 * @param {string} props.orderStatus - The current status of the order ('processing', 'success', 'error').
 * @param {string} props.paymentMethod - The payment method used for the order ('online' or other).
 * @param {string} props.redirectUrl - The URL to redirect to after successful order processing.
 * @param {Function} props.onClose - Function to handle closing the modal.
 * @returns {JSX.Element|null} The rendered OrderProcessingModal component or null if not open.
 */
const OrderProcessingModal = ({
                                  isOpen,
                                  orderStatus,
                                  paymentMethod,
                                  redirectUrl,
                                  onClose
                              }) => {
    const [countdown, setCountdown] = useState(5);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        console.log(redirectUrl);
        console.log(orderStatus);

        if (isOpen && orderStatus === 'processing') {
            // Animate the progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                setProgressValue(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isOpen, orderStatus]);

    useEffect(() => {
        if (orderStatus === 'success' && paymentMethod === 'online') {
            // Start countdown for redirect
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.location.href = redirectUrl;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [orderStatus, paymentMethod, redirectUrl]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {orderStatus === 'processing' && (
                    <>
                        <div className={styles.loaderContainer}>
                            <div className={styles.spinner}></div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{width: `${progressValue}%`}}
                                ></div>
                            </div>
                        </div>
                        <h2 className={styles.modalTitle}>Processing Your Order</h2>
                        <p className={styles.modalText}>
                            Please wait while we process your order...
                        </p>
                    </>
                )}

                {orderStatus === 'success' && paymentMethod === 'online' && (
                    <>
                        <div className={styles.successIcon}>
                            <FiCheckCircle/>
                        </div>
                        <h2 className={styles.modalTitle}>Order Confirmed!</h2>
                        <p className={styles.modalText}>
                            Redirecting you to our payment partner to complete your purchase.
                        </p>
                        <div className={styles.redirectContainer}>
                            <FiCreditCard className={styles.redirectIcon}/>
                            <div className={styles.countdownWrapper}>
                                <div className={styles.countdownRing}>
                                    <svg viewBox="0 0 36 36" className={styles.countdownCircle}>
                                        <path
                                            className={styles.countdownBg}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className={styles.countdownProgress}
                                            strokeDasharray={`${(countdown / 5) * 100}, 100`}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <span className={styles.countdownNumber}>{countdown}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {orderStatus === 'success' && paymentMethod !== 'online' && (
                    <>
                        <div className={styles.successIcon}>
                            <FiCheckCircle/>
                        </div>
                        <h2 className={styles.modalTitle}>Order Successful!</h2>
                        <p className={styles.modalText}>
                            Your order has been placed successfully. You can view your order details in your profile.
                        </p>
                        <button className={styles.viewOrderButton} onClick={onClose}>
                            View Order
                        </button>
                    </>
                )}

                {orderStatus === 'error' && (
                    <>
                        <div className={styles.errorIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                                    fill="currentColor"/>
                                <path
                                    d="M13.5 7.5C13.5 8.32843 12.8284 9 12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5Z"
                                    fill="currentColor"/>
                                <path
                                    d="M12 10.5C12.4142 10.5 12.75 10.8358 12.75 11.25V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V11.25C11.25 10.8358 11.5858 10.5 12 10.5Z"
                                    fill="currentColor"/>
                            </svg>
                        </div>
                        <h2 className={styles.modalTitle}>Order Failed</h2>
                        <p className={styles.modalText}>
                            We couldn't process your order. Please try again or contact customer support.
                        </p>
                        <button className={styles.tryAgainButton} onClick={onClose}>
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderProcessingModal;