import React, { useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import RateWindow from '../../../Technicall/RateWindow/RateWindow';
import useAuth from '../../../../hooks/useAuth';
import AuthPrompt from '../../../Technicall/Auth/AuthPrompt';

const ViewInfo = ({ serialDetails }) => {

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

    const rateSerial = () => {
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
                    <NavLink to={'/serials/genre=u/studio=u/date=u/popular=u/1'}>Serials</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <NavLink to={`/serials/${serialDetails.genres?.[0]?.name?.toLowerCase() ?? ''}/studio=u/date=u/popular=u/1`}>{serialDetails.genres?.[0]?.name ?? ''}</NavLink>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    <span>{serialDetails.title}</span>
                </div>

                <div className={styles["content-info"]}>
                    <div className={styles["left-content"]}>
                        <img src={serialDetails.poster ? `data:image/jpeg;base64,${serialDetails.poster}` : ''} alt="Poster" />
                    </div>
                    <div className={styles["right-content"]}>
                        <div className={styles["top-section"]}>
                            <h1 className={styles["title"]}>{serialDetails.title}</h1>
                            <div className={styles["rate-save-section"]}>
                                <div className={styles["serial-rate"]} onClick={rateSerial}>
                                    <FontAwesomeIcon icon={faStar} /> {serialDetails.rating}/10
                                </div>
                                <div className={styles["save"]} onClick={toSave}>
                                    {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                    {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                                </div>
                            </div>
                        </div>
                        <p>Quality: 1080p</p>
                        <p>Release year: {new Date(serialDetails.dateOfPublish).getFullYear()}</p>
                        <p>Age rating: {serialDetails.ageRestriction}+</p>
                        <p>Country: {serialDetails.country}</p>
                        <p>Genre: {serialDetails.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                        <p>Actors: {serialDetails.actors}</p>

                        <h2 className={styles["plot"]}>{serialDetails.description}</h2>
                    </div>
                </div>
            </div>
            {isRating && <RateWindow type={'serial'} setIsRating={setIsRating} />}
            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default ViewInfo;
