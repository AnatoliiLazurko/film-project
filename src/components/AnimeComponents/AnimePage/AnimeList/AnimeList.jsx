import React, { useEffect, useState } from 'react';
import styles from './AnimeListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleAnimeInfoPositioning } from './AnimeListScripts';
import Pagination from './Pagination/Pagination';

const AnimeList = ({ anime, setCurrentPage, currentPage }) => {

    const [totalPages, setTotalPages] = useState(9);
    const { genre, date, popular } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     async function fetchTotalPages() {
    //         try {
    //             const response = await axios.get('/movies/pages');
    //             setTotalPages(response.data.totalPages);
    //         } catch (error) {
    //             console.error('Error fetching total pages:', error);
    //         }
    //     }

    //     fetchTotalPages();
    // }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const genreUrl = typeof genre === 'undefined' ? `genre=u` : genre;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;

        const newPath = `/anime/${genreUrl}/${dateUrl}/${popularUrl}/${pageNumber}`;
        navigate(newPath);
    };

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleAnimeInfoPositioning(event, styles);
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
    }, [anime]);


    // const filteredMovies = genre && genre !== 'genre=u' ? movies.filter(movie => {
    //     let movieGenres = movie.Genre.split(", ");
        
    //     return movieGenres.includes(genre.charAt(0).toUpperCase() + genre.slice(1));
    // }) : movies;

    return (
        <>
            <div className={styles["anime-list"]}>
            
                {anime.map((movie, index) => (
                    
                    <NavLink to={`/anime-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["anime-card"]} key={index}>
                        <div className={styles["anime-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["anime-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{movie.Title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {movie.imdbRating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {movie.Year}</p>
                                        <p>Country: {movie.Country}</p>
                                        <p>Genre: {movie.Genre}</p>
                                        <p>Actors: {movie.Actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {movie.Plot}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>1080p</div>
                        </div>
                        <div className={styles["anime-title"]}>{movie.Title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
            
        </>
    );
}

export default AnimeList;