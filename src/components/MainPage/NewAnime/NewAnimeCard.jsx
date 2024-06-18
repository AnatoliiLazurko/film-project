import React, { useEffect } from 'react';
import styles from "./NewAnimeStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleAnimeInfoPositioning } from './NewAnimeScripts';
import { NavLink } from 'react-router-dom';

const NewAnimeCard = ({ anime }) => {

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
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
    }, [anime]);

    return (
        <NavLink to={`/anime-view/${anime.genres[0].name.toLowerCase().replace(/ /g, '_')}/${anime.id}`} className={styles["anime-card"]}>
            <div className={styles["anime-poster"]}>
                <img src={anime.poster ? `data:image/jpeg;base64,${anime.poster}` : ''} alt="Poster" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["anime-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{anime.title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {anime.rating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {new Date(anime.dateOfPublish).getFullYear()}</p>
                        <p>Country: {anime.country}</p>
                        <p>Genre: {anime.genres.map(genre => genre.name).join(', ')}</p>
                        <p>Actors: {anime.actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {truncateDescription(anime.description, 300)}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>{anime.quality}p</div>
            </div>
            <div className={styles["anime-title"]}>{anime.title}</div>
        </NavLink>
    );
}

export default NewAnimeCard;
