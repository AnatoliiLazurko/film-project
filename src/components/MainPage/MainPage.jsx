import React from 'react';
import Carousel from './Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSeries/NewSeries';

const MainPage = () => {
    return (
        <>
            <Carousel />

            <NewFilms />

            <NewSeries />
        </>
    );
}

export default MainPage;
