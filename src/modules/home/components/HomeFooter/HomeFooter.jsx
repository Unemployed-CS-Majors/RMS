import React, {useContext} from "react";
import styles from "./HomeFooter.module.css";
import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt} from "react-icons/fa";
import SocialIcons from "../../../shared/components/SocialIcons/SocialIcons";
import useCurrentYear from "../../../shared/hooks/useCurrentYear";
import {AuthContext} from "../../../shared/contexts/AuthContext";

/**
 * HomeFooter component
 *
 * Displays the footer section of the home page with contact information, quick links, and social media icons.
 *
 * @returns {JSX.Element} The HomeFooter component
 */
export default function HomeFooter() {
    const {currentYear} = useCurrentYear();
    const {config} = useContext(AuthContext);
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.firstContainer}>
                    <h1>
                        <span style={{fontFamily: "Lavishly Yours"}}>R</span>
                        <span style={{color: "white", fontFamily: "Lavishly Yours"}}>M</span>
                        <span style={{fontFamily: "Lavishly Yours"}}>S</span>
                    </h1>
                    <p>
                        Stay connected with us on social media for updates, special offers, and more.
                        We look forward to serving you again soon!
                    </p>
                    <SocialIcons/>
                </div>

                <div className={styles.secondContainer}>
                    <h4 className={styles.footerHeading}>Quick Links</h4>
                    <div className={styles.footerLinks}>
                        <a href="#about" className={styles.footerLink}>About Us</a>
                        <a href="#privacy" className={styles.footerLink}>Privacy Policy</a>
                        <a href="#careers" className={styles.footerLink}>Careers</a>
                        <a href="#features" className={styles.footerLink}>Features</a>
                        <a href="#blog" className={styles.footerLink}>News & Blogs</a>
                        <a href="#feedback" className={styles.footerLink}>Feedback</a>
                    </div>
                </div>

                <div className={styles.thirdContainer}>
                    <h4 className={styles.footerHeading}>Contact Us</h4>
                    <div className={styles.footerLinks}>
                        <div className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.contactIcon}/>
                            <div className={styles.contactText}>
                                <p>{config?.address?.street + ', ' + config?.address?.eircode + ', ' + config?.address?.city}</p>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <FaPhoneAlt className={styles.contactIcon}/>
                            <div className={styles.contactText}>
                                <p>{config?.phoneNumber?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <FaEnvelope className={styles.contactIcon}/>
                            <div className={styles.contactText}>
                                <p>{config?.email?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyrightBar}>
                <div>© {currentYear} RMS Restaurant. All rights reserved.</div>
                <div>Designed with ♥ for food lovers</div>
            </div>
        </div>
    );
}