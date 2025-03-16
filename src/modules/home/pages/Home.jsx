import React from "react";
import styles from "./Home.module.css";
import HeroSection from "../sections/Hero/HeroSection";
import OpeningHoursSection from "../sections/OpeningHours/OpeningHoursSection";
import AboutUsSection from "../sections/AboutUs/AboutUsSection";
import HomeFooter from "../components/HomeFooter/HomeFooter";

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.main}>
                <HeroSection />
                <OpeningHoursSection />
                <AboutUsSection />
            </div>
            <HomeFooter />
        </div>
    );
}