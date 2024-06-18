import React, { useEffect, useState } from 'react';
import styles from './BookmarksStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { handleInfoPositioning } from '../BrowsingHistory/HistoryScripts';
import Pagination from './Pagination/Pagination';
import box from '../../../images/subscription/box.png';
import Spinner from '../../Technicall/Spinner/Spinner';

const Bookmarks = ({ bookedList, loading }) => {

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleInfoPositioning(event, styles);
        };

        const questionMarks = document.querySelectorAll(`.${styles['question-mark']}`);
        questionMarks.forEach((questionMark) => {
            questionMark.addEventListener('mouseenter', handleMouseEnter);
        });

        return () => {
            questionMarks.forEach((questionMark) => {
                questionMark.removeEventListener('mouseenter', handleMouseEnter);
            });
        };
    }, [bookedList]);

    const moviesPerPage = 12;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = bookedList.slice(indexOfFirstMovie, indexOfLastMovie);

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) :bookedList.length > 0 ? (
                <>
                    <div className={styles["bookmarks-list"]}>
                        {currentMovies.map((movie, index) => (
                            <NavLink to={`/${movie.mediaType}-view/${movie.genres?.[0]?.name?.toLowerCase().replace(/ /g, '_') ?? ''}/${movie.id}`} className={styles["film-card"]} key={index}>
                                <div className={styles["film-poster"]}>
                                    <img src={movie.poster ? `data:image/jpeg;base64,${movie.poster}` : ''} alt="Poster" />
                                    <div className={styles["question-mark"]}>?</div>
                                    <div className={styles["film-info"]}>
                                        <div className={styles["name-rate"]}>
                                            <h1 className={styles["info-title"]}>{movie.title}</h1>
                                            <div className={styles["info-rate"]}>
                                                <span><FontAwesomeIcon icon={faStar} /> {movie.rating}/10</span>
                                            </div>
                                        </div>
                                        <div className={styles["info"]}>
                                            <p>Release year: {new Date(movie.dateOfPublish).getFullYear()}</p>
                                            <p>Country: {movie.country}</p>
                                            <p>Genre: {movie.genres?.map(genre => genre.name).join(', ') ?? ''}</p>
                                            <p>Actors: {movie.actors}</p>
                                        </div>
                                        <div className={styles["info-line"]}></div>
                                        <div className={styles["info-description"]}>
                                            <h1>Description</h1>
                                            <p>
                                                {truncateDescription(movie.description, 300)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles["quality"]}>{movie.quality}p</div>
                                </div>
                                <div className={styles["film-title"]}>{movie.title}</div>
                            </NavLink>
                        ))}
                    </div>
                    <Pagination bookedList={bookedList} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </>
            ) : (
                <div className={styles["none-found"]}>
                    <div>
                        <img src={box} alt='Empty box' />
                    </div>
                    <p>You don’t have bookmark.</p>
                </div>
            )}
        </>
    );
}

export default Bookmarks;
