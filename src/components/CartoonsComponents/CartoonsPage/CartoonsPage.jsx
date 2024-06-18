import React, { useEffect, useState } from 'react';
import styles from './CartoonsPageStyles.module.css';
import CategoryFilter from './CartoonsFilters/CategoryFilter';
import DateFilter from './CartoonsFilters/DateFilter';
import PopularFilter from './CartoonsFilters/PopularFilter';
import { useNavigate, useParams } from 'react-router-dom';
import CartoonList from './CartoonsList/CartoonsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartoons } from '../../../slices/cartoonsSlices/CartoonsSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const CartoonsPage = () => {

    const [isClean, setIsClean] = useState(false);
    const navigate = useNavigate();

    const handleClean = () => {
        setIsClean(true);
        navigate(`/cartoons/category=u/animation=u/studio=u/date=u/popular=u/${page}`);
        setDateFilter('');
        setPopularFilter('');
    };

    // REDUX REQUEST

    const { category, animation, studio, date, popular, page } = useParams();
    const dispatch = useDispatch();
    const pageSize = 10;

    const initialPage = parseInt(page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [dateFilter, setDateFilter] = useState('');
    const [popularFilter, setPopularFilter] = useState('');
    const categoryFilter = [];
    const studioFilter = [];
    const animationFilter = [];

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
        if (category !== 'category=u') {
            categoryFilter.push(category.replace(/_/g, ' '));
        }

        if (studio !== 'studio=u') {
            studioFilter.push(studio.replace(/_/g, ' '));
        }

        if (animation !== 'animation=u') {
            animationFilter.push(animation.replace(/_/g, ' '));
        }

        dispatch(fetchCartoons(
            {
                pageNumber: currentPage,
                pageSize: pageSize,
                sortByDate: dateFilter,
                sortByPopularity: popularFilter,
                categories: categoryFilter,
                studios: studioFilter,
                animations: animationFilter,
            }
        ));
    }, [dispatch, isClean, currentPage, pageSize, dateFilter, popularFilter, category, animation, studio])

    const cartoonsData = useSelector((state) => state.cartoons.cartoons);
    const isLoadingCartoons = useSelector((state) => state.cartoons.isLoading);
    const cartoonsError = useSelector((state) => state.cartoons.error)

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

                    <CategoryFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <DateFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                    <PopularFilter isClean={isClean} setIsClean={setIsClean} setCurrentPage={setCurrentPage} />

                </div>
                <div className={styles["clean-btn"]} onClick={handleClean}>Clean</div>
            </div>

            <CartoonList
                cartoons={cartoonsData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
            />

        </div>
    );
}

export default CartoonsPage;
