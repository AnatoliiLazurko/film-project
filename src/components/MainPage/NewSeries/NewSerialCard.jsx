import React, { useEffect } from 'react';
import styles from "./NewSeriesStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleSerialInfoPositioning } from './NewSeriesScripts';
import { NavLink } from 'react-router-dom';

const NewSerialCard = ({ series }) => {

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
    }, []);

    return (
        <NavLink to={`/serial/${series.Genre}/${series.imdbID}`} className={styles["serial-card"]}>
            <div className={styles["serial-poster"]}>
                <img src={series.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["serial-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{series.Title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {series.imdbRating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {series.Year}</p>
                        <p>Country: {series.Country}</p>
                        <p>Genre: {series.Genre}</p>
                        <p>Actors: {series.Actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {series.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["serial-title"]}>{series.Title}</div>
        </NavLink>
    );
}

export default NewSerialCard;
