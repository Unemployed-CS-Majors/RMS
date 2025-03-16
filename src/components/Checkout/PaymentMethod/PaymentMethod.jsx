import React from 'react';
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

const PaymentMethod = ({
                           isOpen,
                           toggleContent,
                           isCompleted,
                           collectionMethod,
                           paymentMethod,
                           handlePaymentMethodChange
                       }) => {
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
                        </div>
                    )}

                    {collectionMethod === 'home_delivery' && (
                        <div className={styles.radioOptions}>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;