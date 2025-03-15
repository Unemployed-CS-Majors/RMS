import React from "react";
import "./Home.css";
import HeroSection from "./sections/HeroSection";
import OpeningHoursSection from "./sections/OpeningHoursSection";
import AboutUsSection from "./sections/AboutUsSection";
import HomeFooter from "../../components/HomeFooter/HomeFooter";

export default function Home() {
    return (
        <div className="home-container">
            <div className="main">
                <HeroSection />
                <OpeningHoursSection />
                <AboutUsSection />
            </div>
            <HomeFooter />
        </div>
    );
}