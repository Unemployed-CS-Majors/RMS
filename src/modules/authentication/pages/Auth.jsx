import React from 'react';
import styles from "./Auth.module.css";
import AuthBackground from "../../../assets/auth-background.jpg";

// Components
import AuthHeader from '../components/AuthHeader/AuthHeader';
import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay';
import SocialAuthButtons from '../components/SocialAuthButtons/SocialAuthButtons';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

// Custom hooks
import { useAuthForm } from '../hooks/useAuthForm';

/**
 * Authentication component that handles both login and registration
 */
const Auth = () => {
    const {
        loginForm,
        formData,
        formError,
        loading,
        showCountryCodeDropdown,
        countryCodeRef,
        showLogin,
        showRegister,
        returnHome,
        handleChange,
        handleCountryCodeSelect,
        toggleCountryCodeDropdown,
        handleRegister,
        handleLogin,
        handleGoogleAuth,
        handleFacebookAuth
    } = useAuthForm();

    return (
        <div className={styles.authContainer}>
            <AuthHeader
                isLoginForm={loginForm}
                returnHome={returnHome}
            />

            <img src={AuthBackground} className={styles.authBackground} alt="Background" />

            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1>{loginForm ? "Welcome Back" : "Create Account"}</h1>
                    <p className={styles.authSubheader}>{loginForm ? "Login to continue your journey" : "Join us today"}</p>
                </div>

                <ErrorDisplay error={formError} />

                <SocialAuthButtons
                    loading={loading}
                    handleGoogleAuth={handleGoogleAuth}
                    handleFacebookAuth={handleFacebookAuth}
                />

                <div className={styles.divider}>
                    <span>or</span>
                </div>

                {loginForm ? (
                    <LoginForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        showRegister={showRegister}
                    />
                ) : (
                    <RegisterForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleRegister}
                        showLogin={showLogin}
                        countryCodeRef={countryCodeRef}
                        showCountryCodeDropdown={showCountryCodeDropdown}
                        toggleCountryCodeDropdown={toggleCountryCodeDropdown}
                        handleCountryCodeSelect={handleCountryCodeSelect}
                    />
                )}
            </div>
        </div>
    );
};

export default Auth;