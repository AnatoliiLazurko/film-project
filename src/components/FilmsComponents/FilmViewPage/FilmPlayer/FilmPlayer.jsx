import React, { useEffect, useRef, useState } from 'react';
import styles from './PlayerStyles.module.css';
import Player from './Player/Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';

const FilmPlayer = ({ filmDetails }) => {

    const voiceActingArray = ['English'];

    const [switchPlayer, setSwitchPlayer] = useState(true);
    const [voiceActing, setVoiceActing] = useState('English');
    const [isVoiceActingOpen, setVoiceActingOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setVoiceActingOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handlePlayer = (option) => {
        setSwitchPlayer(true);
        setVoiceActing(option);
    }

    const handleTrailer = () => {
        setSwitchPlayer(false);
        setVoiceActing('Player');
    }

    return (
        <div className={styles["player-section"]}>
            <div className={styles["player-content"]}>
                <div className={styles["switch-players"]}>
                    <div onClick={handleTrailer} className={`${styles["btn-trailer"]} ${!switchPlayer ? styles["active"] : ''}`}>Trailer</div>
                    <div
                        className={`${styles["select-container"]} ${switchPlayer ? styles["active"] : ''}`}
                        onClick={() => setVoiceActingOpen(!isVoiceActingOpen)}
                        ref={selectRef}
                    >
                        <div className={styles["custom-select"]}>
                            <span>
                                {voiceActing}
                            </span>
                            {!isVoiceActingOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                            {isVoiceActingOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                        </div>
                        {isVoiceActingOpen && 
                            <div className={styles["list-options"]}>
                                {voiceActingArray.map((option, index) => (
                                    <p
                                        key={index}
                                        onClick={() => { handlePlayer(option) }}
                                        className={`${option === voiceActing ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles["player"]}>
                    <Player switchPlayer={switchPlayer} voiceActing={voiceActing} filmDetails={filmDetails} />
                </div>
            </div>
        </div>
    );
}

export default FilmPlayer;
