import React, { useEffect, useState } from 'react';
import styles from './AnimeListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleAnimeInfoPositioning } from './AnimeListScripts';
import Pagination from './Pagination/Pagination';
import axios from 'axios';
import { ANIME_ENDPOINTS } from '../../../../constants/animeEndpoints';
 
const AnimeList = ({ anime, setCurrentPage, currentPage, pageSize }) => {

    const { genre, date, popular} = useParams();

    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState('');
    const [popularFilter, setPopularFilter] = useState('');

    const genreFilter = [];

    useEffect(() => {
        if (date === 'from_old_to_new') {
            setDateFilter('asc');
        } else if (date === 'from_new_to_old') {
            setDateFilter('desc');
        } else {
            setDateFilter('');
        }
    }, [date]);

    useEffect(() => {   
        if (popular === 'by_rating') {
            setPopularFilter('rating');
        } else if (popular === 'by_discussion') {
            setPopularFilter('discussing');
        } else {
            setPopularFilter('');
        }
    }, [popular]);

    useEffect(() => {
        if (genre !== 'genre=u') {
            genreFilter.push(genre.replace(/_/g, ' '));
        }

        async function fetchTotalPages() {
            try {
                const response = await axios.post(ANIME_ENDPOINTS.countPages, {
                    Genres: genreFilter,
                    Studios: []
                }, {
                    params: {    
                        pageSize: pageSize,
                        sortByDate: dateFilter,
                        sortByPopularity: popularFilter,
                    }
                });
                setTotalPages(response.data);
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        }

        fetchTotalPages();
    }, [genre, date, popular]);

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

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <>
            <div className={styles["anime-list"]}>
            
                {anime.map((anime, index) => (
                    
                    <NavLink to={`/anime-view/${anime.genres[0].name.toLowerCase().replace(/ /g, '_')}/${anime.id}`} className={styles["anime-card"]} key={index}>
                        <div className={styles["anime-poster"]}>
                            <img src={anime.poster ? `data:image/jpeg;base64,${anime.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["anime-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{anime.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {anime.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(anime.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {anime.country}</p>
                                        <p>Genre: {anime.genres.map(genre => genre.name).join(', ')}</p>
                                        <p>Actors: {anime.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {truncateDescription(anime.description, 300)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{anime.quality}p</div>
                        </div>
                        <div className={styles["anime-title"]}>{anime.title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
            
        </>
    );
}

export default AnimeList;