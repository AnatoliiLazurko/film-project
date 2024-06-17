import React, { useEffect } from 'react';
import Carousel from './Carousel/Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSerials/NewSerials';
import NewCartoons from './NewCartoons/NewCartoons';
import NewAnime from './NewAnime/NewAnime';
import JarDonate from './JarDonate/JarDonate';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Technicall/Spinner/Spinner';
import { fetchFilms } from '../../slices/filmsSlices/FilmsSlice';
import { fetchSerials } from '../../slices/serialsSlices/SerialsSlice';
import { fetchCartoons } from '../../slices/cartoonsSlices/CartoonsSlice';
import { fetchAnime } from '../../slices/animeSlices/AnimeSlice';

const MainPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilms({ pageNumber: 1, pageSize: 18, sortByDate: 'desc', }));
        dispatch(fetchSerials({ pageNumber: 1, pageSize: 18, sortByDate: 'desc', }));
        dispatch(fetchCartoons({ pageNumber: 1, pageSize: 18, sortByDate: 'desc', }));
        dispatch(fetchAnime({ pageNumber: 1, pageSize: 18, sortByDate: 'desc', }));
    }, [dispatch])

    // FILMS 

    const filmsData = useSelector((state) => state.films.films); 
    const isLoadingFilms = useSelector((state) => state.films.isLoading);
    const filmsError = useSelector((state) => state.films.error)

    if (filmsError) {
        console.log('Films error: ' + filmsError);
    }

    // SERIALS

    const serialsData = useSelector((state) => state.serials.serials); 
    const isLoadingSerials = useSelector((state) => state.serials.isLoading);
    const serialsError = useSelector((state) => state.serials.error)

    if (serialsError) {
        console.log('Serials error: ' + serialsError);
    }

    // CARTOONS

    const cartoonsData = useSelector((state) => state.cartoons.cartoons); 
    const isLoadingCartoons = useSelector((state) => state.cartoons.isLoading);
    const cartoonsError = useSelector((state) => state.cartoons.error)

    if (cartoonsError) {
        console.log('Cartoons error: ' + cartoonsError);
    }

    // ANIME

    const animeData = useSelector((state) => state.anime.anime); 
    const isLoadingAnime = useSelector((state) => state.anime.isLoading);
    const animeError = useSelector((state) => state.anime.error)

    if (animeError) {
        console.log('Anime error: ' + animeError);
    }

    // GENERAL

    if (isLoadingFilms && isLoadingSerials && isLoadingCartoons && isLoadingAnime) {
        return <Spinner />;
    }

    // console.log(filmsData);
    //console.log(animeData);
    //console.log(cartoonsData);

    return (
        <>
            <Carousel films={filmsData} />

            <JarDonate />
            
            <NewFilms films={filmsData} />

            <NewSeries serials={serialsData} />

            <NewCartoons cartoons={cartoonsData} />

            <NewAnime anime={animeData} />
            
        </>
    );
}

export default MainPage;