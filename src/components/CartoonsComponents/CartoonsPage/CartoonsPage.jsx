import React, { useState } from 'react';
import styles from './CartoonsPageStyles.module.css';
import CategoryFilter from './CartoonsFilters/CategoryFilter';
import DateFilter from './CartoonsFilters/DateFilter';
import PopularFilter from './CartoonsFilters/PopularFilter';
import { useNavigate } from 'react-router-dom';
import CartoonList from './CartoonsList/CartoonsList';

const CartoonsPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate('/cartoons');
    };

    return (
        <div className={styles["cartoons-page"]}>
            
            <div className={styles["filter-panel"]}>
                <div className={styles["filter-selections"]}>

                    <CategoryFilter isClean={isClean} setIsClean={setIsClean} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean}/>

                    <PopularFilter isClean={isClean} setIsClean={setIsClean}/>

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <CartoonList />

        </div>
    );
}

export default CartoonsPage;
