import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './OtherSerialsStyles.module.css';
import { NavLink } from 'react-router-dom';
import { handleSerialInfoPositioning } from './OtherSerialsScripts';

const OtherSerials = ({ serials }) => {

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

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className={styles["other-section"]}>
            <p className={styles["other-txt"]}>Other serials</p>

            <div className={styles["list-other-serials"]}>

                {serials.map((serial, index) => (
                    <NavLink to={`/serial-view/${serial.genres?.[0]?.name?.toLowerCase() ?? ''}/${serial.id}`} className={styles["serial-card"]} key={index}>
                        <div className={styles["serial-poster"]}>
                            <img src={serial.poster ? `data:image/jpeg;base64,${serial.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["serial-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{serial.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {serial.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(serial.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {serial.country}</p>
                                        <p>Genre: {serial.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                                        <p>Actors: {serial.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {truncateDescription(serial.description, 300)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{serial.quality}p</div>
                        </div>
                        <div className={styles["serial-title"]}>{serial.title}</div>
                    </NavLink>
                ))}
                
            </div>
        </div>
    );
}

export default OtherSerials;