import React, { useEffect } from 'react';
import styles from './ResultListStyles.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleInfoPositioning } from './ResultListScripts';

const ResultList = ({ media, type }) => {

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
    }, [media]);

    return (
        <div className={styles["films-list"]}>
            
            {media.map((media, index) => (
                
                <NavLink to={`/${type}-view/${media.genres[0].name.toLowerCase()}/${media.id}`} className={styles["film-card"]} key={index}>
                    <div className={styles["film-poster"]}>
                        <img src={media.poster ? `data:image/jpeg;base64,${media.poster}` : ''} alt="Poster" />
                        <div className={styles["question-mark"]}>?</div>
                            <div className={styles["film-info"]}>
                                <div className={styles["name-rate"]}>
                                    <h1 className={styles["info-title"]}>{media.title}</h1>
                                    <div className={styles["info-rate"]}>
                                        <span><FontAwesomeIcon icon={faStar} /> {media.rating}/10</span>
                                    </div>
                                </div>
                                <div className={styles["info"]}>
                                    <p>Release year: {new Date(media.dateOfPublish).getFullYear()}</p>
                                    <p>Country: {media.country}</p>
                                    <p>Genre: {media.genres.map(genre => genre.name).join(', ')}</p>
                                    <p>Actors: {media.actors}</p>
                                </div>
                                <div className={styles["info-line"]}></div>
                                <div className={styles["info-description"]}>
                                <h1>Description</h1>
                                <p>
                                    {media.description}
                                </p>
                            </div>
                        </div>
                        <div className={styles["quality"]}>{media.quality}p</div>
                    </div>
                    <div className={styles["film-title"]}>{media.title}</div>
                </NavLink>

            ))}

        </div>
    );
}

export default ResultList;
