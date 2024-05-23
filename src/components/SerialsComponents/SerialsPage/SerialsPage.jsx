import React, { useEffect, useState } from 'react';
import styles from './SerialsPageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import SerialsList from './SerialsList/SerialsList';
import GenreFilter from './SerialsFilters/GenreFilter';
import DateFilter from './SerialsFilters/DateFilter';
import PopularFilter from './SerialsFilters/PopularFilter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSerials } from '../../../slices/serialsSlices/SerialsSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const SerialsPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/serials/genre=u/studio=u/date=u/popular=u/${page}`);
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

        dispatch(fetchSerials(
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

    const serialsData = useSelector((state) => state.serials.serials); 
    const isLoadingSerials = useSelector((state) => state.serials.isLoading);
    const serialsError = useSelector((state) => state.serials.error)

    if (isLoadingSerials) {
        return <Spinner />;
    }

    if (serialsError) {
        console.log('Serials error: ' + serialsError);
    }

    return (
        <div className={styles["serials-page"]}>
            
            <div className={styles["filter-panel"]}>
                <div className={styles["filter-selections"]}>

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <PopularFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <SerialsList
                serials={serialsData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />

        </div>
    );
}

export default SerialsPage;
