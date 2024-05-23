import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherFilms from './OtherFilms/OtherFilms';
import Comments from './Comments/Comments';
import FilmPlayer from './FilmPlayer/FilmPlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmDetails } from '../../../slices/filmsSlices/FilmDetailsSlice';
import { fetchFilms } from '../../../slices/filmsSlices/FilmsSlice';

const FilmView = () => {

    const { genre, id } = useParams();
    const dispatch = useDispatch();
    const genreFilter = [];

    useEffect(() => {
        if (genre !== 'genre=u') {
            genreFilter.push(genre.replace(/_/g, ' '));
        }

        dispatch(fetchFilmDetails(id));
        dispatch(fetchFilms(
            {
                pageNumber: 1,
                pageSize: 6,
                genres: genreFilter,
            }
        ));
        
    }, [dispatch, genre, id])

    const filmDetails = useSelector((state) => state.filmDetails.filmDetails); 
    const isLoading = useSelector((state) => state.filmDetails.isLoading);
    const error = useSelector((state) => state.filmDetails.error)

    if (error) {
        console.log("Film details error: " + error);
    }

    // OTHER FILMS

    const filmsData = useSelector((state) => state.films.films); 
    const isLoadingFilms = useSelector((state) => state.films.isLoading);
    const filmsError = useSelector((state) => state.films.error)

    if (filmsError) {
        console.log('Films error: ' + filmsError);
    }

    if (isLoading && isLoadingFilms) {
        return <Spinner />;
    }
    
    return (
        <>
            
            <ViewInfo filmDetails={filmDetails} />

            <FilmPlayer filmDetails={filmDetails} />

            <OtherFilms films={filmsData.slice(0, 6)} />

            <Comments />

        </>
    );
}

export default FilmView;
