import React from "react";
import { useState } from "react";
import "../Styles/Auth.css";

export default function Auth(){
    const [loginForm, setLoginForm] = useState(true);
    const [registerForm, setRegisterForm] = useState(false);

    const showLogin = () => {
        setLoginForm(true);
        setRegisterForm(false);
    }

    const showRegister = () => {
        setLoginForm(false);
        setRegisterForm(true);
    }

    return(
        <div className="auth-container">
            <div className="content-container">
                <div className="btn-container">
                    <button className="login-btn auth-btn" onClick={showLogin}>Login</button>
                    <button className="register-btn auth-btn" onClick={showRegister}>Register</button>
                </div>
                <div className="form-container" style={{width: '100%'}}>
                    {loginForm ? (
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                required
                            />

                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                required
                            />
                            <button type="submit" className="submit-btn">Login</button>
                        </form>
                    ) : (
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <div className="name-container" style={{display: 'flex', justifyContent: 'space-between'}}>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    required
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                                required
                            />

                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                required
                            />
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                required
                            />
                            <button type="submit" className="submit-btn">Login</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
