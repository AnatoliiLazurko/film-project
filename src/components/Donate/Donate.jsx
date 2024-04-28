import React from 'react';
import styles from './DonateStyles.module.css';
import DonateCard from './DonateCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Donate = () => {

    const repetitions = Array.from({ length: 8 });

    return (
        <div className={styles["donate-page"]}>
            
            <h1 className={styles["page-title"]}>Welcome to BlahoFilm Charity Jar</h1>
            <p className={styles["page-description"]}>
                Welcome to our charity fundraising platform! Discover and support a variety of causes from
                environmental conservation to humanitarian aid. Your donations directly impact these initiatives,
                making a positive difference in the world. Join us in creating change today!
            </p>

            <div className={styles["donations-list"]}>

                {repetitions.map((_, index) => (
                    <DonateCard key={index}/>
                ))}
                
            </div>

            <div className={styles["pagination-section"]}>
                <FontAwesomeIcon icon={faChevronLeft} className={`${styles["pagin-arrow"]} ${styles["inactive-arrow"]}`} />
                <div className={`${styles["pagination-btn"]} ${styles["pagin-active-btn"]}`}>1</div>
                <div className={styles["pagination-btn"]}>...</div>
                <FontAwesomeIcon icon={faChevronRight} className={`${styles["pagin-arrow"]} ${styles["inactive-arrow"]}`} />
            </div>

        </div>
    );
}

export default Donate;
