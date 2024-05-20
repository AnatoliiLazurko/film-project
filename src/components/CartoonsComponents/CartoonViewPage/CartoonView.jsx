import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherCartoons from './OtherCartoons/OtherCartoons';
import Comments from './Comments/Comments';
import CartoonPlayer from './CartoonPlayer/CartoonPlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartoonDetails } from '../../../slices/cartoonsSlices/CartoonDetailsSlice';

const CartoonView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartoonDetails(id));
    }, [id, dispatch])

    const cartoonDetails = useSelector((state) => state.cartoonDetails.cartoonDetails); 
    const isLoading = useSelector((state) => state.cartoonDetails.isLoading);
    const error = useSelector((state) => state.cartoonDetails.error)

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        console.log("Cartoon details error: " + error);
    }

    return (
        <>
            
            <ViewInfo cartoonDetails={cartoonDetails} />

            <CartoonPlayer />

            <OtherCartoons />

            <Comments />

        </>
    );
}

export default CartoonView;
