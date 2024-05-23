import React, { useState } from 'react';
import styles from "./HeaderStyles.module.css";
import { NavLink } from 'react-router-dom';
import authBtnImage from '../../images/header/ticket-btn.png';
import logo from '../../images/header/logo.png'
import FilmMenu from './DropDownMenus/FilmsMenu/FilmMenu';
import CartoonMenu from './DropDownMenus/CartoonsMenu/CartoonMenu';
import SerialMenu from './DropDownMenus/SerialsMenu/SerialMenu';
import AnimeMenu from './DropDownMenus/AnimeMenu/AnimeMenu';
import Signup from '../Authorization/Signup/Signup';
import Signin from '../Authorization/Login/Signin';
import Language from './Language/Language';
import HeaderSearch from './HeaderSearch/HeaderSearch';

const Header = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSingUpOpen, setIsSignUpOpen] = useState(false);
    const [isSingInOpen, setIsSignInOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSignInOpen(!isSingUpOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSignUpOpen(false);
        setIsSignInOpen(false);
    };

    const handleOpenSignUp = () => {
        setIsSignUpOpen(!isSingUpOpen);
        setIsSignInOpen(false);
    }

    const handleOpenSignIn = () => {
        setIsSignUpOpen(false);
        setIsSignInOpen(!isSingInOpen);
    }

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["header-content"]}>

                    <div className={styles["left-content"]}>
                        <div className={styles["logo"]}>
                            <NavLink to="/"><img className={styles["logo-image"]} src={logo} alt="" /><span>BlahoFilm</span></NavLink>
                        </div>
                        <nav>
                            <ul className={styles["nav-list"]}>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/films/genre=u/studio=u/date=u/popular=u/1'>Films</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <FilmMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/cartoons/category=u/animation=u/studio=u/date=u/popular=u/1'>Cartoons</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <CartoonMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/serials/genre=u/studio=u/date=u/popular=u/1'>Serials</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <SerialMenu />
                                    </div>
                                </li>
                                <li className={styles["dropdown"]}>
                                    <NavLink className={styles["nav-item"]} to='/anime/genre=u/date=u/popular=u/1'>Anime</NavLink>
                                    <div className={styles["dropdown-content"]}>
                                        <AnimeMenu />
                                    </div>
                                </li>
                                <li>
                                    <NavLink className={styles["nav-item"]} to='/selections/films'>Selections</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className={styles["right-content"]}>
                        <HeaderSearch />
                        <Language />
                        {!isAuth &&
                            <div className={styles["btn-auth"]} onClick={toggleModal}>
                                <img className={styles["ticket-picture"]} src={authBtnImage} alt="" />
                                <div className={styles["btn-text"]}>Sign in</div>
                            </div>
                        }
                        {isAuth &&
                            <NavLink to={'/profile'}>
                                <div className={styles["btn-auth"]}>
                                    <img className={styles["ticket-picture"]} src={authBtnImage} alt="" />
                                    <div className={styles["btn-text"]}>Profile</div>
                                </div>
                            </NavLink>
                        }
                    </div>
                </div>
            </header>

            {isModalOpen &&
                <>
                    {isSingUpOpen && <Signup closeModal={handleCloseModal} openSignIn={handleOpenSignIn} />}
                    {isSingInOpen && <Signin closeModal={handleCloseModal} openSignUp={handleOpenSignUp} />}
                
                </>
            }
        </>
    );
}

export default Header;