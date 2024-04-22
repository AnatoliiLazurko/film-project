import React, { useState } from 'react';
import styles from './SeriesPageStyles.module.css';
import { useNavigate } from 'react-router-dom';
import SeriesList from './SeriesList/SeriesList';
import GenreFilter from './SeriesFilters/GenreFilter';
import DateFilter from './SeriesFilters/DateFilter';
import PopularFilter from './SeriesFilters/PopularFilter';

const SeriesPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate('/serials');
    };

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

            <SeriesList />

        </div>
    );
}

export default SeriesPage;
