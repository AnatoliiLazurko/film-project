import React, { useEffect } from 'react';
import styles from "./NewCartoonsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleCartoonInfoPositioning } from './NewCartoonsScripts';
import { NavLink } from 'react-router-dom';

const NewCartoonCard = ({ cartoons }) => {

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleCartoonInfoPositioning(event, styles);
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
    }, [cartoons]);

    return (
        <NavLink to={`/cartoon-view/${cartoons.genres[0].name.toLowerCase().replace(/ /g, '_')}/${cartoons.id}`} className={styles["cartoon-card"]}>
            <div className={styles["cartoon-poster"]}>
                <img src={cartoons.poster ? `data:image/jpeg;base64,${cartoons.poster}` : ''} alt="Poster" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["cartoon-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>{cartoons.title}</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> {cartoons.rating}/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: {new Date(cartoons.dateOfPublish).getFullYear()}</p>
                        <p>Country: {cartoons.country}</p>
                        <p>Genre: {cartoons.genres.map(genre => genre.name).join(', ')}</p>
                        {/* <p>Actors: {cartoons.actors}</p> */}
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            {truncateDescription(cartoons.description, 300)}
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>{cartoons.quality}p</div>
            </div>
            <div className={styles["cartoon-title"]}>{cartoons.title}</div>
        </NavLink>
    );
}

export default NewCartoonCard;
