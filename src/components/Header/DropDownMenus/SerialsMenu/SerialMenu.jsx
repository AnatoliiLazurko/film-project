import React from 'react';
import styles from "./SerialMenu.module.css";
import { NavLink } from 'react-router-dom';

const SerialMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Genres</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/serials/genre:dramas'>Dramas</NavLink>
                            <NavLink to='/serials/genre:documentaries'>Documentaries</NavLink>
                            <NavLink to='/serials/genre:doramas'>Doramas</NavLink>
                            <NavLink to='/serials/genre:family'>Family</NavLink>
                            <NavLink to='/serials/genre:melodramas'>Melodramas</NavLink>
                        </div>
                        <div>
                            <NavLink to='/serials/genre:korean'>Korean</NavLink>
                            <NavLink to='/serials/genre:turkish'>Turkish</NavLink>
                            <NavLink to='/serials/genre:ukrainian'>Ukrainian</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/serials/popular-studio:DC'>DC</NavLink>
                            <NavLink to='/serials/popular-studio:disney'>Disney</NavLink>
                            <NavLink to='/serials/popular-studio:dream_works'>Dream works</NavLink>
                            <NavLink to='/serials/popular-studio:netflix'>Netflix</NavLink>
                            <NavLink to='/serials/popular-studio:pixar'>Pixar</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SerialMenu;
