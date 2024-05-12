import React, { useEffect, useState } from 'react';
import styles from './FilmsListStyles.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { handleFilmInfoPositioning } from './FilmsListScripts';
import Pagination from './Pagination/Pagination';

const FilmsList = ({ setIsLoading }) => {

    const [movies, setMovies] = useState([]);
    const { genre } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                let fetchedMovies = [];

                for (let page = 1; page <= 20; page++) {
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

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, [setIsLoading]);

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleFilmInfoPositioning(event, styles);
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


    const filteredMovies = genre && genre !== 'genre=u' ? movies.filter(movie => {
        let movieGenres = movie.Genre.split(", ");
        
        return movieGenres.includes(genre.charAt(0).toUpperCase() + genre.slice(1));
    }) : movies;

    const moviesPerPage = 48;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <>
            <div className={styles["films-list"]}>
    
                {currentMovies.map((movie, index) => (
                    
                    <NavLink to={`/film-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["film-card"]} key={index}>
                        <div className={styles["film-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["film-info"]}>
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
                        <div className={styles["film-title"]}>{movie.Title}</div>
                    </NavLink>

                ))}
            </div>

            <Pagination movies={filteredMovies} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            
        </>
    );
}

export default FilmsList;