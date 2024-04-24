import React, { useEffect } from 'react';
import styles from "./NewCartoonsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleCartoonInfoPositioning } from './NewCartoonsScripts';
import { NavLink } from 'react-router-dom';

const NewCartoonCard = ({ cartoons }) => {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleCartoonInfoPositioning(event, styles);
        };

        const questionMarks = document.querySelectorAll(`.${styles['question-mark']}`);
        questionMarks.forEach((questionMark) => {
            questionMark.addEventListener('mouseenter', handleMouseEnter);
        });

        return () => {
            questionMarks.forEach((questionMark) => {
                questionMark.removeEventListener('mouseenter', handleMouseEnter);
            });
        };
    }, []);

    return (
        <NavLink to={`/cartoon-view/${cartoons.Genre.split(',')[0].toLowerCase()}/${cartoons.imdbID}`} className={styles["cartoon-card"]}>
            <div className={styles["cartoon-poster"]}>
                <img src={cartoons.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["cartoon-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{cartoons.Title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {cartoons.imdbRating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {cartoons.Year}</p>
                        <p>Country: {cartoons.Country}</p>
                        <p>Genre: {cartoons.Genre}</p>
                        <p>Actors: {cartoons.Actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {cartoons.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["cartoon-title"]}>{cartoons.Title}</div>
        </NavLink>
    );
}

export default NewCartoonCard;
