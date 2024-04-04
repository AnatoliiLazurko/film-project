import React, { useEffect } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleFilmInfoPositioning } from './NewFilmsScripts';
import { NavLink } from 'react-router-dom';

const NewFilmCard = ({ movies }) => {

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
        <NavLink to={`/film/${movies.Genre}/${movies.imdbID}`} className={styles["film-card"]}>
            <div className={styles["film-poster"]}>
                <img src={movies.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                    <div className={styles["film-info"]}>
                        <div className={styles["name-rate"]}>
                            <h1 className={styles["info-title"]}>{movies.Title}</h1>
                            <div className={styles["info-rate"]}>
                                <span><FontAwesomeIcon icon={faStar} /> {movies.imdbRating}/10</span>
                            </div>
                        </div>
                        <div className={styles["info"]}>
                            <p>Release year: {movies.Year}</p>
                            <p>Country: {movies.Country}</p>
                            <p>Genre: {movies.Genre}</p>
                            <p>Actors: {movies.Actors}</p>
                        </div>
                        <div className={styles["info-line"]}></div>
                        <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {movies.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["film-title"]}>{movies.Title}</div>
        </NavLink>
    );
}

export default NewFilmCard;
