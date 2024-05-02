import React from 'react';
import styles from '../SelectionsStyles.module.css';
import { NavLink } from 'react-router-dom';

const AnimeSelections = () => {

    const repetitions = Array.from({ length: 20 });

    return (
        <>
            {repetitions.map((_, index) => (
                <NavLink to={'/selection/anime/top_shonen_anime'} className={styles["selection-card"]} key={index}>
                    <img src="https://s3-alpha-sig.figma.com/img/31a5/4d6d/9744b51b6143614d1b3104ae1d277f71?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bS42Qg3gncQUQWdioc4haDm32hd1LgF2H0X4Gj2XzyCuzXzb4R710Z-SJQxljHartHvN1dR9T~aQoinoII-CWiTSWA~9wPpfWGbdis4wZZ3-iD0ANr9UCSt6LFcPmqS3NhnxUcpwj6K85x4KpTEALlaB4KR0~-2HH6jKaHJdfhONCp0DPTXQIqIt3RU6pgrfDhWm2miSnMRl38Yn2HdRQEp6lPCPasHqyc5T9mkHGm3wp9AYNbkP2xLFdhJkAwlIxbfO5EwFG9atFnAV5isA8xtdc-rxQPbxKVBK8DUXPbJl2~hUODPpvw8KMcFtuwlkLGV3VvyAnTvf7mPneT2u2w__" alt="Top anime anime" />
                    <p className={styles["selection-name"]}>Top shonen anime</p>
                </NavLink>
            ))}
        </>
    );
}

export default AnimeSelections;
