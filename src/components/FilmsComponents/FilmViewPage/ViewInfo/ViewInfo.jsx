import React, { useEffect, useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark, faHeart as solidHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewInfo = () => {

    const { id } = useParams();
    const [filmInfo, setFilmInfo] = useState([]);
    const [isLiked, setLiked] = useState(false);
    const [isDisLiked, setDisLiked] = useState(false);
    const [isSaved, setSaved] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [disLikeCount, setDisLikeCount] = useState(0);

    const toLike = () => {
        if (!isLiked) {
            setLiked(!isLiked);
            setDisLiked(false);
            setLikeCount(likeCount + 1);

            if (isDisLiked) {
                setDisLikeCount(disLikeCount - 1);
            }
        }
        
        if (isLiked) {
            setLiked(!isLiked);
            setLikeCount(likeCount - 1);
        }   
    };

    const toDisLike = () => {

        if (!isDisLiked) {
            setDisLiked(!isDisLiked);
            setLiked(false);
            setDisLikeCount(disLikeCount + 1);

            if (isLiked) {
                setLikeCount(likeCount - 1);
            }
        }

        if (isDisLiked) {
            setDisLiked(!isDisLiked);
            setDisLikeCount(disLikeCount - 1);
        } 
    };

    const toSave = () => {
        setSaved(!isSaved);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
                setFilmInfo(response.data);

            } catch (error) {
                console.error('Помилка під час отримання фільму:', error);
            }
        }

        fetchMovie();
    }, [id]);

    return (
        <div className={styles["view-info"]}>
            <div className={styles["path"]}>
                <NavLink to={'films'}>Films</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <NavLink>{filmInfo.Genre && filmInfo.Genre.split(',')[0]}</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <span>{filmInfo.Title}</span>
            </div>

            <div className={styles["content-info"]}>
                <div className={styles["left-content"]}>
                    <img src={filmInfo.Poster} alt="" />
                    <div className={styles["bottom"]}>
                        <div className={styles["film-rate"]}>
                            <FontAwesomeIcon icon={faStar} /> {filmInfo.imdbRating}/10
                        </div>
                        <div className={styles["like-dislike"]}>
                            <p className={styles["like"]}>
                                {isLiked && <FontAwesomeIcon icon={solidHeart} onClick={toLike} />}
                                {!isLiked && <FontAwesomeIcon icon={regularHeart} onClick={toLike} />}
                                {likeCount}
                            </p>
                            <p className={styles["dislike"]}>
                                {isDisLiked && <FontAwesomeIcon icon={faHeartCrack} onClick={toDisLike} />}
                                {!isDisLiked && <FontAwesomeIcon icon={regularHeart} onClick={toDisLike} />}
                                {disLikeCount}
                            </p>  
                        </div>
                        <div className={styles["save"]} onClick={toSave}>
                            {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                            {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                        </div>
                    </div>
                </div>
                <div className={styles["right-content"]}>
                    <h1 className={styles["title"]}>{filmInfo.Title}</h1>
                    <p>Quality: 1080p</p>
                    <p>Release year: {filmInfo.Year}</p>
                    <p>Age rating: 12+</p>
                    <p>Country: {filmInfo.Country}</p>
                    <p>Genre: {filmInfo.Genre}</p>
                    <p>Actors: {filmInfo.Actors}</p>

                    <h2 className={styles["plot"]}>{filmInfo.Plot}</h2>
                </div>
            </div>
        </div>
    );
}

export default ViewInfo;
