import React, { useEffect, useState } from 'react';
import styles from "./NewSeriesStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NewSeriesCard from './NewSeriesCard';

const NewSeries = () => {

    const [series, setSeries] = useState([]);

    const fetchSeries = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=series&apikey=bfec6a42`);
            const seriesData = await Promise.all(
                response.data.Search.map(async serial => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${serial.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setSeries(seriesData);
        } catch (error) {
            console.error('Помилка під час отримання серіалів:', error);
        }
    };

    useEffect(() => {

        fetchSeries();
    }, []);

    // console.log(series);

    return (
        <div className={styles["new-series-section"]}>
            <span className={styles["section-title"]}>New Series <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-series"]}>

                {series.map((serial, index) => (
                    <NewSeriesCard key={index} series={serial} />
                ))}
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewSeries;
