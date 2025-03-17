import React from 'react';
import {MdOutlineDone, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdPerson} from 'react-icons/md';
import styles from './PersonalDetails.module.css';

const PersonalDetails = ({userDetails, isOpen, toggleContent, isCompleted}) => {
    return (
        <div className={styles.step}>
            <div
                className={styles.stepHeader}
                onClick={() => toggleContent(1)}
            >
                <div className={`${styles.stepIcon} ${isCompleted ? styles.completed : ''}`}>
                    {isCompleted ? <MdOutlineDone/> : <MdPerson/>}
                </div>
                <h3 className={styles.stepTitle}>Personal Details</h3>
                <button className={styles.toggleButton}>
                    {isOpen ? <MdOutlineKeyboardArrowUp/> : <MdOutlineKeyboardArrowDown/>}
                </button>
            </div>

            <div className={`${styles.stepContent} ${isOpen ? styles.open : ''}`}>
                <div className={styles.personalInfo}>
                    <div className={styles.inputGrid}>
                        <div className={styles.inputField}>
                            <label>Name</label>
                            <input type='text' value={userDetails.name} readOnly/>
                        </div>
                        <div className={styles.inputField}>
                            <label>Email</label>
                            <input type='email' value={userDetails.email} readOnly/>
                        </div>
                        <div className={styles.inputField}>
                            <label>Phone Number</label>
                            <input type='text' value={userDetails.phoneNumber} readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;