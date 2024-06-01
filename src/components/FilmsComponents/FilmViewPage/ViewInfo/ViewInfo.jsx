import React, { useEffect, useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';
import useAuth from '../../../../hooks/useAuth';
import AuthPrompt from '../../../Technicall/Auth/AuthPrompt';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../../../constants/userEndpoints';

const ViewInfo = ({ filmDetails }) => {

    const { isAuth } = useAuth();

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);
    const [isAuthPrompt, setIsAuthPrompt] = useState(false);

    const [bookedList, setBookedList] = useState([]);

    useEffect(() => {
        const fetchBooked = async () => {
            try {
                const response = await axios.get(USER_ENDPOINTS.isBooked, {
                    withCredentials: true
                });
                setBookedList(response.data);
            } catch (error) {
                //console.error('Getting booked list error: ' + error);
            }
        };

        if (isAuth) {
            fetchBooked();
        }
    }, [isAuth]);

    useEffect(() => {
        if (bookedList.length > 0) {
            const isBookmarked = bookedList.some(media => media.mediaId === filmDetails.id);
            setSaved(isBookmarked);
        }
    }, [bookedList]);

    const toSave = async () => {
        if (isAuth) {
            setSaved(!isSaved);

            try {
                await axios.post(USER_ENDPOINTS.makeBook, {
                    mediaId: filmDetails.id,
                    mediaTypeId: 1
                }, {
                    withCredentials: true
                });
            } catch (error) {
                console.log('Anime book error: ' + error);
            }

        } else {
            setIsAuthPrompt(true);
        }
    };

    const rateFilm = async () => {
        if (isAuth) {
            setIsRating(true);
        } else {
            setIsAuthPrompt(true);
        }
    };

    return (
        <>
            <div className={styles["view-info"]}>
                <div className={styles["path"]}>
                    <NavLink to={'/films/genre=u/studio=u/date=u/popular=u/1'}>Films</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/films/${filmDetails.genres?.[0]?.name?.toLowerCase() ?? ''}/studio=u/date=u/popular=u/1`}>
                        {filmDetails.genres?.[0]?.name ?? ''}
                    </NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{filmDetails.title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={filmDetails.poster ? `data:image/jpeg;base64,${filmDetails.poster}` : ''} alt="Poster" />
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
                        <p>Quality: {filmDetails.quality}p</p>
                        <p>Release year: {new Date(filmDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {filmDetails.ageRestriction}+</p>
                        <p>Country: {filmDetails.country}</p>
                        <p>Genre: {filmDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {filmDetails.actors}</p>

                        <h2 className={styles["plot"]}>{filmDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'film'} media={filmDetails} setIsRating={setIsRating} />}
            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default ViewInfo;
