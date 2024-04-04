import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp} from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollUpStyles.module.css';

const ScrollUpButton = ({ isVisible }) => {
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`${styles["scroll-btn"]} ${isVisible ? styles["show"] : styles["hide"]}`} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
        </div> 
    );
}

export default ScrollUpButton;
