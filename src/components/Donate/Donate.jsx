import React, { useEffect, useState } from 'react';
import styles from './DonateStyles.module.css';
import DonateCard from './DonateCard';
import Pagination from './Pagination/Pagination';
import { fetchDonations } from '../../slices/donationsSlices/DonatiosSlice';
import Spinner from '../Technicall/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Donate = () => {

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const pageSize = 8;

    useEffect(() => {
        
        const fetchTotalPages = async () => {
            try {
                const response = await axios.get("https://localhost:7288/api/Fundraising/countpages", {
                    params: {    
                        pageSize: pageSize,
                    }
                });

                setTotalPages(response.data);
            } catch (error) {
                console.log('Count donations page error: ' + error);
            }

        }
        
        fetchTotalPages();
    }, []);

    useEffect(() => {
        dispatch(fetchDonations({ pageNumber: currentPage, pageSize: pageSize, }))
    }, [dispatch, currentPage]);

    const fundraisingData = useSelector((state) => state.donations.donations); 
    const isLoadingFundraising = useSelector((state) => state.donations.isLoading);
    const fundraisingError = useSelector((state) => state.donations.error)

    if (isLoadingFundraising) {
        return <Spinner />;
    }

    if (fundraisingError) {
        console.log('Fundraising error: ' + fundraisingError);
    }

    return (
        <div className={styles["donate-page"]}>
            
            <h1 className={styles["page-title"]}>Welcome to BlahoFilm Charity Jar</h1>
            <p className={styles["page-description"]}>
                Welcome to our charity fundraising platform! Discover and support a variety of causes from
                environmental conservation to humanitarian aid. Your donations directly impact these initiatives,
                making a positive difference in the world. Join us in creating change today!
            </p>

            <div className={styles["donations-list"]}>

                <DonateCard fundraising={fundraisingData} />
                
            </div>

            <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />

        </div>
    );
}

export default Donate;
