import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import '../Profile.css';

const MyAccount = ({userDetails, deleteAccount}) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("details");
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        alert("Password changed successfully!");
        setFormData(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
    };

    const handleDeleteAccount = async () => {
        await deleteAccount();
        logout();
        navigate(ROUTES.HOME);
    };

    const handleLogoutClick = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    return (
        <div className="profile-layout">
            {/* Main Content */}
            <div className="content">
                <div className="content-header-account">
                    <h2>My Account</h2>
                </div>
                
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
                
                {/* Account Details */}
                {activeTab === "details" && (
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
                )}
                
                {/* Change Password */}
                {activeTab === "password" && (
                    <div className="card-change-password">
                        <div className="card-header">
                            <h3>Change Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePasswordChange}>
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
                )}
                
                {/* Delete Account */}
                {activeTab === "delete" && (
                    <div className="card">
                        <div className="card-header">
                            <h3>Delete Account</h3>
                        </div>
                        <div className="card-body">
                            {!showDeleteConfirm ? (
                                <div>
                                    <p className="warning-text">Warning: Deleting your account is permanent and cannot be undone. All your data will be removed from our system.</p>
                                    <div className="card-actions">
                                        <button className="btn-danger" onClick={() => setShowDeleteConfirm(true)}>
                                            Delete My Account
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="warning-text">Are you absolutely sure you want to delete your account? This action cannot be undone.</p>
                                    <div className="card-actions">
                                        <button className="btn-danger" onClick={handleDeleteAccount}>
                                            Yes, Delete My Account
                                        </button>
                                        <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAccount;