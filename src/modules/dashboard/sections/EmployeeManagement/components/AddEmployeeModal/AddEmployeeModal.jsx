import React from 'react';
import styles from './AddEmployeeModal.module.css';

/**
 * AddEmployeeModal component
 *
 * Modal form for adding a new employee
 *
 * @param {Object} newEmployee - The new employee data
 * @param {Object} formErrors - Form validation errors
 * @param {Function} onInputChange - Function to handle input changes
 * @param {Function} onSubmit - Function to handle form submission
 * @param {Function} onClose - Function to close the modal
 */
const AddEmployeeModal = ({
                              newEmployee,
                              formErrors,
                              onInputChange,
                              onSubmit,
                              onClose
                          }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Add New Employee</h3>
                    <button className={styles.modalClose} onClick={onClose}>×</button>
                </div>
                <div className={styles.modalContent}>
                    <form onSubmit={onSubmit} className={styles.employeeForm}>
                        <div className={styles.formGrid}>
                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`${styles.fieldInput} ${formErrors.firstName ? styles.error : ''}`}
                                    value={newEmployee.firstName}
                                    onChange={onInputChange}
                                />
                                {formErrors.firstName &&
                                    <div className={styles.fieldError}>{formErrors.firstName}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`${styles.fieldInput} ${formErrors.lastName ? styles.error : ''}`}
                                    value={newEmployee.lastName}
                                    onChange={onInputChange}
                                />
                                {formErrors.lastName &&
                                    <div className={styles.fieldError}>{formErrors.lastName}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`${styles.fieldInput} ${formErrors.email ? styles.error : ''}`}
                                    value={newEmployee.email}
                                    onChange={onInputChange}
                                />
                                {formErrors.email && <div className={styles.fieldError}>{formErrors.email}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Phone</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="+1 2345678901"
                                    className={`${styles.fieldInput} ${formErrors.phone ? styles.error : ''}`}
                                    value={newEmployee.phoneNumber || ''}
                                    onChange={onInputChange}
                                />
                                <small className={styles.fieldHelp}>Include country code (e.g., +1 for US)</small>
                                {formErrors.phone && <div className={styles.fieldError}>{formErrors.phone}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`${styles.fieldInput} ${formErrors.password ? styles.error : ''}`}
                                    value={newEmployee.password}
                                    onChange={onInputChange}
                                />
                                {formErrors.password &&
                                    <div className={styles.fieldError}>{formErrors.password}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`${styles.fieldInput} ${formErrors.confirmPassword ? styles.error : ''}`}
                                    value={newEmployee.confirmPassword}
                                    onChange={onInputChange}
                                />
                                {formErrors.confirmPassword &&
                                    <div className={styles.fieldError}>{formErrors.confirmPassword}</div>}
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>Role</label>
                                <select
                                    name="role"
                                    className={styles.fieldSelect}
                                    value={newEmployee.role}
                                    onChange={onInputChange}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>
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
                                type="submit"
                                className={styles.submitAction}
                            >
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;