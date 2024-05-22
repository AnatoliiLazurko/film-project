import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';

const ViewInfo = ({ filmDetails }) => {

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    const rateFilm = () => {
        setIsRating(true);
    };

    return (
        <>
            <div className={styles["view-info"]}>
                <div className={styles["path"]}>
                    <NavLink to={'/films'}>Films</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/films/${filmDetails.genres?.[0]?.name?.toLowerCase() ?? ''}/studio=u/date=u/popular=u/1`}>{filmDetails.genres?.[0]?.name ?? ''}</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{filmDetails.title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={`data:image/jpeg;base64,${filmDetails.poster}`} alt="" />
                    </div>
                    <div className={styles["right-content"]}>
                        <div className={styles["top-section"]}>
                            <h1 className={styles["title"]}>{filmDetails.title}</h1>
                            <div className={styles["rate-save-section"]}>
                                <div className={styles["film-rate"]} onClick={rateFilm}>
                                    <FontAwesomeIcon icon={faStar} /> {filmDetails.rating}/10
                                </div>
                                <div className={styles["save"]} onClick={toSave}>
                                    {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                    {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                                </div>
                            </div>
                        </div>
                        <p>Quality: 1080p</p>
                        <p>Release year: {new Date(filmDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {filmDetails.ageRestriction}</p>
                        <p>Country: {filmDetails.country}</p>
                        <p>Genre: {filmDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {filmDetails.actors}</p>

                        <h2 className={styles["plot"]}>{filmDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'film'} setIsRating={setIsRating} />}
        </>
    );
}

export default ViewInfo;
