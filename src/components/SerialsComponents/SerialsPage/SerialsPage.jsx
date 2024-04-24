import React, { useState } from 'react';
import styles from './SerialsPageStyles.module.css';
import { useNavigate } from 'react-router-dom';
import SerialsList from './SerialsList/SerialsList';
import GenreFilter from './SerialsFilters/GenreFilter';
import DateFilter from './SerialsFilters/DateFilter';
import PopularFilter from './SerialsFilters/PopularFilter';

const SerialsPage = () => {

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

            <SerialsList />

        </div>
    );
}

export default SerialsPage;
