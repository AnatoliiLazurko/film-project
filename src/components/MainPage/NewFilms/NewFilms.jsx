import React, { useState } from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewFilmCard from './NewFilmCard';

const NewFilms = ({films}) => {

    const [visibleCards, setVisibleCards] = useState(6);

    const loadMore = () => {
        setVisibleCards(prevCount => prevCount + 6);
    };

    return (
        <div className={styles["new-films-section"]}>
            <span className={styles["section-title"]}>New Films <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-films"]}>

                {films.slice(0, visibleCards).map((film, index) => (
                    <NewFilmCard key={index} films={film} />
                ))}
                
            </div>

            {films.length > visibleCards && (
                <div className={styles["show-more"]} onClick={loadMore}>More</div>
            )}
        </div>
    );
}

export default NewFilms;
