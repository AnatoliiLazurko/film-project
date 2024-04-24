import React, { useEffect, useState } from 'react';
import styles from "./NewSerialsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NewSerialCard from './NewSerialCard';

const NewSerials = () => {

    const [serials, setSerials] = useState([]);

    const fetchSerials = async () => {

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=series&apikey=bfec6a42`);
            const serialsData = await Promise.all(
                response.data.Search.map(async serial => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${serial.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setSerials(serialsData);
        } catch (error) {
            console.error('Помилка під час отримання серіалів:', error);
        }
    };

    useEffect(() => {
        fetchSerials();
    }, []);


    return (
        <div className={styles["new-serials-section"]}>
            <span className={styles["section-title"]}>New Serials <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-serials"]}>

                {serials.map((serial, index) => (
                    <NewSerialCard key={index} serials={serial} />
                ))}
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewSerials;
