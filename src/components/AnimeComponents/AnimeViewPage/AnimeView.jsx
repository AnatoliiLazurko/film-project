import React, { useEffect } from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherAnime from './OtherAnime/OtherAnime';
import Comments from './Comments/Comments';
import AnimePlayer from './AnimePlayer/AnimePlayer';
import Spinner from '../../Technicall/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeDetails } from '../../../slices/animeSlices/AnimeDetailsSlice';

const AnimeView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAnimeDetails(id));
    }, [id, dispatch])

    const animeDetails = useSelector((state) => state.animeDetails.animeDetails); 
    const isLoading = useSelector((state) => state.animeDetails.isLoading);
    const error = useSelector((state) => state.animeDetails.error)

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        console.log("Anime details error: " + error);
    }

    return (
        <>

            <ViewInfo animeDetails={animeDetails}/>

            <AnimePlayer />

            <OtherAnime />

            <Comments />

        </>
    );
}

export default AnimeView;
