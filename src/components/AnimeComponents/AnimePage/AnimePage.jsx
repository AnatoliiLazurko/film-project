import React, { useEffect, useState } from 'react';
import styles from './AnimePageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import GenreFilter from './AnimeFilters/GenreFilter';
import DateFilter from './AnimeFilters/DateFilter';
import PopularFilter from './AnimeFilters/PopularFilter';
import AnimeList from './AnimeList/AnimeList';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Technicall/Spinner/Spinner';
import { fetchAnime } from '../../../slices/animeSlices/AnimeSlice';

const AnimePage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/anime/genre=u/date=u/popular=u/${page}`);
        setDateFilter('');
        setPopularFilter('');
    };

    // REDUX REQUEST

    const { genre, date, popular, page } = useParams();
    const dispatch = useDispatch();
    const pageSize = 10;

    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

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

        dispatch(fetchAnime(
            {
                pageNumber: currentPage,
                pageSize: pageSize,
                sortByDate: dateFilter,
                sortByPopularity: popularFilter,
                genres: genreFilter,
                studios: [],
            }
        ));
    }, [dispatch, isClean, currentPage, pageSize, dateFilter, popularFilter, genre])

    const animeData = useSelector((state) => state.anime.anime); 
    const isLoadingAnime = useSelector((state) => state.anime.isLoading);
    const animeError = useSelector((state) => state.anime.error)

    if (isLoadingAnime) {
        return <Spinner />;
    }

    if (animeError) {
        console.log('Anime error: ' + animeError);
    }

    return (
        <div className={styles["anime-page"]}>
            
            <div className={styles["filter-panel"]}>
                <div className={styles["filter-selections"]}>

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <PopularFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <AnimeList
                anime={animeData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />

        </div>
    );
}

export default AnimePage;
