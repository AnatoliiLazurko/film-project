import React, { useEffect } from 'react';
import styles from "./NewAnimeStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleAnimeInfoPositioning } from './NewAnimeScripts';
import { NavLink } from 'react-router-dom';

const NewAnimeCard = ({ anime }) => {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleAnimeInfoPositioning(event, styles);
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
        <NavLink to={`/anime/${anime.Genre}/${anime.imdbID}`} className={styles["anime-card"]}>
            <div className={styles["anime-poster"]}>
                <img src={anime.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["anime-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{anime.Title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {anime.imdbRating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {anime.Year}</p>
                        <p>Country: {anime.Country}</p>
                        <p>Genre: {anime.Genre}</p>
                        <p>Actors: {anime.Actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {anime.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["anime-title"]}>{anime.Title}</div>
        </NavLink>
    );
}

export default NewAnimeCard;
