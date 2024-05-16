import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherSeries from './OtherSerials/OtherSerials';
import Comments from './Comments/Comments';
import SerialPlayer from './SerialPlayer/SerialPlayer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSerialDetails } from '../../../slices/serialsSlices/SerialDetailsSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const SerialView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSerialDetails(id));
    }, [id, dispatch])

    const serialDetails = useSelector((state) => state.serialDetails.serialDetails); 
    const isLoading = useSelector((state) => state.serialDetails.isLoading);
    const error = useSelector((state) => state.serialDetails.error)

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        console.log("Serial details error: " + error);
    }

    return (
        <>
            
            <ViewInfo serialDetails={serialDetails} />

            <SerialPlayer />

            <OtherSeries />

            <Comments />

        </>
    );
}

export default SerialView;
