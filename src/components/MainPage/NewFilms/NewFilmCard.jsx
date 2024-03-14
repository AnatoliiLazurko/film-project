import React, { useEffect } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleFilmInfoPositioning } from './NewFilmsScripts';

const NewFilmCard = () => {

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
        <div className={styles["film-card"]}>
            <div className={styles["film-poster"]}>
                <img src="https://upload.wikimedia.org/wikipedia/uk/8/82/%D0%9F%D0%B5%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%B4%D0%B0%D1%87_%D0%93%D0%B0%D1%8F_%D0%A0%D1%96%D1%87%D1%96.jpg" alt="" />
                <div className={styles["question-mark"]}>?</div>
                <div className={styles["film-info"]}>
                    <div className={styles["name-rate"]}>
                        <h1 className={styles["info-title"]}>The covenant</h1>
                        <div className={styles["info-rate"]}>
                            <span><FontAwesomeIcon icon={faStar} /> 8.2/10</span>
                        </div>
                    </div>
                    <div className={styles["info"]}>
                        <p>Release year: 2023</p>
                        <p>Country: USA</p>
                        <p>Genre: Action</p>
                        <p>Actors: Jim Carrey, Laura Linney, Noah Emmerick, Natasha McElhone, Holland Taylor</p>
                    </div>
                    <div className={styles["info-line"]}></div>
                    <div className={styles["info-description"]}>
                        <h1>Description</h1>
                        <p>
                            The film "The Truman Show" immerses the viewer in the extraordinary life
                            of Truman Burbank (Jim Carrey) - an ordinary man. He lives in a cute town,
                            has a great job, a loving wife, and a reliable friend. Truman dreams of seeing
                            the world, but his dream cannot come true...
                        </p>
                    </div>
                </div>
                <div className={styles["quality"]}>1080p</div>
            </div>
            <div className={styles["film-title"]}>The covenant </div>
        </div>
    );
}

export default NewFilmCard;
