import React, { useState } from 'react';
import styles from './DonateStyles.module.css';
import DonateCard from './DonateCard';
import Pagination from './Pagination/Pagination';

const Donate = () => {

    const repetitions = Array.from({ length: 10 });
    const [currentPage, setCurrentPage] = useState(1);

    const DonatePerPage = 8;
    const indexOfLastDonate = currentPage * DonatePerPage;
    const indexOfFirstDonate = indexOfLastDonate - DonatePerPage;
    const currentDonates = repetitions.slice(indexOfFirstDonate, indexOfLastDonate);

    return (
        <div className={styles["donate-page"]}>
            
            <h1 className={styles["page-title"]}>Welcome to BlahoFilm Charity Jar</h1>
            <p className={styles["page-description"]}>
                Welcome to our charity fundraising platform! Discover and support a variety of causes from
                environmental conservation to humanitarian aid. Your donations directly impact these initiatives,
                making a positive difference in the world. Join us in creating change today!
            </p>

            <div className={styles["donations-list"]}>

                {currentDonates.map((_, index) => (
                    <DonateCard key={index}/>
                ))}
                
            </div>

            <Pagination donates={repetitions} setCurrentPage={setCurrentPage} currentPage={currentPage} />

        </div>
    );
}

export default Donate;
