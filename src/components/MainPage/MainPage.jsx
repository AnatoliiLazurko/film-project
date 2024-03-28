import React from 'react';
import Carousel from './Carousel/Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSeries/NewSeries';
import NewCartoons from './NewCartoons/NewCartoons';
import NewAnime from './NewAnime/NewAnime';

const MainPage = () => {
    return (
        <>
            <Carousel />

            <NewFilms />

            <NewSeries />

            <NewCartoons />

            <NewAnime />
        </>
    );
}

export default MainPage;
