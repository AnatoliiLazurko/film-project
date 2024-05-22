import React, { useEffect } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleFilmInfoPositioning } from './NewFilmsScripts';
import { NavLink } from 'react-router-dom';

const NewFilmCard = ({ films }) => {

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
        <NavLink to={`/film-view/${films.genres[0].name.toLowerCase()}/${films.id}`} className={styles["film-card"]}>
            <div className={styles["film-poster"]}>
                <img src={`data:image/jpeg;base64,${films.poster}`} alt="" />
                <div className={styles["question-mark"]}>?</div>
                    <div className={styles["film-info"]}>
                        <div className={styles["name-rate"]}>
                            <h1 className={styles["info-title"]}>{films.title}</h1>
                            <div className={styles["info-rate"]}>
                                <span><FontAwesomeIcon icon={faStar} /> {films.rating}/10</span>
                            </div>
                        </div>
                        <div className={styles["info"]}>
                            <p>Release year: {new Date(films.dateOfPublish).getFullYear()}</p>
                            <p>Country: {films.country}</p>
                            <p>Genre: {films.genres.map(genre => genre.name).join(', ')}</p>
                            <p>Actors: {films.actors}</p>
                        </div>
                        <div className={styles["info-line"]}></div>
                        <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {films.description}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["film-title"]}>{films.title}</div>
        </NavLink>
    );
}

export default NewFilmCard;
