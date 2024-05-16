import React, { useEffect } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleFilmInfoPositioning } from './NewFilmsScripts';
import { NavLink } from 'react-router-dom';

const NewFilmCard = ({ films }) => {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleFilmInfoPositioning(event, styles);
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
        <NavLink to={`/film-view/${films.Genre.split(',')[0].toLowerCase()}/${films.imdbID}`} className={styles["film-card"]}>
            <div className={styles["film-poster"]}>
                <img src={films.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                    <div className={styles["film-info"]}>
                        <div className={styles["name-rate"]}>
                            <h1 className={styles["info-title"]}>{films.Title}</h1>
                            <div className={styles["info-rate"]}>
                                <span><FontAwesomeIcon icon={faStar} /> {films.imdbRating}/10</span>
                            </div>
                        </div>
                        <div className={styles["info"]}>
                            <p>Release year: {films.Year}</p>
                            <p>Country: {films.Country}</p>
                            <p>Genre: {films.Genre}</p>
                            <p>Actors: {films.Actors}</p>
                        </div>
                        <div className={styles["info-line"]}></div>
                        <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {films.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["film-title"]}>{films.Title}</div>
        </NavLink>
    );
}

export default NewFilmCard;
