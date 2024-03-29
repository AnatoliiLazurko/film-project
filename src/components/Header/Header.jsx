import React from 'react';
import styles from "./HeaderStyles.module.css";
import { NavLink } from 'react-router-dom';
import authBtnImage from '../../images/header/ticket-btn.png';
import logo from '../../images/header/logo.png'
import FilmMenu from './DropDownMenus/FilmsMenu/FilmMenu';
import CartoonMenu from './DropDownMenus/CartoonsMenu/CartoonMenu';
import SerialMenu from './DropDownMenus/SerialsMenu/SerialMenu';
import AnimeMenu from './DropDownMenus/AnimeMenu/AnimeMenu';

const Header = () => {

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["header-content"]}>

                    <div className={styles["left-content"]}>
                        <div className={styles["logo"]}>
                            <NavLink to="/home-page"><img className={styles["logo-image"]} src={logo} alt="" /><span>BlahoFilm</span></NavLink>
                        </div>
                        <nav>
                            <ul className={styles["nav-list"]}>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/films'>Films</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <FilmMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/cartoons'>Cartoons</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <CartoonMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/serials'>Serials</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <SerialMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/anime'>Anime</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <AnimeMenu />
                                    </div>
                                </li>
                                <li>
                                    <NavLink className={styles["nav-item"]} to='/selections'>Selections</NavLink>
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