import React from 'react';
import styles from './SelectionsStyles.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import FilmSelections from './FilmSelections/FilmSelections';
import CartoonSelections from './CartoonSelections/CartoonSelections';
import SerialSelections from './SerialSelections/SerialSelections';
import AnimeSelections from './AnimeSelections/AnimeSelections';

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

    return (
        <div className={styles["selections-page"]}>
            
            <div className={styles["nav-section"]}>
                <div onClick={showFilmSelections} className={ selection === 'films' ? `${styles["active"]}` : '' }>Film selections</div>
                <div onClick={showCartoonSelections} className={ selection === 'cartoons' ? `${styles["active"]}` : '' }>Cartoon selections</div>
                <div onClick={showSerialSelections} className={ selection === 'serials' ? `${styles["active"]}` : '' }>Serial selections</div>
                <div onClick={showAnimeSelections} className={ selection === 'anime' ? `${styles["active"]}` : '' }>Anime selections</div>
            </div>
            
            <div className={styles["selections-list"]}>
                {selection === 'films' && <FilmSelections /> }
                
                {selection === 'cartoons' && <CartoonSelections /> }

                {selection === 'serials' && <SerialSelections /> }

                {selection === 'anime' && <AnimeSelections /> }
            </div>

        </div>
    );
}

export default Selections;
