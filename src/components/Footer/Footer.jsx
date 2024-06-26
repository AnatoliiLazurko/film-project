import React from 'react';
import styles from "./FooterStyles.module.css";
import facebook_logo from "../../images/footer/facebook.png";
import instagram_logo from "../../images/footer/instagram.png";
import youtube_logo from "../../images/footer/youtube.png";
import telegram_logo from "../../images/footer/telegram.png";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
    return (
        <>
            <footer className={styles["footer"]}> 
                <div className={styles["footer-content"]}>

                    <div className={styles["left-content"]}>
                        <div className={styles["social-media"]}>
                            <a href="#facebook"><img src={facebook_logo} alt="" /></a>
                            <a href="#instagram"><img src={instagram_logo} alt="" /></a>
                            <a href="#youtube"><img src={youtube_logo} alt="" /></a>
                            <a href="#telegram"><img src={telegram_logo} alt="" /></a>
                        </div>
                        <nav className={styles["nav-list"]}>
                            <NavLink to={'/rools/privacy-policy'} className={styles["nav-item"]}>Privacy Policy</NavLink>

                            <NavLink to={'/rools/terms-conditions'} className={styles["nav-item"]}>Terms&Conditions</NavLink>

                            <NavLink to={'/rools/cookie-policy'} className={styles["nav-item"]}>Cookies</NavLink>

                            <NavLink to={'/donate'} className={styles["nav-item"]}>Donate</NavLink>
                        </nav>
                    </div>
                    <div className={styles["right-content"]}>
                        <p>Copyright BlahoFilm <FontAwesomeIcon icon={faCopyright}/> 2024</p>
                    </div>

                </div>
            </footer>
        </>
    );
}

export default Footer;