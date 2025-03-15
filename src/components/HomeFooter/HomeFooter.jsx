import React, {useContext} from "react";
import "./HomeFooter.css";
import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt} from "react-icons/fa";
import SocialIcons from "../SocialIcons/SocialIcons";
import useCurrentYear from "../../hooks/useCurrentYear";
import {AuthContext} from "../../contexts/AuthContext";

export default function HomeFooter() {
    const { currentYear } = useCurrentYear();
    const {config} = useContext(AuthContext)
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="first-container">
                    <h1>
                        <span style={{ fontFamily: "Lavishly Yours" }}>R</span>
                        <span style={{ color: "white", fontFamily: "Lavishly Yours" }}>M</span>
                        <span style={{ fontFamily: "Lavishly Yours" }}>S</span>
                    </h1>
                    <p>
                        Stay connected with us on social media for updates, special offers, and more.
                        We look forward to serving you again soon!
                    </p>
                    <SocialIcons />
                </div>

                <div className="second-container">
                    <h4 className="footer-heading">Quick Links</h4>
                    <div className="footer-links">
                        <a href="#about" className="footer-link">About Us</a>
                        <a href="#privacy" className="footer-link">Privacy Policy</a>
                        <a href="#careers" className="footer-link">Careers</a>
                        <a href="#features" className="footer-link">Features</a>
                        <a href="#blog" className="footer-link">News & Blogs</a>
                        <a href="#feedback" className="footer-link">Feedback</a>
                    </div>
                </div>

                <div className="third-container">
                    <h4 className="footer-heading">Contact Us</h4>
                    <div className="footer-links">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <div className="contact-text">
                                <p>{config?.address?.street + ', ' + config?.address?.eircode + ', ' + config?.address?.city}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaPhoneAlt className="contact-icon" />
                            <div className="contact-text">
                                <p>{config?.phoneNumber?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <div className="contact-text">
                                <p>{config?.email?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright-bar">
                <div>© {currentYear} RMS Restaurant. All rights reserved.</div>
                <div>Designed with ♥ for food lovers</div>
            </div>
        </div>
    );
}