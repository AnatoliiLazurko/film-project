import React, { useState } from 'react';
import styles from './AnimePageStyles.module.css';
import { useNavigate } from 'react-router-dom';
import GenreFilter from './AnimeFilters/GenreFilter';
import DateFilter from './AnimeFilters/DateFilter';
import PopularFilter from './AnimeFilters/PopularFilter';
import AnimeList from './AnimeList/AnimeList';

const AnimePage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate('/anime');
    };

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

            <AnimeList />

        </div>
    );
}

export default AnimePage;
