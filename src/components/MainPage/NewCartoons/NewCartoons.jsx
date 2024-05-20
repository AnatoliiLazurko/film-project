import React, { useState } from 'react';
import styles from "./NewCartoonsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewCartoonCard from './NewCartoonCard';

const NewCartoons = ({ cartoons }) => {

    const [visibleCards, setVisibleCards] = useState(6);

    const loadMore = () => {
        setVisibleCards(prevCount => prevCount + 6);
    };

    return (
        <div className={styles["new-cartoons-section"]}>
            <span className={styles["section-title"]}>New Cartoons <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-cartoons"]}>

                {cartoons.slice(0, visibleCards).map((cartoon, index) => (
                    <NewCartoonCard key={index} cartoons={cartoon} />
                ))}
                
            </div>

            {cartoons.length > visibleCards && (
                <div className={styles["show-more"]} onClick={loadMore}>More</div>
            )}
        </div>
    );
}

export default NewCartoons;
