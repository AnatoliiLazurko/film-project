import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';

const ViewInfo = ({ animeDetails }) => {

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    const rateAnime = () => {
        setIsRating(true);
    };

    return (
        <>
            <div className={styles["view-info"]}>
                <div className={styles["path"]}>
                    <NavLink to={'/anime/genre=u/date=u/popular=u/1'}>Anime</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/anime/${animeDetails.genres?.[0]?.name?.toLowerCase() ?? ''}/date=u/popular=u/1`}>{animeDetails.genres?.[0]?.name ?? ''}</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{animeDetails.title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={animeDetails.poster ? `data:image/jpeg;base64,${animeDetails.poster}` : ''} alt="Poster" />
                    </div>
                    <div className={styles["right-content"]}>
                        <div className={styles["top-section"]}>
                            <h1 className={styles["title"]}>{animeDetails.title}</h1>
                            <div className={styles["rate-save-section"]}>
                                <div className={styles["anime-rate"]} onClick={rateAnime}>
                                    <FontAwesomeIcon icon={faStar} /> {animeDetails.rating}/10
                                </div>
                                <div className={styles["save"]} onClick={toSave}>
                                    {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                    {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                                </div>
                            </div>
                        </div>
                        <p>Quality: 1080p</p>
                        <p>Release year: {new Date(animeDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {animeDetails.ageRestriction}+</p>
                        <p>Country: {animeDetails.country}</p>
                        <p>Genre: {animeDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {animeDetails.actors}</p>

                        <h2 className={styles["plot"]}>{animeDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'anime'} setIsRating={setIsRating} />}
        </>
    );
}

export default ViewInfo;
