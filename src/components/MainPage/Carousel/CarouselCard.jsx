import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./CarouselStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CarouselCard = ({ films }) => {
    return (
        <article>
            <NavLink to={`/film-view/${films.genres[0].name.toLowerCase()}/${films.id}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={`data:image/jpeg;base64,${films.posterPartOne}`} alt={films.title} />
                    <div className={styles["question-mark"]}>?</div>
                    <div className={styles["film-info"]}>
                            <div className={styles["name-rate"]}>
                                <h1 className={styles["info-title"]}>{films.title}</h1>
                                <div className={styles["info-rate"]}>
                                    <span><FontAwesomeIcon icon={faStar} /> {films.rating}/10</span>
                                </div>
                            </div>
                            <div className={styles["info"]}>
                                <p>Release year: {new Date(films.dateOfPublish).getFullYear()}</p>
                                <p>Country: {films.country}</p>
                                <p>Genre: {films.genres.map(genre => genre.name).join(', ')}</p>
                                <p>Actors: {films.actors}</p>
                            </div>
                    </div>
                </div>
            </NavLink>
            <NavLink to={`/film-view/${films.genres[0].name.toLowerCase()}/${films.id}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={`data:image/jpeg;base64,${films.posterPartTwo}`} alt={films.title} />
                </div>
            </NavLink>
            <NavLink to={`/film-view/${films.genres[0].name.toLowerCase()}/${films.id}`} className={styles["carousel-card"]}>
                <div className={styles["card-poster"]}>
                    <img src={`data:image/jpeg;base64,${films.posterPartThree}`} alt={films.Title} />
                </div>
            </NavLink>
        </article>
    );
}

export default CarouselCard;
