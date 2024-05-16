import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';

const ViewInfo = ({ filmDetails }) => {

    const [isSaved, setSaved] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    return (
        <div className={styles["view-info"]}>
            <div className={styles["path"]}>
                <NavLink to={'/films'}>Films</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <NavLink to={`/films/${filmDetails.Genre && filmDetails.Genre.split(',')[0].toLowerCase()}`}>{filmDetails.Genre && filmDetails.Genre.split(',')[0]}</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <span>{filmDetails.Title}</span>
            </div>

            <div className={styles["content-info"]}>
                <div className={styles["left-content"]}>
                    <img src={filmDetails.Poster} alt="" />
                </div>
                <div className={styles["right-content"]}>
                    <div className={styles["top-section"]}>
                        <h1 className={styles["title"]}>{filmDetails.Title}</h1>
                        <div className={styles["rate-save-section"]}>
                            <div className={styles["film-rate"]}>
                                <FontAwesomeIcon icon={faStar} /> {filmDetails.imdbRating}/10
                            </div>
                            <div className={styles["save"]} onClick={toSave}>
                                {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                            </div>
                        </div>
                    </div>
                    <p>Quality: 1080p</p>
                    <p>Release year: {filmDetails.Year}</p>
                    <p>Age rating: 12+</p>
                    <p>Country: {filmDetails.Country}</p>
                    <p>Genre: {filmDetails.Genre}</p>
                    <p>Actors: {filmDetails.Actors}</p>

                    <h2 className={styles["plot"]}>{filmDetails.Plot}</h2>
                </div>
            </div>
        </div>
    );
}

export default ViewInfo;
