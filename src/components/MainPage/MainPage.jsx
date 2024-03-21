import React from 'react';
import Carousel from './Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSeries/NewSeries';
import NewCartoons from './NewCartoons/NewCartoons';

const MainPage = () => {
    return (
        <>
            <Carousel />

            <NewFilms />

            <NewSeries />

            <NewCartoons />
        </>
    );
}

export default MainPage;
