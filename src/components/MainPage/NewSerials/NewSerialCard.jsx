import React, { useEffect } from 'react';
import styles from "./NewSerialsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleSerialInfoPositioning } from './NewSerialsScripts';
import { NavLink } from 'react-router-dom';

const NewSerialCard = ({ serials }) => {

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
        <NavLink to={`/serial-view/${serials.Genre.split(',')[0].toLowerCase()}/${serials.imdbID}`} className={styles["serial-card"]}>
            <div className={styles["serial-poster"]}>
                <img src={serials.Poster} alt="" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["serial-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{serials.Title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {serials.imdbRating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {serials.Year}</p>
                        <p>Country: {serials.Country}</p>
                        <p>Genre: {serials.Genre}</p>
                        <p>Actors: {serials.Actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {serials.Plot}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["serial-title"]}>{serials.Title}</div>
        </NavLink>
    );
}

export default NewSerialCard;
