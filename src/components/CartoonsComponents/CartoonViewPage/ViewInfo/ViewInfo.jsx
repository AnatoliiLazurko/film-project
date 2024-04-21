import React, { useEffect, useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewInfo = () => {

    const { id } = useParams();
    const [filmInfo, setFilmInfo] = useState([]);
    const [isSaved, setSaved] = useState(false);

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
                <NavLink to={'/cartoons'}>Cartoons</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <NavLink to={`/cartoons/${filmInfo.Genre && filmInfo.Genre.split(',')[0]}`}>{filmInfo.Genre && filmInfo.Genre.split(',')[0]}</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <span>{filmInfo.Title}</span>
            </div>

            <div className={styles["content-info"]}>
                <div className={styles["left-content"]}>
                    <img src={filmInfo.Poster} alt="" />
                </div>
                <div className={styles["right-content"]}>
                    <div className={styles["top-section"]}>
                        <h1 className={styles["title"]}>{filmInfo.Title}</h1>
                        <div className={styles["rate-save-section"]}>
                            <div className={styles["cartoon-rate"]}>
                                <FontAwesomeIcon icon={faStar} /> {filmInfo.imdbRating}/10
                            </div>
                            <div className={styles["save"]} onClick={toSave}>
                                {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                            </div>
                        </div>
                    </div>
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
