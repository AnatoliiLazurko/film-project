import React, { useEffect } from 'react';
import styles from './SelectionsStyles.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import FilmSelections from './FilmSelections/FilmSelections';
import CartoonSelections from './CartoonSelections/CartoonSelections';
import SerialSelections from './SerialSelections/SerialSelections';
import AnimeSelections from './AnimeSelections/AnimeSelections';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmsSelections } from '../../slices/filmsSlices/FilmsSelectionsSlice';
import { fetchCartoonsSelections } from '../../slices/cartoonsSlices/CartoonsSelectionsSlice';
import { fetchSerialsSelections } from '../../slices/serialsSlices/SerialsSelectionsSlice';
import { fetchAnimeSelections } from '../../slices/animeSlices/AnimeSelectionsSlice';
import Spinner from '../Technicall/Spinner/Spinner';

const Selections = () => {

    const navigate = useNavigate();
    const { selection } = useParams();

    const showFilmSelections = () => {
        navigate('/selections/films')
    }

    const showCartoonSelections = () => {
        navigate('/selections/cartoons')
    }

    const showSerialSelections = () => {
        navigate('/selections/serials')
    }

    const showAnimeSelections = () => {
        navigate('/selections/anime')
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilmsSelections());
        dispatch(fetchCartoonsSelections());
        dispatch(fetchSerialsSelections());
        dispatch(fetchAnimeSelections());
    }, [dispatch])

    // FILMS 

    const filmsData = useSelector((state) => state.filmsSelections.filmsSelections); 
    const isLoadingFilms = useSelector((state) => state.filmsSelections.isLoading);
    const filmsError = useSelector((state) => state.filmsSelections.error)

    if (filmsError) {
        console.log('Films selections error: ' + filmsError);
    }

    // SERIALS

    const serialsData = useSelector((state) => state.serialsSelections.serialsSelections); 
    const isLoadingSerials = useSelector((state) => state.serialsSelections.isLoading);
    const serialsError = useSelector((state) => state.serialsSelections.error)

    if (serialsError) {
        console.log('Serials selections error: ' + serialsError);
    }

    // CARTOONS

    const cartoonsData = useSelector((state) => state.cartoonsSelections.cartoonsSelections); 
    const isLoadingCartoons = useSelector((state) => state.cartoonsSelections.isLoading);
    const cartoonsError = useSelector((state) => state.cartoonsSelections.error)

    if (cartoonsError) {
        console.log('Cartoons selections error: ' + cartoonsError);
    }

    // ANIME

    const animeData = useSelector((state) => state.animeSelections.animeSelections); 
    const isLoadingAnime = useSelector((state) => state.animeSelections.isLoading);
    const animeError = useSelector((state) => state.animeSelections.error)

    if (animeError) {
        console.log('Anime selections error: ' + animeError);
    }

    // GENERAL

    if (isLoadingFilms && isLoadingSerials && isLoadingCartoons && isLoadingAnime) {
        return <Spinner />;
    }

    return (
        <div className={styles["selections-page"]}>
            
            <div className={styles["nav-section"]}>
                <div onClick={showFilmSelections} className={ selection === 'films' ? `${styles["active"]}` : '' }>Film selections</div>
                <div onClick={showCartoonSelections} className={ selection === 'cartoons' ? `${styles["active"]}` : '' }>Cartoon selections</div>
                <div onClick={showSerialSelections} className={ selection === 'serials' ? `${styles["active"]}` : '' }>Serial selections</div>
                <div onClick={showAnimeSelections} className={ selection === 'anime' ? `${styles["active"]}` : '' }>Anime selections</div>
            </div>
            
            <div className={styles["selections-list"]}>
                {selection === 'films' && <FilmSelections selections={filmsData} /> }
                
                {selection === 'cartoons' && <CartoonSelections selections={cartoonsData} /> }

                {selection === 'serials' && <SerialSelections selections={serialsData} /> }

                {selection === 'anime' && <AnimeSelections selections={animeData} /> }
            </div>

        </div>
    );
}

export default Selections;
