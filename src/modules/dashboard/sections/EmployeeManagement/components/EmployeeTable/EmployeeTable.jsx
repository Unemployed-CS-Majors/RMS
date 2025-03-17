import React from 'react';
import ActionMenu from '../ActionMenu/ActionMenu';
import styles from './EmployeeTable.module.css';

/**
 * EmployeeTable component
 *
 * Displays the table of employees with their information
 *
 * @param {Array} employees - List of employee objects
 * @param {Function} onChangeRole - Function to handle role change
 * @param {Function} onDeleteUser - Function to handle user deletion
 */
const EmployeeTable = ({employees, onChangeRole, onDeleteUser}) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.employeeTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th><span className="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="6" className={styles.emptyState}>
                            <div className={styles.emptyContent}>
                                <div className={styles.emptyIcon}>👥</div>
                                <p>No employees found</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    employees.map(employee => (
                        <tr key={employee.uid}>
                            <td className={styles.idCell} data-label="ID">
                                {employee.uid}
                            </td>
                            <td className={styles.nameCell} data-label="Name">
                                {employee.firstName} {employee.lastName}
                            </td>
                            <td className={styles.emailCell} data-label="Email">
                                {employee.email}
                            </td>
                            <td className={styles.phoneCell} data-label="Phone">
                                {employee.phoneNumber}
                            </td>
                            <td className={styles.roleCell} data-label="Role">
                                <span className={`${styles.roleBadge} ${styles[employee.privileges || employee.role]}`}>
                                  {employee.privileges || employee.role}
                                </span>
                            </td>
                            <td className={styles.actionsCell}>
                                <ActionMenu
                                    employee={employee}
                                    onChangeRole={onChangeRole}
                                    onDeleteUser={onDeleteUser}
                                />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;