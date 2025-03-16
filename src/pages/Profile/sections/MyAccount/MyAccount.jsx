import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../../../constants/routes";
import layoutStyles from '../../../../components/Profile/ProfileLayout.module.css';
import formStyles from '../../../../components/Profile/ReservationEditForm/FormComponents.module.css';
import styles from './MyAccount.module.css';
import reservationStyles from '../../../../components/Profile/ReservationDetail/ReservationDetail.module.css';

/**
 * AccountDetails component displays user account information
 */
const AccountDetails = ({ userDetails }) => {
    return (
        <div className={layoutStyles.card}>
            <div className={layoutStyles.cardHeader}>
                <h3>Account Details</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                <div className={reservationStyles.reservationGrid}>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>First Name</span>
                        <span className={reservationStyles.fieldValue}>{userDetails?.firstName}</span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Last Name</span>
                        <span className={reservationStyles.fieldValue}>{userDetails?.lastName}</span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Email</span>
                        <span className={reservationStyles.fieldValue}>{userDetails?.email}</span>
                    </div>
                    <div className={reservationStyles.reservationField}>
                        <span className={reservationStyles.fieldLabel}>Phone</span>
                        <span className={reservationStyles.fieldValue}>{userDetails?.phoneNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * PasswordChange component manages user password changes
 */
const PasswordChange = ({ onPasswordChange }) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }

        onPasswordChange(formData);

        // Reset form
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    return (
        <div className={styles.cardChangePassword}>
            <div className={layoutStyles.cardHeader}>
                <h3>Change Password</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.formGroup}>
                        <label className={reservationStyles.fieldLabel}>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className={formStyles.editInput}
                            required
                        />
                    </div>
                    <div className={formStyles.formGroup}>
                        <label className={reservationStyles.fieldLabel}>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={formStyles.editInput}
                            required
                            minLength="8"
                        />
                    </div>
                    <div className={formStyles.formGroup}>
                        <label className={reservationStyles.fieldLabel}>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={formStyles.editInput}
                            required
                        />
                    </div>
                    <div className={layoutStyles.cardActions}>
                        <button type="submit" className={layoutStyles.btnPrimary}>
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * DeleteAccount component handles account deletion flow
 */
const DeleteAccount = ({ onDelete, showConfirm, setShowConfirm }) => {
    return (
        <div className={layoutStyles.card}>
            <div className={layoutStyles.cardHeader}>
                <h3>Delete Account</h3>
            </div>
            <div className={layoutStyles.cardBody}>
                {!showConfirm ? (
                    <div>
                        <p className={formStyles.warningText}>
                            Warning: Deleting your account is permanent and cannot be undone.
                            All your data will be removed from our system.
                        </p>
                        <div className={layoutStyles.cardActions}>
                            <button className={layoutStyles.btnDanger} onClick={() => setShowConfirm(true)}>
                                Delete My Account
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className={formStyles.warningText}>
                            Are you absolutely sure you want to delete your account?
                            This action cannot be undone.
                        </p>
                        <div className={layoutStyles.cardActions}>
                            <button className={layoutStyles.btnDanger} onClick={onDelete}>
                                Yes, Delete My Account
                            </button>
                            <button className={layoutStyles.btnSecondary} onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * AccountTabs component displays navigation tabs for account sections
 */
const AccountTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className={formStyles.accountSubmenu}>
            <button
                className={activeTab === "details" ? `${formStyles.accountTab} ${formStyles.active}` : formStyles.accountTab}
                onClick={() => setActiveTab("details")}
            >
                Account Details
            </button>
            <button
                className={activeTab === "password" ? `${formStyles.accountTab} ${formStyles.active}` : formStyles.accountTab}
                onClick={() => setActiveTab("password")}
            >
                Change Password
            </button>
            <button
                className={activeTab === "delete" ? `${formStyles.accountTab} ${formStyles.active}` : formStyles.accountTab}
                onClick={() => setActiveTab("delete")}
            >
                Delete Account
            </button>
        </div>
    );
};

/**
 * Main MyAccount component
 */
const MyAccount = ({ userDetails, deleteAccount }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("details");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Check for subtab in URL hash
    useEffect(() => {
        const hash = location.hash;
        if (hash.startsWith('#account/')) {
            const subtab = hash.split('/')[1];
            if (['details', 'password', 'delete'].includes(subtab)) {
                setActiveTab(subtab);
            }
        } else if (hash === '#account') {
            // Default to details when just #account is specified
            setActiveTab("details");
        }
    }, [location]);

    // Update URL hash when subtab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`#account/${tab}`, { replace: true });
    };

    const handlePasswordChange = (passwordData) => {
        // In a real implementation, this would call an API
        console.log("Password change requested:", passwordData);
        alert("Password changed successfully!");
    };

    const handleDeleteAccount = async () => {
        await deleteAccount();
        logout();
        navigate(ROUTES.HOME);
    };

    return (
        <div className={layoutStyles.content}>
            <div className={layoutStyles.contentHeaderAccount}>
                <h2>My Account</h2>
            </div>

            <AccountTabs activeTab={activeTab} setActiveTab={handleTabChange} />

            {/* Account Details */}
            {activeTab === "details" && (
                <AccountDetails userDetails={userDetails} />
            )}

            {/* Change Password */}
            {activeTab === "password" && (
                <PasswordChange onPasswordChange={handlePasswordChange} />
            )}

            {/* Delete Account */}
            {activeTab === "delete" && (
                <DeleteAccount
                    onDelete={handleDeleteAccount}
                    showConfirm={showDeleteConfirm}
                    setShowConfirm={setShowDeleteConfirm}
                />
            )}
        </div>
    );
};

export default MyAccount;