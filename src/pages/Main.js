import React from "react";
import "../Styles/Main.css";
import { useNavigate } from "react-router-dom";

export default function Main(){
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/auth"); 
    };

    return(
        /* Write your HTML Code here */
        <div>
            <button onClick={handleClick} style={{padding: "1rem"}}>Sign In</button>
        </div>
    );
}
