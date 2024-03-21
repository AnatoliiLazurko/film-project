import React, { useEffect, useState } from 'react';
import styles from "./NewAnimeStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NewAnimeCard from './NewAnimeCard';

const NewAnime = () => {

    const [anime, setAnime] = useState([]);

    const fetchAnime = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42&page=3`);
            const animeData = await Promise.all(
                response.data.Search.map(async anime => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${anime.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setAnime(animeData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

    useEffect(() => {

        fetchAnime();
    }, []);

    // console.log(anime);

    return (
        <div className={styles["new-anime-section"]}>
            <span className={styles["section-title"]}>New Anime <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-anime"]}>

                {anime.map((anime, index) => (
                    <NewAnimeCard key={index} anime={anime} />
                ))}
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewAnime;
