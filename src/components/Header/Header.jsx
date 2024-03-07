import React from 'react';
import styles from "./HeaderStyles.module.css";
import { NavLink } from 'react-router-dom';
import authBtnImage from '../../images/ticket-btn.png';
import logo from '../../images/logo.png'

const Header = () => {

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["header-content"]}>

                    <div className={styles["left-content"]}>
                        <div className={styles["logo"]}>
                            <NavLink to="/main-page"><img className={styles["logo-image"]} src={logo} alt="" /><span>BlahoFilm</span></NavLink>
                        </div>
                        <nav>
                            <ul className={styles["nav-list"]}>
                                <li className={styles["dropdown"]}>
                                    <NavLink to='/films'>Films</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <div>Films</div>
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink to='/cartoons'>Cartoons</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <span>Cartoons</span>
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink to='/serials'>Serials</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <span>Serials</span>
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink to='/anime'>Anime</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <span>Anime</span>
                                    </div>
                                </li>
                                <li>
                                    <NavLink to='/selections'>Selections</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className={styles["right-content"]}>
                        <div className={styles["dropdown-lenguage"]}>
                            <span>Eng</span>
                            <div className={styles["dropdown-lenguage-content"]}>
                                <span>English</span>
                                <span>Ukrainian</span>
                            </div>
                        </div>
                        <div className={styles["btn-auth"]}>
                            <img className={styles["ticket-picture"]} src={authBtnImage} alt="" />
                            <div className={styles["btn-text"]}>
                                Sign up
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;