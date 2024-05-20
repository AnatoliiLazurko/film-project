import React, { useState } from 'react';
import styles from "./NewSerialsStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import NewSerialCard from './NewSerialCard';

const NewSerials = ({serials}) => {

    const [visibleCards, setVisibleCards] = useState(6);

    const loadMore = () => {
        setVisibleCards(prevCount => prevCount + 6);
    };

    return (
        <div className={styles["new-serials-section"]}>
            <span className={styles["section-title"]}>New Serials <FontAwesomeIcon icon={faChevronRight} /></span>
            <div className={styles["list-new-serials"]}>

                {serials.slice(0, visibleCards).map((serial, index) => (
                    <NewSerialCard key={index} serials={serial} />
                ))}
                
            </div>

            {serials.length > visibleCards && (
                <div className={styles["show-more"]} onClick={loadMore}>More</div>
            )}
        </div>
    );
}

export default NewSerials;
