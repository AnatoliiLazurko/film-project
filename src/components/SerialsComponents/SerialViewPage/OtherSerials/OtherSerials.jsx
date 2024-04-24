import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherSerialsStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleSerialInfoPositioning } from './OtherSerialsScripts';
import axios from 'axios';

const OtherSerials = () => {

    const [series, setSeries] = useState([]);

    const fetchSeries = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=series&apikey=bfec6a42`);
            const moviesData = await Promise.all(
                response.data.Search.slice(0, 6).map(async serial => {
                    const detailedResponse = await axios.get(
                        `http://www.omdbapi.com/?i=${serial.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setSeries(moviesData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

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

    useEffect(() => {
        fetchSeries();
    }, []);

    return (
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other serials</p>

            <div className={styles["list-other-serials"]}>

                {series.map((serial, index) => (
                    <NavLink to={`/serial-view/${serial.Genre.split(',')[0].toLowerCase()}/${serial.imdbID}`} className={styles["serial-card"]} key={index}>
                        <div className={styles["serial-poster"]}>
                            <img src={serial.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["serial-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{serial.Title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {serial.imdbRating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {serial.Year}</p>
                                        <p>Country: {serial.Country}</p>
                                        <p>Genre: {serial.Genre}</p>
                                        <p>Actors: {serial.Actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {serial.Plot}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>1080p</div>
                        </div>
                        <div className={styles["serial-title"]}>{serial.Title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherSerials;