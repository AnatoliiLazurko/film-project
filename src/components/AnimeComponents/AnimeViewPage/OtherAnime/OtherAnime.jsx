import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherAnimeStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleAnimeInfoPositioning } from './OtherAnimeScripts';

const OtherAnime = ({ anime }) => {

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
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other anime</p>

            <div className={styles["list-other-anime"]}>

                {anime.map((anime, index) => (
                    <NavLink to={`/anime-view/${anime.genres?.[0]?.name?.toLowerCase() ?? ''}/${anime.id}`} className={styles["anime-card"]} key={index}>
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
                                        <p>Genre: {anime.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                                        <p>Actors: {anime.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {anime.description}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>1080p</div>
                        </div>
                        <div className={styles["anime-title"]}>{anime.title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherAnime;
