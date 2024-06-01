import React, { useEffect } from 'react';
import styles from "./NewSerialsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleSerialInfoPositioning } from './NewSerialsScripts';
import { NavLink } from 'react-router-dom';

const NewSerialCard = ({ serials }) => {

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
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
    }, [serials]);

    return (
        <NavLink to={`/serial-view/${serials.genres[0].name.toLowerCase()}/${serials.id}`} className={styles["serial-card"]}>
            <div className={styles["serial-poster"]}>
                <img src={serials.poster ? `data:image/jpeg;base64,${serials.poster}` : ''} alt="Poster" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["serial-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{serials.title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {serials.rating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {new Date(serials.dateOfPublish).getFullYear()}</p>
                        <p>Country: {serials.country}</p>
                        <p>Genre: {serials.genres.map(genre => genre.name).join(', ')}</p>
                        <p>Actors: {serials.actors}</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {truncateDescription(serials.description, 300)}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>{serials.quality}p</div>
            </div>
            <div className={styles["serial-title"]}>{serials.title}</div>
        </NavLink>
    );
}

export default NewSerialCard;
