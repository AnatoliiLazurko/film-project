import React from 'react';
import styles from "./MainPageStyles.module.css";

const Carousel = () => {
    return (
        <div className={styles["carousel-container"]}>
            <div className={styles["top-indicators"]}>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
            </div>
            <div className={styles["main-part"]}>

            </div>
            <div className={styles["bottom-indicators"]}>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
                <div className={styles["indicator"]}></div>
            </div>
        </div>
    );
}

export default Carousel;
