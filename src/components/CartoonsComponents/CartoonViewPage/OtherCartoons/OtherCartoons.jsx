import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherCartoonsStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleCartoonInfoPositioning } from './OtherCartoonsScripts';

const OtherCartoons = ({ cartoons }) => {

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

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other cartoons</p>

            <div className={styles["list-other-cartoons"]}>

                {cartoons.map((cartoon, index) => (
                    <NavLink to={`/cartoon-view/${cartoon.genres?.[0]?.name?.toLowerCase() ?? ''}/${cartoon.id}`} className={styles["cartoon-card"]} key={index}>
                        <div className={styles["cartoon-poster"]}>
                            <img src={cartoon.poster ? `data:image/jpeg;base64,${cartoon.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["cartoon-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{cartoon.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {cartoon.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(cartoon.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {cartoon.country}</p>
                                        <p>Genre: {cartoon.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                                        <p>Actors: {cartoon.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {truncateDescription(cartoon.description, 300)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{cartoon.quality}p</div>
                        </div>
                        <div className={styles["cartoon-title"]}>{cartoon.title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherCartoons;
