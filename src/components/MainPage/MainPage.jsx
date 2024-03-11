import React from 'react';
import styles from "./MainPageStyles.module.css";
import Carousel from './Carousel';
import NewFilms from './NewFilms';

const MainPage = () => {
    return (
        <>
            <Carousel />

            <NewFilms />
        </>
    );
}

export default MainPage;
