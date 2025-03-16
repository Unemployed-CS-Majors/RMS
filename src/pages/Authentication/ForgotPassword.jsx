import React from "react";
import styles from "./Auth.module.css";
import AuthBackground from "../../assets/auth-background.jpg";

// Components
import HomeButton from "../../components/Authentication/HomeButton/HomeButton";
import ForgotPasswordForm from "../../components/Authentication/ForgotPasswordForm/ForgotPasswordForm";
import ResetSuccessMessage from "../../components/Authentication/ResetSuccessMessage/ResetSuccessMessage";

// Custom hooks
import { useForgotPassword } from "./hooks/useForgotPassword";

/**
 * ForgotPassword component for resetting user passwords
 */
const ForgotPassword = () => {
    const {
        email,
        formError,
        isSubmitting,
        isSubmitted,
        returnHome,
        returnToLogin,
        handleChange,
        handleSubmit
    } = useForgotPassword();

    return (
        <div className={styles.authContainer}>
            <HomeButton onClick={returnHome} />

            <img src={AuthBackground} className={styles.authBackground} alt="Background" />

            <div className={styles.authCard}>
                {!isSubmitted ? (
                    <ForgotPasswordForm
                        email={email}
                        formError={formError}
                        isSubmitting={isSubmitting}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        returnToLogin={returnToLogin}
                    />
                ) : (
                    <ResetSuccessMessage
                        email={email}
                        returnToLogin={returnToLogin}
                    />
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;