import React, { useEffect, useState } from 'react';
import styles from './CartoonsPageStyles.module.css';
import CategoryFilter from './CartoonsFilters/CategoryFilter';
import DateFilter from './CartoonsFilters/DateFilter';
import PopularFilter from './CartoonsFilters/PopularFilter';
import { useNavigate, useParams } from 'react-router-dom';
import CartoonList from './CartoonsList/CartoonsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredCartoons } from '../../../slices/cartoonsSlices/CartoonsFiltersSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const CartoonsPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/cartoons/category=u/date=u/popular=u/${page}`);
    };

    // REDUX REQUEST

    const { category, page } = useParams();
    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilteredCartoons(
            {
                category: category,
                pageNumber: currentPage 
            }
        ));
    }, [dispatch, currentPage])

    const cartoonsData = useSelector((state) => state.filteredCartoons.filteredCartoons); 
    const isLoadingCartoons = useSelector((state) => state.filteredCartoons.isLoading);
    const cartoonsError = useSelector((state) => state.filteredCartoons.error)

    if (isLoadingCartoons) {
        return <Spinner />;
    }

    if (cartoonsError) {
        console.log('Cartoons error: ' + cartoonsError);
    }

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

            <CartoonList cartoons={cartoonsData} setCurrentPage={setCurrentPage} currentPage={currentPage} />

        </div>
    );
}

export default CartoonsPage;
