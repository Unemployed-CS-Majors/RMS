import React from "react";
import { useState } from "react";
import "../Styles/Auth.css";

export default function Auth(){
    const [loginForm, setLoginForm] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const showLogin = () => {
        setLoginForm(true);
    }   
    const showRegister = () => {
        setLoginForm(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const checkPassword = () => {
        return password === confirmPassword;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!checkPassword()){
            console.log("Passwords do not match");
        }else{
            console.log("Passwords match");
        }
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
                        <form 
                            style={{display: 'flex', flexDirection: 'column'}}
                            onSubmit={handleSubmit}
                        >
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
                        <form 
                            style={{display: 'flex', flexDirection: 'column'}}
                            onSubmit={handleSubmit}
                        >
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
                                onChange={handlePassword}
                                required
                            />
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={updateConfirmPassword}
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
