import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherAnime from './OtherAnime/OtherAnime';
import Comments from './Comments/Comments';
import AnimePlayer from './AnimePlayer/AnimePlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeDetails } from '../../../slices/animeSlices/AnimeDetailsSlice';
import { fetchAnime } from '../../../slices/animeSlices/AnimeSlice';
const AnimeView = () => {

    const { genre, id } = useParams();
    const dispatch = useDispatch();
    const genreFilter = [];

    useEffect(() => {
        if (genre !== 'genre=u') {
            genreFilter.push(genre.replace(/_/g, ' '));
        }

        dispatch(fetchAnimeDetails(id));
        dispatch(fetchAnime(
            {
                pageNumber: 1,
                pageSize: 6,
                genres: genreFilter,
            }
        ));
        
    }, [dispatch, genre, id])

    const animeDetails = useSelector((state) => state.animeDetails.animeDetails); 
    const isLoading = useSelector((state) => state.animeDetails.isLoading);
    const error = useSelector((state) => state.animeDetails.error)

    if (error) {
        console.log("Anime details error: " + error);
    }

    // OTHER ANIME

    const animeData = useSelector((state) => state.anime.anime); 
    const isLoadingAnime = useSelector((state) => state.anime.isLoading);
    const animeError = useSelector((state) => state.anime.error)

    if (animeError) {
        console.log('Anime error: ' + animeError);
    }

    if (isLoading && isLoadingAnime) {
        return <Spinner />;
    }

    return (
        <>

            <ViewInfo animeDetails={animeDetails}/>

            <AnimePlayer animeDetails={animeDetails} />

            <OtherAnime anime={animeData} />

            <Comments />

        </>
    );
}

export default AnimeView;
