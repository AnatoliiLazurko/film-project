import React, { useEffect, useState } from 'react';
import styles from "./CarouselStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CarouselCard from './CarouselCard';

const Carousel = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        
        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42`);
            const moviesData = await Promise.all(
                response.data.Search.map(async movie => {
                    const detailedResponse = await axios.get(
                    `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                    );
                    return detailedResponse.data;
                })
            );
            setMovies(moviesData.slice(0, 6));
        } catch (error) {
            console.error('Помилка під час отримання фільмів:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
        
        // Зміна слайду кожних 10 секунд
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1));
        }, 10000);

        return () => clearInterval(interval);

    }, [movies.length]);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? movies.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1));
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles["carousel-container"]}>
            <div className={styles["top-panel"]}>
                <div className={styles["top-indicators"]}>
                    {movies.map((_, index) => (
                        <div key={index} onClick={() => handleDotClick(index)} className={index === currentSlide ? `${styles["active"]}` : ''}></div>
                    ))}
                </div>
            </div>
            
            <div className={styles["main-panel"]}>
                <div className={styles["main-content"]}>
                    <p className={styles["text"]}>New movies of the week</p>
      
                    <div className={styles["slider"]}>
                        <div className={styles["slides"]}>
                            <div className={styles["image-container"]} style={{ transform: `translateX(-${currentSlide * (100 / movies.length)}%)` }}>
                                {movies.map((movie, index) => (
                                    <CarouselCard key={index} movies={movie}/>
                                ))}
                            </div>
                        </div>

                        <div className={styles["controls"]}>
                            <div className={styles["prev-btn"]} onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></div>
                            <div className={styles["next-btn"]} onClick={handleNext}><FontAwesomeIcon icon={faChevronRight} /></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div className={styles["bottom-panel"]}>
                <div className={styles["bottom-indicators"]}>
                    {movies.map((_, index) => (
                        <div key={index} onClick={() => handleDotClick(index)} className={index === currentSlide ? `${styles["active"]}` : ''}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
