import React, { useEffect, useState, useContext } from "react";
import LocationPin from '../../components/Location/icons/LocationPin';
import PhoneIcon from '../../components/Location/icons/PhoneIcon';
import ClockIcon from '../../components/Location/icons/ClockIcon';
import EmailIcon from '../../components/Location/icons/EmailIcon';
import openingHoursService from "../../services/openingHours.service";
import Map from "../../components/Location/Map/Map";
import styles from "./Location.module.css";
import { AuthContext } from "../../contexts/AuthContext";

const LocationSection = () => {
  const [openingHours, setOpeningHours] = useState([]);
  const { config } = useContext(AuthContext);

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const data = await openingHoursService.getAll();
        setOpeningHours(data);
      } catch (error) {
        console.error('Error fetching opening hours:', error);
      }
    };

    fetchOpeningHours();
  }, []);

  const convertTo12HourFormat = time24 => {
    const [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const minuteFormatted = minute < 10 ? `0${minute}` : minute;
    return `${hour12}:${minuteFormatted} ${ampm}`;
  };

  return (
      <div id="location">
        <section className={styles.locationSection}>
          <div className={styles.locationContainer}>
            <div className={styles.locationHeader}>
              <h2>Visit Us</h2>
              <div className={styles.headerDivider}></div>
            </div>

            <div className={styles.locationContent}>
              <div className={styles.contactInfo}>
                <div className={styles.infoGroup}>
                  <div className={styles.infoHeader}>
                    <div className={styles.iconContainer}>
                      <LocationPin />
                    </div>
                    <h3>Our Location</h3>
                  </div>
                  <div className={styles.infoContent}>
                    <p>{config?.address?.street}</p>
                    <p>{config?.address?.eircode}, {config?.address?.city}</p>
                    <p>{config?.address?.county}, {config?.address?.country}</p>
                  </div>
                </div>

                <div className={styles.infoGroup}>
                  <div className={styles.infoHeader}>
                    <div className={styles.iconContainer}>
                      <PhoneIcon />
                    </div>
                    <h3>Contact Us</h3>
                  </div>
                  <div className={styles.infoContent}>
                    <p>Phone: {config?.phoneNumber?.phoneNumber}</p>
                  </div>
                </div>

                <div className={styles.infoGroup}>
                  <div className={styles.infoHeader}>
                    <div className={styles.iconContainer}>
                      <EmailIcon />
                    </div>
                    <h3>Email Us</h3>
                  </div>
                  <div className={styles.infoContent}>
                    <p>{config?.email?.email}</p>
                  </div>
                </div>

                <div className={styles.infoGroup}>
                  <div className={styles.infoHeader}>
                    <div className={styles.iconContainer}>
                      <ClockIcon />
                    </div>
                    <h3>Opening Hours</h3>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.operatingHours}>
                      {openingHours.map(
                          (hours, index) =>
                              hours.startTime &&
                              hours.endTime && (
                                  <div
                                      key={index}
                                      className={styles.hoursItem}>
                                    <span className={styles.day}>{hours.day.charAt(0).toUpperCase() + hours.day.slice(1)}</span>
                                    <span className={styles.hours}>{`${convertTo12HourFormat(
                                        hours.startTime
                                    )} - ${convertTo12HourFormat(hours.endTime)}`}</span>
                                  </div>
                              )
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.buttonsContainer}>
                  <a href={'tel:' + config?.phoneNumber?.phoneNumber} className={styles.contactButton}>
                    <PhoneIcon /> Call for Reservation
                  </a>
                  <a href={'mailto:' + config?.email?.email} className={`${styles.contactButton} ${styles.outline}`}>
                    <EmailIcon /> Email Us
                  </a>
                </div>
              </div>

              <div className={styles.mapContainer}>
                <div className={styles.map}>
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default LocationSection;