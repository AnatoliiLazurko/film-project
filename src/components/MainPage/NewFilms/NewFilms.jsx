import React from 'react';
import styles from "./NewFilmsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewFilmCard from './NewFilmCard';

const NewFilms = () => {


    return (
        <div className={styles["new-films-section"]}>
            <span className={styles["section-title"]}>New Films <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-films"]}>

                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                <NewFilmCard />
                
            </div>

            <div className={styles["show-more"]}>More</div>
        </div>
    );
}

export default NewFilms;
