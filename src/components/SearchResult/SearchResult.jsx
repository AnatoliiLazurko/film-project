import React, { useEffect, useState } from 'react';
import styles from './SearchResultStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ResultList from './ResultList/ResultList';
import box from '../../images/subscription/box.png';
import Spinner from '../Technicall/Spinner/Spinner';

const SearchResult = () => {

    const [inputValue, setInputValue] = useState('');
    const [films, setFilms] = useState([]);
    const [cartoons, setCartoons] = useState([]);
    const [serials, setSerials] = useState([]);
    const [anime, setAnime] = useState([]);
    const { query } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (query !== undefined) {
                setInputValue(query);
                setLoading(true);

                try {
                    await Promise.all([
                        searchFilmsByParam(),
                        searchCartoonsByParam(),
                        searchSerialsByParam(),
                        searchAnimeByParam()
                    ]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [query]);

    const searchFilmsByParam = async () => {
        try {
            const response = await axios.get(`https://localhost:7095/api/Films/bytitle`, {
                params: {
                    title: query
                }
            });

            setFilms(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const searchCartoonsByParam = async () => {
        try {
            const response = await axios.get(`https://localhost:7095/api/Films/bytitle`, {
                params: {
                    title: query
                }
            });

            setCartoons(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const searchSerialsByParam = async () => {
        try {
            const response = await axios.get(`https://localhost:7095/api/Films/bytitle`, {
                params: {
                    title: query
                }
            });

            setSerials(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const searchAnimeByParam = async () => {
        try {
            const response = await axios.get(`https://localhost:7095/api/Films/bytitle`, {
                params: {
                    title: query
                }
            });

            setAnime(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search/${inputValue}`);
    }

    const totalResults = films.length + cartoons.length + serials.length + anime.length;

    console.log(films);

    return (
        <div className={styles["search-page"]}>
            
            <p className={styles["search-txt"]}>Search on the site</p>
            <p className={styles["count-found"]}>For your query, {totalResults} results were found among the categories:</p>

            <div className={styles["search-container"]}>
                <div className={styles["search-field"]}>
                    <div className={styles["loop"]}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input className={styles["search-input"]} type="text" placeholder='Search' value={inputValue} onChange={handleChange}/>
                </div>
                <div className={styles["search-btn"]} onClick={handleSearch}>Search</div>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {totalResults !== 0 ? (
                        <>
                            <div>
                                <p className={styles["category-title"]}>Films</p>
                                <ResultList media={films} type={'film'} />
                                {films.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                            </div>

                            <div>
                                <p className={styles["category-title"]}>Cartoons</p>
                                <ResultList media={cartoons} type={'cartoon'} />
                                {cartoons.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                            </div>

                            <div>
                                <p className={styles["category-title"]}>Serials</p>
                                <ResultList media={serials} type={'serial'} />
                                {serials.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                            </div>

                            <div>
                                <p className={styles["category-title"]}>Anime</p>
                                <ResultList media={anime} type={'anime'} />
                                {anime.length === 0 && <p className={styles["none-results"]}>0 results were found for your query in this category</p>}
                            </div>
                        </>
                    ) : (
                        <div className={styles["none-found"]}><img src={box} alt='Empty box' /></div>
                    )}
                </>
            )}
            
        </div>
    );
}

export default SearchResult;
