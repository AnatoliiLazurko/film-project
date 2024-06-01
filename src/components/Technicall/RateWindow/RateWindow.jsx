import React, { useState } from 'react';
import styles from './RateWindowStyles.module.css';
import axios from 'axios';
import { FILM_ENDPOINTS } from '../../../constants/filmEndpoints';
import { CARTOON_ENDPOINTS } from '../../../constants/cartoonEndpoints';
import { SERIAL_ENDPOINTS } from '../../../constants/serialEndpoints';
import { ANIME_ENDPOINTS } from '../../../constants/animeEndpoints';

const RateWindow = ({ type, media, setIsRating }) => {

    const [selectedNumber, setSelectedNumber] = useState(null);

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
    };

    const handleRateClick = async () => {

        if (selectedNumber) {

            if (type === 'film') {
                try {
                    await axios.post(FILM_ENDPOINTS.rateFilm, {}, {
                        params: {    
                            filmId: media.id,
                            rate: selectedNumber,
                        },
                        withCredentials: true 
                    });
                } catch (error) {
                    console.log('Media rate error: ' + error);
                }
            }
            if (type === 'cartoon') {
                try {
                    await axios.post(CARTOON_ENDPOINTS.rateCartoon, {}, {
                        params: {    
                            cartoonId: media.id,
                            rate: selectedNumber,
                        },
                        withCredentials: true 
                    });
                } catch (error) {
                    console.log('Media rate error: ' + error);
                }
            }
            if (type === 'serial') {
                try {
                    await axios.post(SERIAL_ENDPOINTS.rateSerial, {}, {
                        params: {    
                            serialId: media.id,
                            rate: selectedNumber,
                        },
                        withCredentials: true 
                    });
                } catch (error) {
                    console.log('Media rate error: ' + error);
                }
            }
            if (type === 'anime') {
                try {
                    await axios.post(ANIME_ENDPOINTS.rateAnime, {}, {
                        params: {    
                            animeId: media.id,
                            rate: selectedNumber,
                        },
                        withCredentials: true 
                    });
                } catch (error) {
                    console.log('Media rate error: ' + error);
                }
            }
        }

        setIsRating(false);
    };

    return (
        <>
            <div className={styles["alert"]}>
                <h1>Rate this {type}</h1>
                <div className={styles["rate-container"]}>
                    {[...Array(10)].map((_, index) => {
                        const number = index + 1;
                        const numberStyle = { color: selectedNumber && number <= selectedNumber ? '#6D8EEB' : '#514F5A', };
                        return (
                        <span key={number} style={numberStyle} onClick={() => handleNumberClick(number)}>
                            {number}
                        </span>
                        );
                    })}
                </div>
                <div className={styles["btn-rate"]} onClick={handleRateClick}>Rate</div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default RateWindow;
