import React, { useEffect, useState } from 'react';
import styles from './ViewInfoStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faStar, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewInfo = () => {

    const { id } = useParams();
    const [serialInfo, setSerialInfo] = useState([]);
    const [isSaved, setSaved] = useState(false);

    const toSave = () => {
        setSaved(!isSaved);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
                setSerialInfo(response.data);

            } catch (error) {
                console.error('Помилка під час отримання фільму:', error);
            }
        }

        fetchMovie();
    }, [id]);

    return (
        <div className={styles["view-info"]}>
            <div className={styles["path"]}>
                <NavLink to={'/serials'}>Serials</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <NavLink to={`/serials/${serialInfo.Genre && serialInfo.Genre.split(',')[0].toLowerCase()}`}>{serialInfo.Genre && serialInfo.Genre.split(',')[0]}</NavLink>
                <FontAwesomeIcon icon={faAnglesRight} />
                <span>{serialInfo.Title}</span>
            </div>

            <div className={styles["content-info"]}>
                <div className={styles["left-content"]}>
                    <img src={serialInfo.Poster} alt="" />
                </div>
                <div className={styles["right-content"]}>
                    <div className={styles["top-section"]}>
                        <h1 className={styles["title"]}>{serialInfo.Title}</h1>
                        <div className={styles["rate-save-section"]}>
                            <div className={styles["serial-rate"]}>
                                <FontAwesomeIcon icon={faStar} /> {serialInfo.imdbRating}/10
                            </div>
                            <div className={styles["save"]} onClick={toSave}>
                                {isSaved && <FontAwesomeIcon icon={solidBookMark} />}
                                {!isSaved && <FontAwesomeIcon icon={regularBookMark} />}
                            </div>
                        </div>
                    </div>
                    <p>Quality: 1080p</p>
                    <p>Release year: {serialInfo.Year}</p>
                    <p>Age rating: 12+</p>
                    <p>Country: {serialInfo.Country}</p>
                    <p>Genre: {serialInfo.Genre}</p>
                    <p>Actors: {serialInfo.Actors}</p>

                    <h2 className={styles["plot"]}>{serialInfo.Plot}</h2>
                </div>
            </div>
        </div>
    );
}

export default ViewInfo;
