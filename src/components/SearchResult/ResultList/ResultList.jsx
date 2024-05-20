import React, { useEffect } from 'react';
import styles from './ResultListStyles.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleInfoPositioning } from './ResultListScripts';

const ResultList = ({ movies, type }) => {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleInfoPositioning(event, styles);
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
    }, [movies]);

    return (
        <div className={styles["films-list"]}>
            
            {movies.map((movie, index) => (
                
                <NavLink to={`/${type}-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["film-card"]} key={index}>
                    <div className={styles["film-poster"]}>
                        <img src={movie.Poster} alt="" />
                        <div className={styles["question-mark"]}>?</div>
                            <div className={styles["film-info"]}>
                                <div className={styles["name-rate"]}>
                                    <h1 className={styles["info-title"]}>{movie.Title}</h1>
                                    <div className={styles["info-rate"]}>
                                        <span><FontAwesomeIcon icon={faStar} /> {movie.imdbRating}/10</span>
                                    </div>
                                </div>
                                <div className={styles["info"]}>
                                    <p>Release year: {movie.Year}</p>
                                    <p>Country: {movie.Country}</p>
                                    <p>Genre: {movie.Genre}</p>
                                    <p>Actors: {movie.Actors}</p>
                                </div>
                                <div className={styles["info-line"]}></div>
                                <div className={styles["info-description"]}>
                                <h1>Description</h1>
                                <p>
                                    {movie.Plot}
                                </p>
                            </div>
                        </div>
                        <div className={styles["quality"]}>1080p</div>
                    </div>
                    <div className={styles["film-title"]}>{movie.Title}</div>
                </NavLink>

            ))}

        </div>
    );
}

export default ResultList;
