import React, { useState } from 'react';
import styles from './RateWindowStyles.module.css';

const RateWindow = ({ type, setIsRating }) => {

    const [selectedNumber, setSelectedNumber] = useState(null);

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
    };

    const handleRateClick = () => {
        console.log(selectedNumber);
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
