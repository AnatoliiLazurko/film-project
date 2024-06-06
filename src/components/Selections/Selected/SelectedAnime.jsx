import React, { useEffect, useState } from 'react';
import styles from './SelectedStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleInfoPositioning } from './SelectedScripts';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Technicall/Spinner/Spinner';
import Pagination from './Pagination/Pagination';
import axios from 'axios';
import { fetchAnime } from '../../../slices/animeSlices/AnimeSlice';
import { ANIME_ENDPOINTS } from '../../../constants/animeEndpoints';

const SelectedAnime = () => {

    const [totalPages, setTotalPages] = useState(9);
    const navigate = useNavigate();

    const { selected, page } = useParams();

    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();
    const pageSize = 10;
    const selectedFilter = [];

    useEffect(() => {
        
        async function fetchTotalPages() {
            try {
                const response = await axios.post(ANIME_ENDPOINTS.countPages, {
                    Genres: [],
                    Studios: [],
                    Selections: selectedFilter
                }, {
                    params: {    
                        pageSize: pageSize,
                        sortByDate: '',
                        sortByPopularity: '',
                    }
                });
                setTotalPages(response.data);
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        }

        fetchTotalPages();
    }, [selected]);

    useEffect(() => {
        if (selected !== 'selected=u') {
            selectedFilter.push(selected.replace(/_/g, ' '));
        }

        dispatch(fetchAnime(
            {
                pageNumber: currentPage,
                pageSize: pageSize,
                sortByDate: '',
                sortByPopularity: '',
                genres: [],
                studios: [],
                selections: selectedFilter
            }
        ));
    }, [dispatch, currentPage])

    const selectionData = useSelector((state) => state.films.films); 
    const isLoadingSelection = useSelector((state) => state.films.isLoading);
    const selectionError = useSelector((state) => state.films.error)

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
    }, [selectionData]);

    if (isLoadingSelection) {
        return <Spinner />;
    }

    if (selectionError) {
        console.log('Selection error: ' + selectionError);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const newPath = `/selection/anime/${selected}/${pageNumber}`;
        navigate(newPath);
    };

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className={styles["selection-page"]}>

            <p className={styles["selected-selection"]}>{selected.charAt(0).toUpperCase() + selected.slice(1).replace(/_/g, ' ')}</p>

            <div className={styles["movies-list"]}>
            
                {selectionData.map((movie, index) => (
                    
                    <NavLink to={`/anime-view/${movie.genres[0].name.toLowerCase()}/${movie.id}`} className={styles["movie-card"]} key={index}>
                        <div className={styles["movie-poster"]}>
                             <img src={movie.poster ? `data:image/jpeg;base64,${movie.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["movie-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{movie.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {movie.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(movie.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {movie.country}</p>
                                        <p>Genre: {movie.genres.map(genre => genre.name).join(', ')}</p>
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
                        <div className={styles["movie-title"]}>{movie.title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
            
        </div>
    );
}

export default SelectedAnime;
