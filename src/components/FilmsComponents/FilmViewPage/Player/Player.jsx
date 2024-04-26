import React, { useState } from 'react';
import styles from './PlayerStyles.module.css';
import TrailerPlayer from './TrailerPlayer/TrailerPlayer';
import FilmPlayer from './FilmPalyer/FilmPlayer';


const Player = () => {

    const [switchPlayer, setSwitchPlayer] = useState(true);

    return (
        <div className={styles["player-section"]}>
            <div className={styles["player"]}>
                
                {switchPlayer && <FilmPlayer />}
                {!switchPlayer && <TrailerPlayer />}

            </div>
        </div>
    );
}

export default Player;
