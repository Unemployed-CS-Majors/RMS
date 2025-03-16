import React, { useContext } from 'react';
import { FiCheck } from 'react-icons/fi';
import {
    MdCreditCard,
    MdOutlineDone,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
    MdOutlineShoppingBag,
    MdOutlineStore
} from 'react-icons/md';
import styles from './PaymentMethod.module.css';
import { AuthContext } from "../../../contexts/AuthContext";

const PaymentMethod = ({
                           isOpen,
                           toggleContent,
                           isCompleted,
                           collectionMethod,
                           paymentMethod,
                           handlePaymentMethodChange
                       }) => {
    const { config } = useContext(AuthContext);

    // Extract payment-related feature flags
    const isFeatureEnabled = (featureName) => {
        if (!config?.features || !Array.isArray(config.features)) return false;
        const feature = config.features.find(f => f.name === featureName);
        return feature ? feature.enabled : false;
    };

    const isOnlinePaymentEnabled = isFeatureEnabled('online_payment');
    const isInStorePaymentEnabled = isFeatureEnabled('in_store_payment');
    const isCashPaymentEnabled = isFeatureEnabled('cash_payment');

    return (
        <div className={styles.step}>
            <div
                className={styles.stepHeader}
                onClick={() => toggleContent(3)}
            >
                <div className={`${styles.stepIcon} ${isCompleted ? styles.completed : ''}`}>
                    {isCompleted ? <MdOutlineDone /> : <MdCreditCard />}
                </div>
                <h3 className={styles.stepTitle}>Payment Method</h3>
                <button className={styles.toggleButton}>
                    {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </button>
            </div>

            <div className={`${styles.stepContent} ${isOpen ? styles.open : ''}`}>
                <div className={styles.paymentMethod}>
                    {collectionMethod === 'pickup' && (
                        <div className={styles.radioOptions}>
                            {isOnlinePaymentEnabled || isInStorePaymentEnabled ? (
                                <>
                                    {isOnlinePaymentEnabled && (
                                        <div
                                            className={`${styles.radioCard} ${paymentMethod === 'online' ? styles.selected : ''}`}
                                            onClick={() => handlePaymentMethodChange('online')}
                                        >
                                            <MdCreditCard className={styles.optionIcon} />
                                            <div className={styles.optionInfo}>
                                                <span className={styles.optionTitle}>Online Payment</span>
                                                <span className={styles.optionDesc}>Pay now with credit/debit card</span>
                                            </div>
                                            <div className={styles.radioIndicator}>
                                                {paymentMethod === 'online' && <FiCheck />}
                                            </div>
                                        </div>
                                    )}

                                    {isInStorePaymentEnabled && (
                                        <div
                                            className={`${styles.radioCard} ${paymentMethod === 'in_store' ? styles.selected : ''}`}
                                            onClick={() => handlePaymentMethodChange('in_store')}
                                        >
                                            <MdOutlineStore className={styles.optionIcon} />
                                            <div className={styles.optionInfo}>
                                                <span className={styles.optionTitle}>In-store Payment</span>
                                                <span className={styles.optionDesc}>Pay when you collect your order</span>
                                            </div>
                                            <div className={styles.radioIndicator}>
                                                {paymentMethod === 'in_store' && <FiCheck />}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={styles.noPaymentMethods}>
                                    <p>Sorry, we currently don't have any payment methods available for pickup orders.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {collectionMethod === 'home_delivery' && (
                        <div className={styles.radioOptions}>
                            {isOnlinePaymentEnabled || isCashPaymentEnabled ? (
                                <>
                                    {isOnlinePaymentEnabled && (
                                        <div
                                            className={`${styles.radioCard} ${paymentMethod === 'online' ? styles.selected : ''}`}
                                            onClick={() => handlePaymentMethodChange('online')}
                                        >
                                            <MdCreditCard className={styles.optionIcon} />
                                            <div className={styles.optionInfo}>
                                                <span className={styles.optionTitle}>Online Payment</span>
                                                <span className={styles.optionDesc}>Pay now with credit/debit card</span>
                                            </div>
                                            <div className={styles.radioIndicator}>
                                                {paymentMethod === 'online' && <FiCheck />}
                                            </div>
                                        </div>
                                    )}

                                    {isCashPaymentEnabled && (
                                        <div
                                            className={`${styles.radioCard} ${paymentMethod === 'cash_on_delivery' ? styles.selected : ''}`}
                                            onClick={() => handlePaymentMethodChange('cash_on_delivery')}
                                        >
                                            <MdOutlineShoppingBag className={styles.optionIcon} />
                                            <div className={styles.optionInfo}>
                                                <span className={styles.optionTitle}>Cash on Delivery</span>
                                                <span className={styles.optionDesc}>Pay when your order arrives</span>
                                            </div>
                                            <div className={styles.radioIndicator}>
                                                {paymentMethod === 'cash_on_delivery' && <FiCheck />}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={styles.noPaymentMethods}>
                                    <p>Sorry, we currently don't have any payment methods available for delivery orders.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;