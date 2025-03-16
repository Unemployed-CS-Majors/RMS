import React, { useState, useRef, useEffect } from 'react';
import { Trash2, UserCog } from 'lucide-react';
import styles from './ActionMenu.module.css';

/**
 * ActionMenu component
 *
 * Displays a dropdown menu with actions for each employee row
 *
 * @param {Object} employee - The employee data
 * @param {Function} onChangeRole - Function to handle role change
 * @param {Function} onDeleteUser - Function to handle user deletion
 */
const ActionMenu = ({ employee, onChangeRole, onDeleteUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleChangeRole = () => {
        onChangeRole(employee);
        setIsOpen(false);
    };

    const handleDeleteUser = () => {
        onDeleteUser(employee.uid);
        setIsOpen(false);
    };

    return (
        <div className={styles.actionsWrapper}>
            <button
                ref={buttonRef}
                className={`${styles.actionButton} dots-button`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <span className={styles.dotsIcon}>⋮</span>
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className={styles.actionMenu}
                >
                    <ul className={styles.actionList}>
                        <li
                            className={`${styles.actionItem} ${styles.changeRole}`}
                            onClick={handleChangeRole}
                        >
                            <UserCog className={styles.actionIcon}/>
                            Change Role
                        </li>
                        <li
                            className={`${styles.actionItem} ${styles.deleteUser}`}
                            onClick={handleDeleteUser}
                        >
                            <Trash2 className={styles.actionIcon}/>
                            Delete User
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;