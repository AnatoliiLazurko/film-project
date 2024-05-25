import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';
import useAuth from '../../../../hooks/useAuth';
import AuthPrompt from '../../../Technicall/Auth/AuthPrompt';

const ViewInfo = ({ cartoonDetails }) => {

    const { isAuth } = useAuth();

    const [isSaved, setSaved] = useState(false);
    const [isRating, setIsRating] = useState(false);
    const [isAuthPrompt, setIsAuthPrompt] = useState(false);

    const toSave = () => {
        if (isAuth) {
            setSaved(!isSaved);
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
                    <NavLink to={`/cartoons/${cartoonDetails.genres?.[0]?.name?.toLowerCase() ?? ''}/animation=u/studio=u/date=u/popular=u/1'`}>
                        {cartoonDetails.genres?.[0]?.name ?? ''}
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
                        <p>Quality: 1080p</p>
                        <p>Release year: {new Date(cartoonDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {cartoonDetails.ageRestriction}+</p>
                        <p>Country: {cartoonDetails.country}</p>
                        <p>Genre: {cartoonDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {cartoonDetails.actors}</p>

                        <h2 className={styles["plot"]}>{cartoonDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'cartoon'} setIsRating={setIsRating} />}
            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default ViewInfo;
