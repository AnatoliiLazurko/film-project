import React, { useEffect, useRef, useState } from 'react';
import Player from './Player/Player';
import styles from './PlayerStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../../../constants/userEndpoints';
import { ANIME_ENDPOINTS } from '../../../../constants/animeEndpoints';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AnimePlayer = ({ animeDetails, setPartId }) => {

    const { isAuth } = useAuth();

    const navigate = useNavigate();
    const { genre, id } = useParams();

    const query = useQuery();
    const seasonUrl = query.get('season');
    const episodUrl = query.get('episod');

    const [partExists, setPartExists] = useState(false);
    
    const voiceActingArray = ['English'];
    const [seasonArray, setSeasonArray] = useState([]);
    const [episodesData, setEpisodesData] = useState({});

    useEffect(() => {
        const fetchAnimeParts = async () => {
            try {
                const response = await axios.get(`${ANIME_ENDPOINTS.getAnimeParts}?animeId=${animeDetails.id}`);
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

                if (seasonUrl && episodUrl) {
                    setSeason(Number(seasonUrl));
                    setEpisode(structuredData[seasonUrl]?.find(ep => ep.episodeNumber === Number(episodUrl)) || { episodeNumber: 1, episodeId: 1 });
                }
            } catch (error) {
                //console.log("Fetch anime parts error: " + error);
                if (error.response.status === 404) {
                    setPartExists(false);
                }
            }
        };

        fetchAnimeParts();
    }, [animeDetails]);

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

    const [season, setSeason] = useState(Number(seasonUrl) || 1);
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

    const [episode, setEpisode] = useState({ episodeNumber: Number(episodUrl) || 1, episodeId: 1 });
    const [isEpisodeOpen, setEpisodeOpen] = useState(false);
    const selectEpisodeRef = useRef(null);

    setPartId(partExists ? episode.episodeId : 0);

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

    useEffect(() => {
        
        if (partExists) {
            navigate(`/anime-view/${genre}/${id}?season=${season}&episod=${episode.episodeNumber}`);
        }

    }, [partExists, season, episode]);

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
                        animeDetails={animeDetails}
                        partExists={partExists}
                    />
                </div>
            </div>
        </div>
    );
}

export default AnimePlayer;
