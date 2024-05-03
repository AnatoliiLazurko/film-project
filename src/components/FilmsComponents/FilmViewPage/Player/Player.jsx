import React, { useState } from 'react';
import styles from './PlayerStyles.module.css';
import TrailerPlayer from './TrailerPlayer/TrailerPlayer';
import FilmPlayer from './FilmPalyer/FilmPlayer';


const Player = () => {

    const [switchPlayer, setSwitchPlayer] = useState(true);

    const handlePlayer = () => {
        setSwitchPlayer(true);
    }

    const handleTrailer = () => {
        setSwitchPlayer(false);
    }

    return (
        <div className={styles["player-section"]}>
            <div className={styles["player-content"]}>
                <div className={styles["switch-players"]}>
                    <div onClick={handlePlayer}>Player</div>
                    <div onClick={handleTrailer}>Trailer</div>
                </div>
                <div className={styles["player"]}>
                    
                    {switchPlayer && <FilmPlayer />}
                    {!switchPlayer && <TrailerPlayer />}

                </div>
            </div>
        </div>
    );
}

export default Player;
