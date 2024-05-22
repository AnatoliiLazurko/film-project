import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';

const ViewInfo = ({ animeDetails }) => {

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    const rateAnime = () => {
        setIsRating(true);
    };

    return (
        <>
            <div className={styles["view-info"]}>
                <div className={styles["path"]}>
                    <NavLink to={'/anime'}>Anime</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/anime/${animeDetails.Genre && animeDetails.Genre.split(',')[0].toLowerCase()}`}>{animeDetails.Genre && animeDetails.Genre.split(',')[0]}</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{animeDetails.Title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={animeDetails.Poster} alt="" />
                    </div>
                    <div className={styles["right-content"]}>
                        <div className={styles["top-section"]}>
                            <h1 className={styles["title"]}>{animeDetails.Title}</h1>
                            <div className={styles["rate-save-section"]}>
                                <div className={styles["anime-rate"]} onClick={rateAnime}>
                                    <FontAwesomeIcon icon={faStar} /> {animeDetails.imdbRating}/10
                                </div>
                                <div className={styles["save"]} onClick={toSave}>
                                    {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                    {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                                </div>
                            </div>
                        </div>
                        <p>Quality: 1080p</p>
                        <p>Release year: {animeDetails.Year}</p>
                        <p>Age rating: 12+</p>
                        <p>Country: {animeDetails.Country}</p>
                        <p>Genre: {animeDetails.Genre}</p>
                        <p>Actors: {animeDetails.Actors}</p>

                        <h2 className={styles["plot"]}>{animeDetails.Plot}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'anime'} setIsRating={setIsRating} />}
        </>
    );
}

export default ViewInfo;
