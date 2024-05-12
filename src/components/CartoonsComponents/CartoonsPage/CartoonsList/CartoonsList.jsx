import React, { useEffect, useState } from 'react';
import styles from './CartoonsListStyles.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { handleCartoonInfoPositioning } from './CartoonsListScripts';
import Pagination from './Pagination/Pagination';

const CartoonList = () => {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                let fetchedMovies = [];

                for (let page = 1; page <= 5; page++) {
                    const response = await axios.get('http://www.omdbapi.com/', {
                        params: {
                        apikey: 'bfec6a42',
                        s: 'movie',
                        type: 'movie',
                        r: 'json',
                        page: page,
                        pageSize: 10
                        }
                    });

                    if (response.data.Search) {
                        fetchedMovies = fetchedMovies.concat(response.data.Search);
                    }
                }

                const moviesWithDetails = await Promise.all(
                    fetchedMovies.map(async movie => {
                        const detailsResponse = await axios.get('http://www.omdbapi.com/', {
                        params: {
                            apikey: 'bfec6a42',
                            i: movie.imdbID,
                            r: 'json'
                        }
                        });
                        return detailsResponse.data;
                    })
                );

                setMovies(moviesWithDetails);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, []);

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleCartoonInfoPositioning(event, styles);
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
    }, [movies]);


    const moviesPerPage = 48;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <>
            <div className={styles["cartoons-list"]}>
            
                {currentMovies.map((movie, index) => (
                    
                    <NavLink to={`/cartoon-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["cartoon-card"]} key={index}>
                        <div className={styles["cartoon-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["cartoon-info"]}>
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
                        <div className={styles["cartoon-title"]}>{movie.Title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination movies={movies} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </>
    );
}

export default CartoonList;