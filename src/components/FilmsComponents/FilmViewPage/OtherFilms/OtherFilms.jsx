import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherFilmsStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleFilmInfoPositioning } from './OtherFilmsScripts';

const OtherFilms = ({ films }) => {

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
    }, [films]);

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other films</p>

            <div className={styles["list-other-films"]}>

                {films.map((film, index) => (
                    <NavLink to={`/film-view/${film.genres?.[0]?.name?.toLowerCase() ?? ''}/${film.id}`} className={styles["film-card"]} key={index}>
                        <div className={styles["film-poster"]}>
                            <img src={film.poster ? `data:image/jpeg;base64,${film.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["film-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{film.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {film.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(film.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {film.country}</p>
                                        <p>Genre: {film.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                                        <p>Actors: {film.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {truncateDescription(film.description)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{film.quality}p</div>
                        </div>
                        <div className={styles["film-title"]}>{film.title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherFilms;
