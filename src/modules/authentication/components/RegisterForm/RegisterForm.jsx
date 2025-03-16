import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { countryCodes } from '../../../shared/utils/countryCodeData';
import styles from './RegisterForm.module.css';

/**
 * Registration form component
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} Register form component
 */
const RegisterForm = ({
                          formData,
                          handleChange,
                          handleSubmit,
                          showLogin,
                          countryCodeRef,
                          showCountryCodeDropdown,
                          toggleCountryCodeDropdown,
                          handleCountryCodeSelect
                      }) => {
    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.nameFields}>
                <div className={styles.inputGroup}>
                    <FaUser className={styles.inputIcon} />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FaUser className={styles.inputIcon} />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

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

            <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.phoneInputContainer}>
                <div ref={countryCodeRef} className={styles.countryCodeSelector}>
                    <div
                        className={styles.countryCodeDisplay}
                        onClick={toggleCountryCodeDropdown}
                    >
                        <FaGlobe className={styles.countryCodeIcon} />
                        <span>{formData.countryCode}</span>
                        <FaChevronDown className={styles.dropdownIcon} />
                    </div>

                    {showCountryCodeDropdown && (
                        <div className={styles.countryCodeDropdown}>
                            {countryCodes.map((item, index) => (
                                <div className={styles.countryCodeOption}
                                     onClick={() => handleCountryCodeSelect(item.code)}
                                >
                                    <span className={styles.countryCode}>{item.code}</span>
                                    <span className={styles.countryName}>{item.country}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.phoneInputGroup}>
                    <FaPhone className={styles.phoneInputIcon} />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button type="submit" className={styles.authButton}>Register</button>

            <p className={styles.authSwitch}>
                Already have an account?
                <span onClick={showLogin}>Sign in</span>
            </p>
        </form>
    );
};

export default RegisterForm;