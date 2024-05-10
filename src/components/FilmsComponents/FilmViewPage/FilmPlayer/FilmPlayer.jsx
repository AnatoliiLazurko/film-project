import React, { useEffect, useRef, useState } from 'react';
import styles from './Player.module.css';
import Player from './Player/Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';

const FilmPlayer = () => {

    const voiceActing = ['English', 'Ukrainian'];

    const [switchPlayer, setSwitchPlayer] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('English');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handlePlayer = (option) => {
        setSwitchPlayer(true);
        setSelectedFilter(option);
    }

    const handleTrailer = () => {
        setSwitchPlayer(false);
    }

    return (
        <div className={styles["player-section"]}>
            <div className={styles["player-content"]}>
                <div className={styles["switch-players"]}>
                    <div onClick={handleTrailer} className={styles["btn-trailer"]}>Trailer</div>
                    <div className={styles["select-container"]} onClick={() => setFilterOpen(!isFilterOpen)} ref={selectRef} key={1}>
                        <div className={styles["custom-select"]}>
                            <span>
                                {selectedFilter}
                            </span>
                            {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                            {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                        </div>
                        {isFilterOpen && 
                            <div className={styles["list-options"]}>
                                {voiceActing.map((option, index) => (
                                    <p
                                        key={index}
                                        onClick={() => { handlePlayer(option) }}
                                        className={`${option === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles["player"]}>
                    <Player switchPlayer={switchPlayer} />
                </div>
            </div>
        </div>
    );
}

export default FilmPlayer;
