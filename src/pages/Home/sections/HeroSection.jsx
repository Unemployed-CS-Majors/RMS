import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.js";
import ModernImageSlider from "../../../components/ImageSlider/ImageSlider";
import useHomeImages from "../hooks/useHomeImages";
import "./HeroSection.css";

const HeroSection = () => {
    const { foodImages } = useHomeImages();
    const navigate = useNavigate();

    const goToReservation = () => {
        navigate(ROUTES.RESERVE_TABLE);
    };

    return (
        <div className="main-content-container">
            <div className="img-container1">
                <ModernImageSlider imageUrls={foodImages} />
            </div>
            <div className="content">
                <h1>
                    Eat <span style={{ color: "var(--primary)" }}>Well</span>,
                    Live <span style={{ color: "var(--primary)" }}>Better</span>
                </h1>
                <p>
                    Experience the taste of excellence with every dish we serve.
                    Where good food meets great company.
                </p>
                <button className="reserve-btn" onClick={goToReservation}>
                    Reserve Now <FaCalendarAlt />
                </button>
            </div>
        </div>
    );
};

export default HeroSection;