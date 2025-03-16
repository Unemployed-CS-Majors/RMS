import React, { useContext } from "react";
import { LuClock3 } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";
import useOpeningHours from "../../hooks/useOpeningHours";
import useRestaurantImages from "../../hooks/useRestaurantImages";
import styles from "./OpeningHoursSection.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";

const OpeningHoursSection = () => {
    const { openingHours, isLoading, error } = useOpeningHours();
    const { restaurantImages } = useRestaurantImages();
    const { config } = useContext(AuthContext);

    const convertTo12HourFormat = time24 => {
        const [hour, minute] = time24.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const minuteFormatted = minute < 10 ? `0${minute}` : minute;
        return [`${hour12}:${minuteFormatted}`, `${ampm}`];
    };

    return (
        <div className={styles.openhoursContainer}>
            <div className={styles.openhoursText}>
                <div className={styles.openhoursTextTop}>
                    <h1>Opening Hours</h1>
                    <LuClock3 className={styles.clockIcon} />
                </div>

                <div className={styles.openhoursTextBtm}>
                    {isLoading && <p>Loading opening hours...</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    {!isLoading &&
                        !error &&
                        openingHours.map((hours, index) =>
                            hours.startTime != null && hours.endTime != null ? (
                                <p key={index}>
                                    {hours.day.charAt(0).toUpperCase() + hours.day.slice(1)} <span className={styles.timeDash}>-</span>
                                    {convertTo12HourFormat(hours.startTime)[0]}{' '}
                                    <span className={styles.timeDash}>{convertTo12HourFormat(hours.startTime)[1]}</span> -&nbsp;
                                    {convertTo12HourFormat(hours.endTime)[0]}{' '}
                                    <span className={styles.timeDash}>{convertTo12HourFormat(hours.endTime)[1]}</span>
                                </p>
                            ) : null
                        )}

                    <div className={styles.phoneNumberTxt}>
                        <BiSolidPhoneCall className={styles.phoneIcon} />
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