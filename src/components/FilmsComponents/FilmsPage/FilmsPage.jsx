import React, { useState } from 'react';
import styles from './FilmsPageStyles.module.css';
import FilmsList from './FilmsList/FilmsList';
import GenreFilter from './FilmsFilters/GenreFilter';
import DateFilter from './FilmsFilters/DateFilter';
import PopularFilter from './FilmsFilters/PopularFilter';
import { useNavigate } from 'react-router-dom';

const FilmsPage = () => {
    
    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate('/films');
    };

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

            <FilmsList />

        </div>
    );
}

export default FilmsPage;