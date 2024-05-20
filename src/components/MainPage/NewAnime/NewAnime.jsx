import React, { useState } from 'react';
import styles from "./NewAnimeStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewAnimeCard from './NewAnimeCard';

const NewAnime = ({ anime }) => {

    const [visibleCards, setVisibleCards] = useState(6);

    const loadMore = () => {
        setVisibleCards(prevCount => prevCount + 6);
    };

    return (
        <div className={styles["new-anime-section"]}>
            <span className={styles["section-title"]}>New Anime <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-anime"]}>

                {anime.slice(0, visibleCards).map((anime, index) => (
                    <NewAnimeCard key={index} anime={anime} />
                ))}
                
            </div>

            {anime.length > visibleCards && (
                <div className={styles["show-more"]} onClick={loadMore}>More</div>
            )}
        </div>
    );
}

export default NewAnime;
