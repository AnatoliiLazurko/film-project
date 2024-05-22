import React, { useEffect, useState } from 'react';
import styles from './SelectedStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { handleInfoPositioning } from './SelectedScripts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredFilms } from '../../../slices/filmsSlices/FilmsFiltersSlice';
import Spinner from '../../Technicall/Spinner/Spinner';
import Pagination from './Pagination/Pagination';

const Selected = () => {

    const [totalPages, setTotalPages] = useState(9);
    const navigate = useNavigate();

    const { type, selected, page } = useParams();
    const editedType = type.endsWith("s") ? type.slice(0, -1) : type;

    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredFilms(
            {
                pageNumber: currentPage 
            }
        ));
    }, [dispatch, currentPage])

    const selectionData = useSelector((state) => state.filteredFilms.filteredFilms); 
    const isLoadingSelection = useSelector((state) => state.filteredFilms.isLoading);
    const selectionError = useSelector((state) => state.filteredFilms.error)

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

        const newPath = `/selection/${type}/${selected}/${pageNumber}`;
        navigate(newPath);
    };

    return (
        <div className={styles["selection-page"]}>

            <p className={styles["selected-selection"]}>{selected.charAt(0).toUpperCase() + selected.slice(1).replace(/_/g, ' ')}</p>

            <div className={styles["movies-list"]}>
            
                {selectionData.map((movie, index) => (
                    
                    <NavLink to={`/${editedType}-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["movie-card"]} key={index}>
                        <div className={styles["movie-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["movie-info"]}>
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
                        <div className={styles["movie-title"]}>{movie.Title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
            
        </div>
    );
}

export default Selected;
