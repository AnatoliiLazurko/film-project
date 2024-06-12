import React, { useEffect, useRef, useState } from 'react';
import Player from './Player/Player';
import styles from './PlayerStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../../../constants/userEndpoints';
import { CARTOON_ENDPOINTS } from '../../../../constants/cartoonEndpoints';

const CartoonPlayer = ({ cartoonDetails, setPartId }) => {

    const { isAuth } = useAuth();

    const [partExists, setPartExists] = useState(false);

    const voiceActingArray = ['English'];
    const [seasonArray, setSeasonArray] = useState([]);
    const [episodesData, setEpisodesData] = useState({});

    useEffect(() => {
        const fetchCartoonParts = async () => {
            try {
                const response = await axios.get(`${CARTOON_ENDPOINTS.getCartoonParts}?cartoonId=${cartoonDetails.id}`);
                const fetchedParts = response.data;

                const structuredData = fetchedParts.reduce((acc, part) => {
                    const { seasonNumber, partNumber, id } = part;
                    const seasonKey = seasonNumber;
                    const episodeKey = { episodeNumber: partNumber, episodeId: id };
                    if (!acc[seasonKey]) {
                        acc[seasonKey] = [];
                    }
                    acc[seasonKey].push(episodeKey);
                    return acc;
                }, {});

                setSeasonArray(Object.keys(structuredData));
                setEpisodesData(structuredData);
                setPartExists(true);
            } catch (error) {
                //console.log("Fetch cartoon parts error: " + error);
                if (error.response.status === 404) {
                    setPartExists(false);
                }
            }
        };

        fetchCartoonParts();
    }, [cartoonDetails]);

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

    const [season, setSeason] = useState(1);
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

    const [episode, setEpisode] = useState({ episodeNumber: 1, episodeId: 1 });
    const [isEpisodeOpen, setEpisodeOpen] = useState(false);
    const selectEpisodeRef = useRef(null);

    setPartId(episode.episodeId);

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
                        mediaId: cartoonDetails.id, 
                        mediaTypeId: 3, 
                    },
                    partNumber: episode.episodeNumber, 
                    seasonNumber: season, 
                };

                await axios.post(USER_ENDPOINTS.addHistory, data, { withCredentials: true });
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

                    {partExists &&
                        <>
                            <div
                                className={`${styles["select-container"]} ${switchPlayer ? styles["active"] : ''}`}
                                onClick={() => setSeasonOpen(!isSeasonOpen)}
                                ref={selectSeasonRef}
                            >
                                <div className={styles["custom-select"]}>
                                    <span>
                                        Season {season}
                                    </span>
                                    {!isSeasonOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                                    {isSeasonOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                                </div>
                                {isSeasonOpen && 
                                    <div className={styles["list-options"]}>
                                        {seasonArray.map((option, index) => (
                                            <p
                                                key={index}
                                                onClick={() => { setSeason(option); setEpisode(episodesData[option][0]); }}
                                                className={`${option === season.toString() ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                            >
                                                Season {option}
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
                                        Episod {episode.episodeNumber}
                                    </span>
                                    {!isEpisodeOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                                    {isEpisodeOpen && <FontAwesomeIcon icon={faCaretDown}/>}
                                </div>
                                {isEpisodeOpen && 
                                    <div className={styles["list-options"]}>
                                        {episodesData[season]?.map((option, index) => (
                                            <p
                                                key={index}
                                                onClick={() => { setEpisode(option); }}
                                                className={`${option.episodeNumber === episode.episodeNumber ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                            >
                                                Episod {option.episodeNumber}
                                            </p>
                                        ))}
                                    </div>
                                }
                            </div>
                        </>
                    }

                </div>
                <div className={styles["player"]} onClick={handleHistory}>
                    <Player
                        switchPlayer={switchPlayer}
                        voiceActing={voiceActing}
                        episodeId={episode.episodeId}
                        cartoonDetails={cartoonDetails}
                        partExists={partExists}
                    />
                </div>
            </div>
        </div>
    );
}

export default CartoonPlayer;
