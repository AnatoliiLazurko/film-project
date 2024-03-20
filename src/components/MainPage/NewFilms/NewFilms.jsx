import React, { useEffect, useState } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewFilmCard from './NewFilmCard';
import axios from 'axios';

const NewFilms = () => {

    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&apikey=bfec6a42`);
            const moviesData = await Promise.all(
                response.data.Search.map(async movie => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setMovies(moviesData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }

        // try {
        //     const response = await axios.get('http://www.omdbapi.com/?s=avengers&apikey=bfec6a42&page=${page}');
        //     const moviesData = await Promise.all(
        //         response.data.Search.map(async movie => {
        //             const detailedResponse = await axios.get(
        //             `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
        //             );
        //             return detailedResponse.data;
        //         })
        //     );
        //     setMovies(prevMovies => [...prevMovies, ...moviesData]);
        // } catch (error) {
        //     console.error('Помилка під час отримання фільмів:', error);
        // }
    };

    useEffect(() => {

        fetchMovies();
    }, []);



    console.log(movies);

    return (
        <div className={styles["new-films-section"]}>
            <span className={styles["section-title"]}>New Films <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-films"]}>

                {movies.map((movie, index) => (
                    <NewFilmCard key={index} movies={movie} />
                ))}
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewFilms;
