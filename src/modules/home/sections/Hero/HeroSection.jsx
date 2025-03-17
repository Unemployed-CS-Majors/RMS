import React from "react";
import {FaCalendarAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../constants/routes.js";
import ModernImageSlider from "../../components/ImageSlider/ImageSlider";
import useHomeImages from "../../hooks/useHomeImages";
import styles from "./HeroSection.module.css";

/**
 * HeroSection component
 *
 * Renders the hero section of the home page, including an image slider and a call-to-action button for reservations.
 *
 * @returns {JSX.Element} The HeroSection component
 */
const HeroSection = () => {
    const {foodImages} = useHomeImages();
    const navigate = useNavigate();

    /**
     * Navigates to the reservation page.
     */
    const goToReservation = () => {
        navigate(ROUTES.RESERVE_TABLE);
    };

    return (
        <div className={styles.mainContentContainer}>
            <div className={styles.imgContainer}>
                <ModernImageSlider imageUrls={foodImages}/>
            </div>
            <div className={styles.content}>
                <h1>
                    Eat <span className={styles.primary}>Well</span>,
                    Live <span className={styles.primary}>Better</span>
                </h1>
                <p>
                    Experience the taste of excellence with every dish we serve.
                    Where good food meets great company.
                </p>
                <button className={styles.reserveBtn} onClick={goToReservation}>
                    Reserve Now <FaCalendarAlt/>
                </button>
            </div>
        </div>
    );
};

export default HeroSection;