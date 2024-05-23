import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherCartoons from './OtherCartoons/OtherCartoons';
import Comments from './Comments/Comments';
import CartoonPlayer from './CartoonPlayer/CartoonPlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartoonDetails } from '../../../slices/cartoonsSlices/CartoonDetailsSlice';
import { fetchCartoons } from '../../../slices/cartoonsSlices/CartoonsSlice';

const CartoonView = () => {

    const { category, id } = useParams();
    const dispatch = useDispatch();
    const categoryFilter = [];

    useEffect(() => {
        if (category !== 'category=u') {
            categoryFilter.push(category.replace(/_/g, ' '));
        }

        dispatch(fetchCartoonDetails(id));
        dispatch(fetchCartoons(
            {
                pageNumber: 1,
                pageSize: 6,
                categories: categoryFilter,
            }
        ));
        
    }, [dispatch, category, id])

    const cartoonDetails = useSelector((state) => state.cartoonDetails.cartoonDetails); 
    const isLoading = useSelector((state) => state.cartoonDetails.isLoading);
    const error = useSelector((state) => state.cartoonDetails.error)

    if (error) {
        console.log("Cartoon details error: " + error);
    }

    // OTHER CARTOONS

    const cartoonsData = useSelector((state) => state.cartoons.cartoons); 
    const isLoadingCartoons = useSelector((state) => state.cartoons.isLoading);
    const cartoonsError = useSelector((state) => state.cartoons.error)

    if (cartoonsError) {
        console.log('Cartoons error: ' + cartoonsError);
    }

    if (isLoading && isLoadingCartoons) {
        return <Spinner />;
    }

    return (
        <>
            
            <ViewInfo cartoonDetails={cartoonDetails} />

            <CartoonPlayer cartoonDetails={cartoonDetails} />

            <OtherCartoons cartoons={cartoonsData} />

            <Comments />

        </>
    );
}

export default CartoonView;
