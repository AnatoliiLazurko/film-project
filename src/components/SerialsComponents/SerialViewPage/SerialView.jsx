import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherSeries from './OtherSerials/OtherSerials';
import Comments from './Comments/Comments';
import SerialPlayer from './SerialPlayer/SerialPlayer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSerialDetails } from '../../../slices/serialsSlices/SerialDetailsSlice';
import { fetchSerials } from '../../../slices/serialsSlices/SerialsSlice';
import Spinner from '../../Technicall/Spinner/Spinner';

const SerialView = () => {

    const { genre, id } = useParams();
    const dispatch = useDispatch();
    const genreFilter = [];

    useEffect(() => {
        if (genre !== 'genre=u') {
            genreFilter.push(genre.replace(/_/g, ' '));
        }

        dispatch(fetchSerialDetails(id));
        dispatch(fetchSerials(
            {
                pageNumber: 1,
                pageSize: 6,
                genres: genreFilter,
            }
        ));

    }, [dispatch, genre, id])

    const serialDetails = useSelector((state) => state.serialDetails.serialDetails); 
    const isLoading = useSelector((state) => state.serialDetails.isLoading);
    const error = useSelector((state) => state.serialDetails.error)

    if (error) {
        console.log("Serial details error: " + error);
    }

    // OTHER FILMS

    const serialsData = useSelector((state) => state.films.films); 
    const isLoadingSerials = useSelector((state) => state.films.isLoading);
    const serialsError = useSelector((state) => state.films.error)

    if (serialsError) {
        console.log('Films error: ' + serialsError);
    }

    if (isLoading && isLoadingSerials) {
        return <Spinner />;
    }

    return (
        <>
            
            <ViewInfo serialDetails={serialDetails} />

            <SerialPlayer serialDetails={serialDetails} />

            <OtherSeries serials={serialsData.slice(0, 6)} />

            <Comments />

        </>
    );
}

export default SerialView;
