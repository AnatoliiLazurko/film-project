import React from 'react';
import Carousel from './Carousel/Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSerials/NewSerials';
import NewCartoons from './NewCartoons/NewCartoons';
import NewAnime from './NewAnime/NewAnime';
import JarDonate from './JarDonate/JarDonate';

const MainPage = () => {

    return (
        <>
            <Carousel />

            <JarDonate />
            
            <NewFilms />

            <NewSeries />

            <NewCartoons />

            <NewAnime />
            
        </>
    );
}

export default MainPage;
