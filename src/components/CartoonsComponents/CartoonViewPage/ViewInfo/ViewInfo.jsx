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

const ViewInfo = ({ cartoonDetails }) => {

    const { isAuth } = useAuth();

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);
    const [isAuthPrompt, setIsAuthPrompt] = useState(false);

    const [bookedList, setBookedList] = useState([]);

    useEffect(() => {
        const fetchBooked = async () => {
            try {
                const response = await axios.get(USER_ENDPOINTS.isBooked, { withCredentials: true });
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
            const isBookmarked = bookedList.some(media => media.mediaId === cartoonDetails.id);
            setSaved(isBookmarked);
        }
    }, [bookedList]);

    const toSave = async () => {
        if (isAuth) {
            setSaved(!isSaved);

            try {
                await axios.post(USER_ENDPOINTS.makeBook, {
                    mediaId: cartoonDetails.id,
                    mediaTypeId: 3
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

    const rateCartoon = () => {
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
                    <NavLink to={'/cartoons/category=u/animation=u/studio=u/date=u/popular=u/1'}>Cartoons</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/cartoons/${cartoonDetails.categories?.[0]?.name?.toLowerCase() ?? ''}/animation=u/studio=u/date=u/popular=u/1'`}>
                        {cartoonDetails.categories?.[0]?.name ?? ''}
                    </NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{cartoonDetails.title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={cartoonDetails.poster ? `data:image/jpeg;base64,${cartoonDetails.poster}` : ''} alt="Poster" />
                    </div>
                    <div className={styles["right-content"]}>
                        <div className={styles["top-section"]}>
                            <h1 className={styles["title"]}>{cartoonDetails.title}</h1>
                            <div className={styles["rate-save-section"]}>
                                <div className={styles["cartoon-rate"]} onClick={rateCartoon}>
                                    <FontAwesomeIcon icon={faStar} /> {cartoonDetails.rating}/10
                                </div>
                                <div className={styles["save"]} onClick={toSave}>
                                    {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                    {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                                </div>
                            </div>
                        </div>
                        <p>Quality: {cartoonDetails.quality}p</p>
                        <p>Release year: {new Date(cartoonDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {cartoonDetails.ageRestriction}+</p>
                        <p>Country: {cartoonDetails.country}</p>
                        <p>Genre: {cartoonDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {cartoonDetails.actors}</p>

                        <h2 className={styles["plot"]}>{cartoonDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'cartoon'} media={cartoonDetails} setIsRating={setIsRating} />}
            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default ViewInfo;
