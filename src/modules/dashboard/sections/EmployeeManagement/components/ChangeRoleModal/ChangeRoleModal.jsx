import React from 'react';
import styles from './ChangeRoleModal.module.css';

/**
 * ChangeRoleModal component
 *
 * Modal for changing an employee's role
 *
 * @param {Object} employee - The employee whose role is being changed
 * @param {String} selectedRole - Currently selected role
 * @param {Function} onRoleChange - Function to handle role selection change
 * @param {Function} onSave - Function to save the role change
 * @param {Function} onClose - Function to close the modal
 */
const ChangeRoleModal = ({
                             employee,
                             selectedRole,
                             onRoleChange,
                             onSave,
                             onClose
                         }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={`${styles.modalContainer} ${styles.roleModal}`}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Change User Role</h3>
                    <button className={styles.modalClose} onClick={onClose}>×</button>
                </div>
                <div className={styles.modalContent}>
                    <p className={styles.employeeName}>
                        Changing role
                        for <strong>{employee?.firstName} {employee?.lastName}</strong>
                    </p>

                    <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Select Role</label>
                        <select
                            className={styles.fieldSelect}
                            value={selectedRole}
                            onChange={onRoleChange}
                        >
                            <option value="employee">Employee</option>
                            <option value="owner">Owner</option>
                        </select>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelAction}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={styles.submitAction}
                            onClick={onSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeRoleModal;