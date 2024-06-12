import React, { useEffect, useState } from 'react';
import styles from './BrowsingHistoryStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { handleInfoPositioning } from './HistoryScripts';
import Pagination from './Pagination/Pagination';
import Spinner from '../../Technicall/Spinner/Spinner';
import box from '../../../images/subscription/box.png';

const BrowsingHistory = ({ historyList, loading, sortHistory, setSortHistory }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const handleRecentHistory = () => {
        setSortHistory('recent');
    }

    const handleWeekHistory = () => {
        setSortHistory('week');
    }

    const handleMonthHistory = () => {
        setSortHistory('month');
    }

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
    }, [historyList]);

    const moviesPerPage = 12;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = historyList.slice(indexOfFirstMovie, indexOfLastMovie);

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
            ) : historyList.length > 0 ? (        
                <div className={styles["browsing-history"]}>
            
                    <div className={styles["sort-history"]}>
                        <p className={`${sortHistory === 'recent' ? styles["active"] : ''}`} onClick={handleRecentHistory}>Recent</p>
                        <p className={`${sortHistory === 'week' ? styles["active"] : ''}`} onClick={handleWeekHistory}>Week</p>
                        <p className={`${sortHistory === 'month' ? styles["active"] : ''}`} onClick={handleMonthHistory}>Month</p>
                    </div>

                    <div className={styles["history-list"]}>

                        {currentMovies.map((movie, index) => (
                            <NavLink to={`/${movie.mediaType}-view/${movie.genres?.[0]?.name?.toLowerCase() ?? ''}/${movie.id}`} className={styles["film-card"]} key={index}>
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

                    <Pagination movies={historyList} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>             
            ) : (
                <div className={styles["none-found"]}>
                    <div>
                        <img src={box} alt='Empty box' />
                    </div>
                    <p>You haven’t watched a movie yet.</p>
                </div>
            )}
        </>
    );
}

export default BrowsingHistory;
