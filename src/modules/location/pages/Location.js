import React, { useContext } from 'react';
import LocationPin from '../components/icons/LocationPin';
import PhoneIcon from '../components/icons/PhoneIcon';
import ClockIcon from '../components/icons/ClockIcon';
import EmailIcon from '../components/icons/EmailIcon';
import Map from '../components/Map/Map';
import styles from './Location.module.css';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { useOpeningHours } from '../hooks/useOpeningHours';
import { useFormattedOpeningHours } from '../hooks/useFormattedOpeningHours';
import LoadingIndicator from '../../dashboard/sections/Loading/LoadingIndicator';

/**
 * LocationSection component
 *
 * Renders the location section with contact information and a map.
 *
 * @returns {JSX.Element} The LocationSection component
 */
const LocationSection = () => {
  const { config } = useContext(AuthContext);
  const { openingHours, isLoading, error } = useOpeningHours();
  const formattedOpeningHours = useFormattedOpeningHours(openingHours);

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <LoadingIndicator text='Loading location...' />
      </div>
    );
  if (error) return <div>Error loading opening hours</div>;

  return (
    <div id='location'>
      <section className={styles.locationSection}>
        <div className={styles.locationContainer}>
          <div className={styles.locationHeader}>
            <h2>Visit Us</h2>
            <div className={styles.headerDivider}></div>
          </div>

          <div className={styles.locationContent}>
            <div className={styles.contactInfo}>
              <LocationInfoGroup
                icon={<LocationPin />}
                title='Our Location'
                content={[
                  config?.address?.street,
                  `${config?.address?.eircode}, ${config?.address?.city}`,
                  `${config?.address?.county}, ${config?.address?.country}`,
                ]}
              />

              <LocationInfoGroup
                icon={<PhoneIcon />}
                title='Contact Us'
                content={[`Phone: ${config?.phoneNumber?.phoneNumber}`]}
              />

              <LocationInfoGroup
                icon={<EmailIcon />}
                title='Email Us'
                content={[config?.email?.email]}
              />

              <LocationInfoGroup
                icon={<ClockIcon />}
                title='Opening Hours'
                content={formattedOpeningHours.map(({ day, hours }) => `${day}: ${hours}`)}
              />

              <div className={styles.buttonsContainer}>
                <ContactButton
                  href={`tel:${config?.phoneNumber?.phoneNumber}`}
                  icon={<PhoneIcon />}
                  text='Call for Reservation'
                />
                <ContactButton
                  href={`mailto:${config?.email?.email}`}
                  icon={<EmailIcon />}
                  text='Email Us'
                  isOutline
                />
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

/**
 * LocationInfoGroup component
 *
 * Renders a group of location information with an icon, title, and content.
 *
 * @param {Object} props - The component props
 * @param {JSX.Element} props.icon - The icon to display
 * @param {string} props.title - The title of the information group
 * @param {Array} props.content - The content of the information group
 * @returns {JSX.Element} The LocationInfoGroup component
 */
const LocationInfoGroup = ({ icon, title, content }) => (
  <div className={styles.infoGroup}>
    <div className={styles.infoHeader}>
      <div className={styles.iconContainer}>{icon}</div>
      <h3>{title}</h3>
    </div>
    <div className={styles.infoContent}>
      {content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  </div>
);

/**
 * ContactButton component
 *
 * Renders a contact button with an icon and text.
 *
 * @param {Object} props - The component props
 * @param {string} props.href - The href for the button link
 * @param {JSX.Element} props.icon - The icon to display
 * @param {string} props.text - The text to display
 * @param {boolean} [props.isOutline] - Whether the button is outlined
 * @returns {JSX.Element} The ContactButton component
 */
const ContactButton = ({ href, icon, text, isOutline }) => (
  <a
    href={href}
    className={`
      ${styles.contactButton}
      ${isOutline ? styles.outline : ''}
    `}>
    {icon} {text}
  </a>
);

export default LocationSection;
