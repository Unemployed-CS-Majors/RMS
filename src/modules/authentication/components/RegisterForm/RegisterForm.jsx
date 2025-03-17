import React from 'react';
import {FaChevronDown, FaEnvelope, FaGlobe, FaLock, FaPhone, FaUser} from 'react-icons/fa';
import {countryCodes} from '../../../shared/utils/countryCodeData';
import styles from './RegisterForm.module.css';

/**
 * RegisterForm component renders a registration form with fields for user details.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.formData - The form data containing user input values.
 * @param {Function} props.handleChange - The function to handle input changes.
 * @param {Function} props.handleSubmit - The function to handle form submission.
 * @param {Function} props.showLogin - The function to switch to the login form.
 * @param {Object} props.countryCodeRef - The reference to the country code selector element.
 * @param {boolean} props.showCountryCodeDropdown - The flag to show/hide the country code dropdown.
 * @param {Function} props.toggleCountryCodeDropdown - The function to toggle the country code dropdown.
 * @param {Function} props.handleCountryCodeSelect - The function to handle country code selection.
 * @returns {JSX.Element} The rendered registration form component.
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
                    <FaUser className={styles.inputIcon}/>
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
                    <FaUser className={styles.inputIcon}/>
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
                <FaEnvelope className={styles.inputIcon}/>
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
                <FaLock className={styles.inputIcon}/>
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
                <FaLock className={styles.inputIcon}/>
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
                        <FaGlobe className={styles.countryCodeIcon}/>
                        <span>{formData.countryCode}</span>
                        <FaChevronDown className={styles.dropdownIcon}/>
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
                    <FaPhone className={styles.phoneInputIcon}/>
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