import React, { useEffect, useState } from 'react';
import styles from "./AnimeMenuStyles.module.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ANIME_ENDPOINTS } from '../../../../constants/animeEndpoints';

const AnimeMenu = () => {

    // GENRES

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(ANIME_ENDPOINTS.getGenres);
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const rowsGenres = [];
  
    for (let i = 0; i < genres.length; i += 5) {
        rowsGenres.push(genres.slice(i, i + 5));
    }

    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Genres</p>
                    <div className={styles["columns-container"]}>
                        {rowsGenres.map((row, rowIndex) => (
                            <div className={styles["column"]} key={rowIndex}>
                            {row.map((genre, index) => (
                                <div className={styles["row"]} key={index}>
                                    <NavLink to={`/anime/${genre.name.toLowerCase().replace(/ /g, '_')}/date=u/popular=u/1`}>{genre.name}</NavLink>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeMenu;
