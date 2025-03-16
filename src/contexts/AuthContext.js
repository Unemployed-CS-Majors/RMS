import React, {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import COOKIE_KEYS from "../constants/cookieKeys";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import cookieManager from "../utils/cookieManager";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, facebookProvider, googleProvider} from "../config/FirebaseConfig";
import restaurantConfigService from "../services/restaurantConfig.service";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [config, setConfig] = useState({});
    useEffect(() => {
        const idToken = cookieManager.get(COOKIE_KEYS.ID_TOKEN);
        setIsLoggedIn(!!idToken);
        getConfig();
        const config = JSON.parse(cookieManager.get(COOKIE_KEYS.CONFIG) || '{}');
        console.log(config);
        setConfig(config);
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            setIsLoggedIn(true);
            const userResponse = await userService.userDetails();
            cookieManager.set(COOKIE_KEYS.USER, userResponse.privileges, {expires: 1})

        } catch (error) {
            console.error("Login error:", error);
        }

        AuthProvider.propTypes = {
            children: PropTypes.node.isRequired,
        };
    };

    const register = async (formData, callback) => {
        try {
            await authService.register(formData);
            callback();
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const logout = async () => {
        await authService.logout();
        setIsLoggedIn(false);
    };

    const loginWithGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                user.getIdToken().then((idToken) => {
                    sendGoogleToken(idToken);
                    console.log("ID Token:", idToken);
                }).catch((error) => {
                    console.error("Error getting ID token:", error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.error(
                    "Error code: " + errorCode + "\n" +
                    "Error message: " + errorMessage + "\n" +
                    "Email: " + email + "\n" +
                    "Credential: " + credential
                );
            });
    }

    const loginWithFacebook = async () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                user.getIdToken().then((idToken) => {
                    sendGoogleToken(idToken);
                }).catch((error) => {
                    console.error("Error getting ID token:", error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.error(
                    "Error code: " + errorCode + "\n" +
                    "Error message: " + errorMessage + "\n" +
                    "Email: " + email + "\n" +
                    "Credential: " + credential
                );
            });
    }

    const sendGoogleToken = async (tokenId) => {
        try {
            const response = await authService.google(tokenId);
            console.log("Google login response:", response);
            setIsLoggedIn(true);
            const userResponse = userService.userDetails();
            cookieManager.set(COOKIE_KEYS.USER, userResponse.privileges, {expires: 1})
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    const resetPassword = async (email) => {
        try {
            await authService.forgotPassword(email);
        } catch (error) {
            console.error("Password reset error:", error);
        }
    };

    const deleteAccount = async () => {
        try {
            await authService.deleteAccount();
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Account deletion error:", error);
        }
    }

    const getConfig = async () => {
        const response = await restaurantConfigService.getRestaurantConfig()
        setConfig(response);
        cookieManager.set(COOKIE_KEYS.CONFIG, JSON.stringify(response), {expires: 1});
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, register, logout, loginWithGoogle,loginWithFacebook, sendGoogleToken,resetPassword, deleteAccount, config}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
