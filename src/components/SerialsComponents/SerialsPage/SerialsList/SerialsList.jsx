import React, { useEffect, useState } from 'react';
import styles from './SerialsListStyles.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { handleSerialInfoPositioning } from './SerialsListScripts';

const SerialsList = () => {

    const [series, setSeries] = useState([]);

    useEffect(() => {
        async function fetchseries() {
            try {
                let fetchedSeries = [];

                for (let page = 1; page <= 5; page++) {
                    const response = await axios.get('http://www.omdbapi.com/', {
                        params: {
                            apikey: 'bfec6a42',
                            s: 'series',
                            type: 'series',
                            r: 'json',
                            page: page,
                            pageSize: 10
                        }
                    });

                    if (response.data.Search) {
                        fetchedSeries = fetchedSeries.concat(response.data.Search);
                    }
                }

                const seriesWithDetails = await Promise.all(
                    fetchedSeries.map(async movie => {
                        const detailsResponse = await axios.get('http://www.omdbapi.com/', {
                        params: {
                            apikey: 'bfec6a42',
                            i: movie.imdbID,
                            r: 'json'
                        }
                        });
                        return detailsResponse.data;
                    })
                );

                setSeries(seriesWithDetails);
            } catch (error) {
                console.error('Error fetching series:', error);
            }
        }

        fetchseries();
    }, []);

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleSerialInfoPositioning(event, styles);
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
    }, [series]);


    return (
        <>
            <div className={styles["serials-list"]}>
            
                {series.map((movie, index) => (
                    
                    <NavLink to={`/serial-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["serial-card"]} key={index}>
                        <div className={styles["serial-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["serial-info"]}>
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
                        <div className={styles["serial-title"]}>{movie.Title}</div>
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
        </>
    );
}

export default SerialsList;