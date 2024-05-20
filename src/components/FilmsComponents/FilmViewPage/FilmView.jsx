import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherMovies from './OtherMovies/OtherMovies';
import Comments from './Comments/Comments';
import FilmPlayer from './FilmPlayer/FilmPlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmDetails } from '../../../slices/filmsSlices/FilmDetailsSlice';

const FilmView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilmDetails(id));
    }, [id, dispatch])

    const filmDetails = useSelector((state) => state.filmDetails.filmDetails); 
    const isLoading = useSelector((state) => state.filmDetails.isLoading);
    const error = useSelector((state) => state.filmDetails.error)

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        console.log("Film details error: " + error);
    }
    
    return (
        <>
            
            <ViewInfo filmDetails={filmDetails} />

            <FilmPlayer />

            <OtherMovies />

            <Comments />

        </>
    );
}

export default FilmView;
