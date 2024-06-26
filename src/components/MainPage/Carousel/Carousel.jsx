import React, { useEffect, useState } from 'react';
import styles from "./CarouselStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import CarouselCard from './CarouselCard';

const Carousel = ({ films }) => {

    // Беруться лише 6 фільмів які маю частини постера
    const filteredFilms = films.filter(film => film.posterPartOne && film.posterPartOne.trim() !== '').slice(0, 6);

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide === filteredFilms.length - 1 ? 0 : prevSlide + 1));
        }, 10000);

        return () => clearInterval(interval);

    }, [filteredFilms.length]);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? filteredFilms.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === filteredFilms.length - 1 ? 0 : prevSlide + 1));
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles["carousel-container"]}>
            <div className={styles["top-panel"]}>
                <div className={styles["top-indicators"]}>
                    {filteredFilms.map((_, index) => (
                        <div key={index} onClick={() => handleDotClick(index)} className={index === currentSlide ? `${styles["active"]}` : ''}></div>
                    ))}
                </div>
            </div>
            
            <div className={styles["main-panel"]}>
                <div className={styles["main-content"]}>
                    <p className={styles["text"]}>New movies of the week</p>
      
                    <div className={styles["slider"]}>
                        <div className={styles["slides"]}>
                            <div className={styles["image-container"]} style={{ transform: `translateX(-${currentSlide * (100 / filteredFilms.length)}%)` }}>
                                {filteredFilms.map((film, index) => (
                                    <CarouselCard key={index} films={film}/>
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
                    {filteredFilms.map((_, index) => (
                        <div key={index} onClick={() => handleDotClick(index)} className={index === currentSlide ? `${styles["active"]}` : ''}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
