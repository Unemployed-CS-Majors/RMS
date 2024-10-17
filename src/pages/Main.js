import React from "react";
import "../Styles/Main.css";
import { useNavigate } from "react-router-dom";

export default function Main(){
    const navigate = useNavigate(); 

    const handleNavigateToAuth = () => {
        navigate("/auth"); 
    };

    return(
        /* Write your HTML Code here */
    
        <div>
            <button className="signInBtn" onClick={handleNavigateToAuth} style={{padding: "1rem"}}>Sign In</button>
            <h1 className="rmsLogo">RMS</h1>
            <h2 className="rmsLogo2">Restaurant Management System</h2>
        </div>
    );
}
