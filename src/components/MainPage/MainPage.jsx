import React, { useEffect, useState } from 'react';
import Carousel from './Carousel/Carousel';
import NewFilms from './NewFilms/NewFilms';
import NewSeries from './NewSerials/NewSerials';
import NewCartoons from './NewCartoons/NewCartoons';
import NewAnime from './NewAnime/NewAnime';
import ScrollUpButton from './ScrollUp/ScrollUpButton';
import JarDonate from './JarDonate/JarDonate';

const MainPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <Carousel />

            <JarDonate />
            
            <NewFilms />

            <NewSeries />

            <NewCartoons />

            <NewAnime />
   
            <ScrollUpButton isVisible={isVisible} />
            
        </>
    );
}

export default MainPage;
