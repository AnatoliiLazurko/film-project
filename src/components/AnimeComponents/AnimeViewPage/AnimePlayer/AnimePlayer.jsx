import React, { useEffect, useRef, useState } from 'react';
import Player from './Player/Player';
import styles from './PlayerStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';

const AnimePlayer = ({ animeDetails }) => {

    const { isAuth } = useAuth();
    
    const voiceActingArray = ['English'];
    const seasonArray = ['Season 1', 'Season 2', 'Season 3']
    const episodesData = {
        "Season 1": ["Episode 1", "Episode 2", "Episode 3", "Episode 4", "Episode 5"],
        "Season 2": ["Episode 1", "Episode 2"],
        "Season 3": ["Episode 1", "Episode 2", "Episode 3"],
    };

    const [switchPlayer, setSwitchPlayer] = useState(true);
    const [voiceActing, setVoiceActing] = useState('English');
    const [isVoiceActingOpen, setVoiceActingOpen] = useState(false);
    const selectVoiceRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectVoiceRef.current && !selectVoiceRef.current.contains(event.target)) {
                setVoiceActingOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [season, setSeason] = useState('Season 1');
    const [isSeasonOpen, setSeasonOpen] = useState(false);
    const selectSeasonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectSeasonRef.current && !selectSeasonRef.current.contains(event.target)) {
                setSeasonOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [episode, setEpisode] = useState('Episode 1');
    const [isEpisodeOpen, setEpisodeOpen] = useState(false);
    const selectEpisodeRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectEpisodeRef.current && !selectEpisodeRef.current.contains(event.target)) {
                setEpisodeOpen(false);
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

    const handleHistory = async () => {
        if (isAuth) {
            try {
                const data = {
                    MediaWithType: {
                        mediaId: animeDetails.id, 
                        mediaTypeId: 4, 
                    },
                    partNumber: episode, 
                    seasonNumber: season, 
                };

                await axios.post('https://localhost:7176/api/History', data, { withCredentials: true });
            } catch (error) {
                console.error('Adding history: ' + error);
            }
        }
    }

    return (
        <div className={styles["player-section"]}>
            <div className={styles["player-content"]}>
                <div className={styles["switch-players"]}>
                    <div onClick={handleTrailer} className={`${styles["btn-trailer"]} ${!switchPlayer ? styles["active"] : ''}`}>Trailer</div>
                    <div
                        className={`${styles["select-container"]} ${switchPlayer ? styles["active"] : ''}`}
                        onClick={() => setVoiceActingOpen(!isVoiceActingOpen)}
                        ref={selectVoiceRef}
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

                    <div
                        className={`${styles["select-container"]} ${switchPlayer ? styles["active"] : ''}`}
                        onClick={() => setSeasonOpen(!isSeasonOpen)}
                        ref={selectSeasonRef}
                    >
                        <div className={styles["custom-select"]}>
                            <span>
                                {season}
                            </span>
                            {!isSeasonOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                            {isSeasonOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                        </div>
                        {isSeasonOpen && 
                            <div className={styles["list-options"]}>
                                {seasonArray.map((option, index) => (
                                    <p
                                        key={index}
                                        onClick={() => {setSeason(option)}}
                                        className={`${option === season ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        }
                    </div>

                    <div
                        className={`${styles["select-container"]} ${switchPlayer ? styles["active"] : ''}`}
                        onClick={() => setEpisodeOpen(!isEpisodeOpen)}
                        ref={selectEpisodeRef}
                    >
                        <div className={styles["custom-select"]}>
                            <span>
                                {episode}
                            </span>
                            {!isEpisodeOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                            {isEpisodeOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                        </div>
                        {isEpisodeOpen && 
                            <div className={styles["list-options"]}>
                                {episodesData[season].map((option, index) => (
                                    <p
                                        key={index}
                                        onClick={() => {setEpisode(option)}}
                                        className={`${option === episode ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        }
                    </div>

                </div>
                <div className={styles["player"]} onClick={handleHistory}>
                    <Player
                        switchPlayer={switchPlayer}
                        voiceActing={voiceActing}
                        season={season}
                        episode={episode}
                        animeDetails={animeDetails}
                    />
                </div>
            </div>
        </div>
    );
}

export default AnimePlayer;
