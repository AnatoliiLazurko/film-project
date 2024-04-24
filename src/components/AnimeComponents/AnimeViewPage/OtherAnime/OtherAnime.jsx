import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherAnimeStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleAnimeInfoPositioning } from './OtherAnimeScripts';
import axios from 'axios';

const OtherAnime = () => {

    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42`);
            const moviesData = await Promise.all(
                response.data.Search.slice(0, 6).map(async movie => {
                    const detailedResponse = await axios.get(
                        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setMovies(moviesData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

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
    }, [movies]);

    useEffect(() => {

        fetchMovies();
    }, []);

    return (
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other anime</p>

            <div className={styles["list-other-anime"]}>

                {movies.map((movie, index) => (
                    <NavLink to={`/anime/${movie.Genre}/${movie.imdbID}`} className={styles["anime-card"]} key={index}>
                        <div className={styles["anime-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["anime-info"]}>
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
                        <div className={styles["anime-title"]}>{movie.Title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherAnime;