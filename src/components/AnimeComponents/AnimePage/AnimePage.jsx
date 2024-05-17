import React, { useEffect, useState } from 'react';
import styles from './AnimePageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import GenreFilter from './AnimeFilters/GenreFilter';
import DateFilter from './AnimeFilters/DateFilter';
import PopularFilter from './AnimeFilters/PopularFilter';
import AnimeList from './AnimeList/AnimeList';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Technicall/Spinner/Spinner';
import { fetchFilteredAnime } from '../../../slices/animeSlices/AnimeFiltersSlice';

const AnimePage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/anime/genre=u/date=u/popular=u/${page}`);
    };

    // REDUX REQUEST

    const { genre, page } = useParams();
    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredAnime(
            {
                genre: genre,
                pageNumber: currentPage 
            }
        ));
    }, [dispatch, currentPage])

    const animeData = useSelector((state) => state.filteredAnime.filteredAnime); 
    const isLoadingAnime = useSelector((state) => state.filteredAnime.isLoading);
    const animeError = useSelector((state) => state.filteredAnime.error)

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

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean}/>

                    <PopularFilter isClean={isClean} setIsClean={setIsClean}/>

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <AnimeList anime={animeData} setCurrentPage={setCurrentPage} currentPage={currentPage} />

        </div>
    );
}

export default AnimePage;
