import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ROUTES } from '../../../../constants/routes.js';
import styles from './LoginForm.module.css';

/**
 * Login form component
 *
 * @param {Object} formData - Form data object
 * @param {Function} handleChange - Function to handle input changes
 * @param {Function} handleSubmit - Function to handle form submission
 * @param {Function} showRegister - Function to switch to register form
 * @returns {JSX.Element} Login form component
 */
const LoginForm = ({ formData, handleChange, handleSubmit, showRegister }) => {
    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.forgotPassword}>
                <a href={ROUTES.FORGOT_PASSWORD}>Forgot Password?</a>
            </div>

            <button type="submit" className={styles.authButton}>Sign In</button>

            <p className={styles.authSwitch}>
                Don't have an account?
                <span onClick={showRegister}>Sign up</span>
            </p>
        </form>
    );
};

export default LoginForm;