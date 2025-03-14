import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../../constants/routes";

/**
 * AccountDetails component displays user account information
 */
const AccountDetails = ({ userDetails }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3>Account Details</h3>
            </div>
            <div className="card-body">
                <div className="reservation-grid">
                    <div className="reservation-field">
                        <span className="field-label">First Name</span>
                        <span className="field-value">{userDetails?.firstName}</span>
                    </div>
                    <div className="reservation-field">
                        <span className="field-label">Last Name</span>
                        <span className="field-value">{userDetails?.lastName}</span>
                    </div>
                    <div className="reservation-field">
                        <span className="field-label">Email</span>
                        <span className="field-value">{userDetails?.email}</span>
                    </div>
                    <div className="reservation-field">
                        <span className="field-label">Phone</span>
                        <span className="field-value">{userDetails?.phoneNumber}</span>
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
        <div className="card-change-password">
            <div className="card-header">
                <h3>Change Password</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="field-label">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="edit-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="field-label">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="edit-input"
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="form-group">
                        <label className="field-label">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="edit-input"
                            required
                        />
                    </div>
                    <div className="card-actions">
                        <button type="submit" className="btn-primary">
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
        <div className="card">
            <div className="card-header">
                <h3>Delete Account</h3>
            </div>
            <div className="card-body">
                {!showConfirm ? (
                    <div>
                        <p className="warning-text">
                            Warning: Deleting your account is permanent and cannot be undone.
                            All your data will be removed from our system.
                        </p>
                        <div className="card-actions">
                            <button className="btn-danger" onClick={() => setShowConfirm(true)}>
                                Delete My Account
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="warning-text">
                            Are you absolutely sure you want to delete your account?
                            This action cannot be undone.
                        </p>
                        <div className="card-actions">
                            <button className="btn-danger" onClick={onDelete}>
                                Yes, Delete My Account
                            </button>
                            <button className="btn-secondary" onClick={() => setShowConfirm(false)}>
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
        <div className="account-submenu">
            <button
                className={activeTab === "details" ? "account-tab active" : "account-tab"}
                onClick={() => setActiveTab("details")}
            >
                Account Details
            </button>
            <button
                className={activeTab === "password" ? "account-tab active" : "account-tab"}
                onClick={() => setActiveTab("password")}
            >
                Change Password
            </button>
            <button
                className={activeTab === "delete" ? "account-tab active" : "account-tab"}
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
        <div className="content">
            <div className="content-header-account">
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