import React, { useEffect, useState } from 'react';
import styles from './FilmsPageStyles.module.css';
import FilmsList from './FilmsList/FilmsList';
import GenreFilter from './FilmsFilters/GenreFilter';
import DateFilter from './FilmsFilters/DateFilter';
import PopularFilter from './FilmsFilters/PopularFilter';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredFilms } from '../../../slices/filmsSlices/FilmsFiltersSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const FilmsPage = () => {
    
    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/films/genre=u/date=u/popular=u/${page}`);
    };

    // REDUX REQUEST

    const { genre, page } = useParams();
    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredFilms(
            {
                genre: genre,
                pageNumber: currentPage 
            }
        ));
    }, [dispatch, currentPage])

    const filmsData = useSelector((state) => state.filteredFilms.filteredFilms); 
    const isLoadingFilms = useSelector((state) => state.filteredFilms.isLoading);
    const filmsError = useSelector((state) => state.filteredFilms.error)

    if (isLoadingFilms) {
        return <Spinner />;
    }

    if (filmsError) {
        console.log('Films error: ' + filmsError);
    }

    return (
        <div className={styles["films-page"]}>

            <div className={styles["filter-panel"]}>
                <div className={styles["filter-selections"]}>

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean}/>

                    <PopularFilter isClean={isClean} setIsClean={setIsClean}/>

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <FilmsList films={filmsData} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
}

export default FilmsPage;