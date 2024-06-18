import React, { useEffect, useState } from 'react';
import styles from './FilmsListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleFilmInfoPositioning } from './FilmsListScripts';
import Pagination from './Pagination/Pagination';
import axios from 'axios';
import { FILM_ENDPOINTS } from '../../../../constants/filmEndpoints';

const FilmsList = ({ films, setCurrentPage, currentPage, pageSize }) => {

    const { genre, studio, date, popular} = useParams();

    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState('');
    const [popularFilter, setPopularFilter] = useState('');

    const genreFilter = [];
    const studioFilter = [];

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

        if (studio !== 'studio=u') {
            studioFilter.push(studio.replace(/_/g, ' '));
        }

        async function fetchTotalPages() {
            try {
                const response = await axios.post(FILM_ENDPOINTS.countPages, {
                    Genres: genreFilter,
                    Studios: studioFilter
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
    }, [genre, studio, date, popular]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const genreUrl = typeof genre === 'undefined' ? `genre=u` : genre;
        const studioUrl = typeof studio === 'undefined' ? 'studio=u' : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        
        const newPath = `/films/${genreUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageNumber}`;
        navigate(newPath);
    };

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
    }, [films]);

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <>
            <div className={styles["films-list"]}>
    
                {films.map((film, index) => (
                    
                    <NavLink to={`/film-view/${film.genres[0].name.toLowerCase().replace(/ /g, '_')}/${film.id}`} className={styles["film-card"]} key={index}>
                        <div className={styles["film-poster"]}>
                            <img src={film.poster ? `data:image/jpeg;base64,${film.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["film-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{film.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {film.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(film.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {film.country}</p>
                                        <p>Genre: {film.genres.map(genre => genre.name).join(', ')}</p>
                                        <p>Actors: {film.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {truncateDescription(film.description, 300)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{film.quality}p</div>
                        </div>
                        <div className={styles["film-title"]}>{film.title}</div>
                    </NavLink>

                ))}
            </div>

            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
            
        </>
    );
}

export default FilmsList;