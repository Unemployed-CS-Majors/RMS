import React, {useContext} from "react";
import {LuClock3} from "react-icons/lu";
import {BiSolidPhoneCall} from "react-icons/bi";
import useOpeningHours from "../../hooks/useOpeningHours";
import useRestaurantImages from "../../hooks/useRestaurantImages";
import styles from "./OpeningHoursSection.module.css";
import {AuthContext} from "../../../shared/contexts/AuthContext";
import {convertTo12HourFormat} from "../../../shared/utils/timeUtils";

/**
 * OpeningHoursSection component
 *
 * Renders the "Opening Hours" section of the home page, including the opening hours, contact phone number, and images of the restaurant.
 *
 * @returns {JSX.Element} The OpeningHoursSection component
 */
const OpeningHoursSection = () => {
    const {openingHours, isLoading, error} = useOpeningHours();
    const {restaurantImages} = useRestaurantImages();
    const {config} = useContext(AuthContext);

    return (
        <div className={styles.openhoursContainer}>
            <div className={styles.openhoursText}>
                <div className={styles.openhoursTextTop}>
                    <h1>Opening Hours</h1>
                    <LuClock3 className={styles.clockIcon}/>
                </div>

                <div className={styles.openhoursTextBtm}>
                    {isLoading && <p>Loading opening hours...</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    {!isLoading &&
                        !error &&
                        openingHours.map((hours, index) =>
                            hours.startTime != null && hours.endTime != null ? (
                                <p key={index}>
                                    {hours.day.charAt(0).toUpperCase() + hours.day.slice(1)} <span
                                    className={styles.timeDash}>-</span>
                                    {convertTo12HourFormat(hours.startTime)} <span
                                    className={styles.timeDash}>-</span> {convertTo12HourFormat(hours.endTime)}
                                </p>
                            ) : null
                        )}

                    <div className={styles.phoneNumberTxt}>
                        <BiSolidPhoneCall className={styles.phoneIcon}/>
                        <span className={styles.phoneNumber}>{config?.phoneNumber?.phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div className={styles.imgContainer}>
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