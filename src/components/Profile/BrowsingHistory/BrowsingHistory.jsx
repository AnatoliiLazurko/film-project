import React, { useEffect, useState } from 'react';
import styles from './BrowsingHistoryStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { handleInfoPositioning } from './HistoryScripts';

const BrowsingHistory = () => {

    const [sortHistory, setSortHistory] = useState('recent');

    const handleRecentHistory = () => {
        setSortHistory('recent');
    }

    const handleWeekHistory = () => {
        setSortHistory('week');
    }

    const handleMonthHistory = () => {
        setSortHistory('month');
    }

    const [movies, setmovie] = useState([]);

    const fetchmovie = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42`);
            const movieData = await Promise.all(
                response.data.Search.map(async movie => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setmovie(movieData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

    useEffect(() => {
        fetchmovie();
    }, []);

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
        <div className={styles["browsing-history"]}>
            
            <div className={styles["sort-history"]}>
                <p className={`${sortHistory === 'recent' ? styles["active"] : ''}`} onClick={handleRecentHistory}>Recent</p>
                <p className={`${sortHistory === 'week' ? styles["active"] : ''}`} onClick={handleWeekHistory}>Week</p>
                <p className={`${sortHistory === 'month' ? styles["active"] : ''}`} onClick={handleMonthHistory}>Month</p>
            </div>

            <div className={styles["history-list"]}>

                {movies.map((movie, index) => (
                    <NavLink to={`/film-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["film-card"]} key={index}>
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

            <div className={styles["pagination-section"]}>
                <FontAwesomeIcon icon={faChevronLeft} className={`${styles["pagin-arrow"]} ${styles["inactive-arrow"]}`} />
                <div className={`${styles["pagination-btn"]} ${styles["pagin-active-btn"]}`}>1</div>
                <div className={styles["pagination-btn"]}>2</div>
                <div className={styles["pagination-btn"]}>3</div>
                <div className={styles["pagination-btn"]}>...</div>
                <FontAwesomeIcon icon={faChevronRight} className={styles["pagin-arrow"]} />
            </div>

        </div>
    );
}

export default BrowsingHistory;
