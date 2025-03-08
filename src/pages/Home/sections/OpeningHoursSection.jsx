import React from "react";
import { LuClock3 } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";
import useOpeningHours from "../hooks/useOpeningHours";
import useRestaurantImages from "../hooks/useRestaurantImages";
import "./OpeningHoursSection.css";

const OpeningHoursSection = () => {
    const { openingHours, isLoading, error } = useOpeningHours();
    const { restaurantImages } = useRestaurantImages();

    return (
        <div className="openhours-container">
            <div className="openhours-text">
                <div className="openhours-text-top">
                    <h1>Opening Hours</h1>
                    <LuClock3 className="clock-icon"/>
                </div>

                <div className="openhours-text-btm">
                    {isLoading && <p>Loading opening hours...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!isLoading && !error && openingHours.map((hours, index) =>
                        hours.startTime != null && hours.endTime != null ? (
                            <p key={index}>
                                {hours.day} <span className="time-dash">-</span>
                                {hours.startTime} <span className="time-dash">AM</span> -
                                {hours.endTime} <span className="time-dash">PM</span>
                            </p>
                        ) : null
                    )}

                    <div className="phoneNumber-txt">
                        <BiSolidPhoneCall className="phone-icon"/>
                        <span className="phoneNumber">+123456789</span>
                    </div>
                </div>
            </div>

            <div className="img-container2">
                {restaurantImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Restaurant view ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OpeningHoursSection;