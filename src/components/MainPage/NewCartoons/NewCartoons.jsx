import React, { useEffect, useState } from 'react';
import styles from "./NewCartoonsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NewCartoonCard from './NewCartoonCard';

const NewCartoons = () => {

    const [cartoons, setCartoons] = useState([]);

    const fetchCartoons = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42&page=2`);
            const moviesData = await Promise.all(
                response.data.Search.map(async movie => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setCartoons(moviesData);
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

    useEffect(() => {

        fetchCartoons();
    }, []);

    return (
        <div className={styles["new-cartoons-section"]}>
            <span className={styles["section-title"]}>New Cartoons <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-cartoons"]}>

                {cartoons.map((cartoon, index) => (
                    <NewCartoonCard key={index} cartoons={cartoon} />
                ))}
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewCartoons;
