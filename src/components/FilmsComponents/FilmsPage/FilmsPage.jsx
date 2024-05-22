import React, { useEffect, useState } from 'react';
import styles from './FilmsPageStyles.module.css';
import FilmsList from './FilmsList/FilmsList';
import GenreFilter from './FilmsFilters/GenreFilter';
import DateFilter from './FilmsFilters/DateFilter';
import PopularFilter from './FilmsFilters/PopularFilter';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilms } from '../../../slices/filmsSlices/FilmsSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const FilmsPage = () => {
    
    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/films/genre=u/studio=u/date=u/popular=u/${page}`);
        setDateFilter('');
        setPopularFilter('');
    };

    // REDUX REQUEST

    const { genre, studio, date, popular, page } = useParams();
    const dispatch = useDispatch();
    const pageSize = 10;

    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

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

        dispatch(fetchFilms(
            {
                pageNumber: currentPage,
                pageSize: pageSize,
                sortByDate: dateFilter,
                sortByPopularity: popularFilter,
                genres: genreFilter,
                studios: studioFilter,
            }
        ));
    }, [dispatch, isClean, currentPage, pageSize, dateFilter, popularFilter, genre, studio])

    const filmsData = useSelector((state) => state.films.films); 
    const isLoadingFilms = useSelector((state) => state.films.isLoading);
    const filmsError = useSelector((state) => state.films.error)

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

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <PopularFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <FilmsList
                films={filmsData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />
        </div>
    );
}

export default FilmsPage;