import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./CarouselStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CarouselCard = ({ movies }) => {
    return (
        <article>
            <NavLink to={`/film/${movies.Genre}/${movies.imdbID}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={movies.Poster} alt={movies.Title} />
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
                    </div>
                    <div className={styles["quality"]}>1080p</div>
                </div>
            </NavLink>
            <NavLink to={`/film/${movies.Genre}/${movies.imdbID}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={movies.Poster} alt={movies.Title} />
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
                    </div>
                    <div className={styles["quality"]}>1080p</div>
                </div>
            </NavLink>
            <NavLink to={`/film/${movies.Genre}/${movies.imdbID}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={movies.Poster} alt={movies.Title} />
                    <div className={styles["question-mark"]}>?</div>
                    <div className={`${styles["film-info"]} ${styles["film-info-left"]}`}>
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
                    </div>
                    <div className={styles["quality"]}>1080p</div>
                </div>
            </NavLink>
        </article>
    );
}

export default CarouselCard;
