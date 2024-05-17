import React, { useEffect, useState } from 'react';
import styles from './SerialsPageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import SerialsList from './SerialsList/SerialsList';
import GenreFilter from './SerialsFilters/GenreFilter';
import DateFilter from './SerialsFilters/DateFilter';
import PopularFilter from './SerialsFilters/PopularFilter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredSerials } from '../../../slices/serialsSlices/SerialsFiltersSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const SerialsPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/serials/genre=u/date=u/popular=u/${page}`);
    };

    // REDUX REQUEST

    const { genre, page } = useParams();
    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredSerials(
            {
                genre: genre,
                pageNumber: currentPage 
            }
        ));
    }, [dispatch, currentPage])

    const serialsData = useSelector((state) => state.filteredSerials.filteredSerials); 
    const isLoadingSerials = useSelector((state) => state.filteredSerials.isLoading);
    const serialsError = useSelector((state) => state.filteredSerials.error)

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

                    <GenreFilter isClean={isClean} setIsClean={setIsClean} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean}/>

                    <PopularFilter isClean={isClean} setIsClean={setIsClean}/>

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <SerialsList serials={serialsData} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

        </div>
    );
}

export default SerialsPage;
