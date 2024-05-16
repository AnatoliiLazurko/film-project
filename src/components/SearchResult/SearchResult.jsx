import React, { useEffect, useState } from 'react';
import styles from './SearchResultStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ResultList from './ResultList/ResultList';
import box from '../../images/subscription/box.png';

const SearchResult = () => {

    const [inputValue, setInputValue] = useState('');
    const [movies, setMovies] = useState([]);
    const { query } = useParams();
    const navigate = useNavigate();

    const [queryReady, setQueryReady] = useState(false);

    useEffect(() => {
        if (query !== undefined && !queryReady) {
            setInputValue(query);
            setQueryReady(true);
            searchMoviesByParam();
        }
    }, [query, queryReady]);

    const searchMoviesByParam = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=bfec6a42`);
            
            if (response.data && response.data.Search) {
                const movieResults = response.data.Search;

                const detailedMovies = await Promise.all(
                    movieResults.map(async (movie) => {
                        const detailedResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42`);
                        return detailedResponse.data;
                    })
                );

                setMovies(detailedMovies);
                console.log(detailedMovies);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const searchMovies = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${inputValue}&apikey=bfec6a42`);
            
            if (response.data && response.data.Search) {
                const movieResults = response.data.Search;

                const detailedMovies = await Promise.all(
                    movieResults.map(async (movie) => {
                        const detailedResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42`);
                        return detailedResponse.data;
                    })
                );

                setMovies(detailedMovies);
            } else {
                setMovies([]);
            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search/${inputValue}`);
        searchMovies();
    }

    console.log(movies);
    const films = movies.filter(movie => movie.Type === 'movie');
    const cartoons = movies.filter(movie => movie.Type === 'cartoon');
    const serials = movies.filter(movie => movie.Type === 'series');
    const anime = movies.filter(movie => movie.Type === 'anime');

    return (
        <div className={styles["search-page"]}>
            
            <p className={styles["search-txt"]}>Search on the site</p>
            <p className={styles["count-found"]}>For your query, {movies.length} results were found among the categories:</p>

            <div className={styles["search-container"]}>
                <div className={styles["search-field"]}>
                    <div className={styles["loop"]}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input className={styles["search-input"]} type="text" placeholder='Search' value={inputValue} onChange={handleChange}/>
                </div>
                <div className={styles["search-btn"]} onClick={handleSearch}>Search</div>
            </div>

            {movies.length !== 0 &&
                <>
                <div>
                    <p className={styles["category-title"]}>Films</p>
                    <ResultList movies={films} type={'film'} />
                    {films.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                </div>

                <div>
                    <p className={styles["category-title"]}>Cartoons</p>
                    <ResultList movies={cartoons} type={'cartoon'} />
                    {cartoons.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                </div>

                <div>
                    <p className={styles["category-title"]}>Serials</p>
                    <ResultList movies={serials} type={'serial'} />
                    {serials.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                </div>

                <div>
                    <p className={styles["category-title"]}>Anime</p>
                    <ResultList movies={anime} type={'anime'} />
                    {anime.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                </div>
                </>
            }
            
            {movies.length === 0 && <div className={styles["none-found"]}><img src={box} alt='Empty box' /></div>}
            
        </div>
    );
}

export default SearchResult;
