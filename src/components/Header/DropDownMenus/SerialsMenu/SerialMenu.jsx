import React, { useEffect, useState } from 'react';
import styles from "./SerialMenuStyles.module.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SerialMenu = () => {

    // GENRES

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://localhost:7095/api/Films/genres');
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

    // STUDIOS

    const [studios, setStudios] = useState([]);

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await axios.get('https://localhost:7095/api/Films/studios ');
                setStudios(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchStudios();
    }, []);

    const rowsStudios = [];
  
    for (let i = 0; i < studios.length; i += 5) {
        rowsStudios.push(studios.slice(i, i + 5));
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
                                    <NavLink to={`/serials/${genre.name.toLowerCase().replace(/ /g, '_')}/studio=u/date=u/popular=u/1`}>{genre.name}</NavLink>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["columns-container"]}>
                        {rowsStudios.map((row, rowIndex) => (
                            <div className={styles["column"]} key={rowIndex}>
                            {row.map((studio, index) => (
                                <div className={styles["row"]} key={index}>
                                    <NavLink to={`/serials/genre=u/${studio.name.toLowerCase().replace(/ /g, '_')}/date=u/popular=u/1`}>{studio.name}</NavLink>
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

export default SerialMenu;
