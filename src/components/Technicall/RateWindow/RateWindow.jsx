import React, { useState } from 'react';
import styles from './RateWindowStyles.module.css';
import axios from 'axios';

const RateWindow = ({ type, media, setIsRating }) => {

    const [selectedNumber, setSelectedNumber] = useState(null);

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
    };

    const handleRateClick = async () => {

        if (selectedNumber) {

            if (type === 'film') {
                try {
                    await axios.post('https://localhost:7095/api/Rating', {}, {
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
                    await axios.post('https://localhost:7095/api/Rating', {}, {
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
                    await axios.post('https://localhost:7095/api/Rating', {}, {
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
                    await axios.post('https://localhost:7095/api/Rating', {}, {
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
