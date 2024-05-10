import React, { useState } from 'react';
import styles from "./HeaderStyles.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import authBtnImage from '../../images/header/ticket-btn.png';
import logo from '../../images/header/logo.png'
import FilmMenu from './DropDownMenus/FilmsMenu/FilmMenu';
import CartoonMenu from './DropDownMenus/CartoonsMenu/CartoonMenu';
import SerialMenu from './DropDownMenus/SerialsMenu/SerialMenu';
import AnimeMenu from './DropDownMenus/AnimeMenu/AnimeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Signup from '../Authorization/Signup/Signup';
import Signin from '../Authorization/Login/Signin';

const Header = () => {

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSingUpOpen, setIsSignUpOpen] = useState(false);
    const [isSingInOpen, setIsSignInOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [language, setLanguage] = useState('English');
    const navigate = useNavigate();

    const toggleVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

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

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search/${inputValue}`);
        setIsSearchVisible(false);
        setInputValue('');
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
                                    <NavLink className={styles["nav-item"]} to='/selections/films'>Selections</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className={styles["right-content"]}>
                        <div className={styles["search"]}>
                            {!isSearchVisible && <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleVisibility} />}
                            {isSearchVisible && 
                                <div className={styles["search-field"]}>
                                    <div className={styles["search-btn"]} onClick={handleSearch}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input className={styles["search-input"]} type="text" placeholder='Search' value={inputValue} onChange={handleChange}/>
                                </div>
                            }
                            
                        </div>
                        <div className={styles["dropdown-lenguage"]}>
                            {language === 'English' && <span>Eng</span>}
                            {language === 'Ukrainian' && <span>Ukr</span>}
                            <div className={styles["dropdown-lenguage-content"]}>
                                <span onClick={() => {setLanguage('English')}}>English</span>
                                <span onClick={() => {alert('Under development...')}}>Ukrainian</span>
                            </div>
                        </div>
                        <div className={styles["btn-auth"]} onClick={toggleModal}>
                            <img className={styles["ticket-picture"]} src={authBtnImage} alt="" />
                            <div className={styles["btn-text"]}>Sign in</div>
                        </div>
                    </div>
                </div>
            </header>

            {isModalOpen &&
                <>
                    <div className={styles["screen-dimming"]}></div>
                    {isSingUpOpen && <Signup closeModal={handleCloseModal} openSignIn={handleOpenSignIn} />}
                    {isSingInOpen && <Signin closeModal={handleCloseModal} openSignUp={handleOpenSignUp} />}
                
                </>
            }
        </>
    );
}

export default Header;