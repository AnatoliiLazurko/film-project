import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';

const ViewInfo = ({ cartoonDetails }) => {

    const [isSaved, setSaved] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    return (
        <div className={styles["view-info"]}>
            <div className={styles["path"]}>
                <NavLink to={'/cartoons'}>Cartoons</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <NavLink to={`/cartoons/${cartoonDetails.Genre && cartoonDetails.Genre.split(',')[0].toLowerCase()}`}>{cartoonDetails.Genre && cartoonDetails.Genre.split(',')[0]}</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <span>{cartoonDetails.Title}</span>
            </div>

            <div className={styles["content-info"]}>
                <div className={styles["left-content"]}>
                    <img src={cartoonDetails.Poster} alt="" />
                </div>
                <div className={styles["right-content"]}>
                    <div className={styles["top-section"]}>
                        <h1 className={styles["title"]}>{cartoonDetails.Title}</h1>
                        <div className={styles["rate-save-section"]}>
                            <div className={styles["cartoon-rate"]}>
                                <FontAwesomeIcon icon={faStar} /> {cartoonDetails.imdbRating}/10
                            </div>
                            <div className={styles["save"]} onClick={toSave}>
                                {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                            </div>
                        </div>
                    </div>
                    <p>Quality: 1080p</p>
                    <p>Release year: {cartoonDetails.Year}</p>
                    <p>Age rating: 12+</p>
                    <p>Country: {cartoonDetails.Country}</p>
                    <p>Genre: {cartoonDetails.Genre}</p>
                    <p>Actors: {cartoonDetails.Actors}</p>

                    <h2 className={styles["plot"]}>{cartoonDetails.Plot}</h2>
                </div>
            </div>
        </div>
    );
}

export default ViewInfo;
