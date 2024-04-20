import React from 'react';
import styles from "./SerialMenuStyles.module.css";
import { NavLink } from 'react-router-dom';

const SerialMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Genres</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/serials/dramas'>Dramas</NavLink>
                            <NavLink to='/serials/documentaries'>Documentaries</NavLink>
                            <NavLink to='/serials/doramas'>Doramas</NavLink>
                            <NavLink to='/serials/family'>Family</NavLink>
                            <NavLink to='/serials/melodramas'>Melodramas</NavLink>
                        </div>
                        <div>
                            <NavLink to='/serials/korean'>Korean</NavLink>
                            <NavLink to='/serials/turkish'>Turkish</NavLink>
                            <NavLink to='/serials/ukrainian'>Ukrainian</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/serials/DC'>DC</NavLink>
                            <NavLink to='/serials/disney'>Disney</NavLink>
                            <NavLink to='/serials/dream_works'>Dream works</NavLink>
                            <NavLink to='/serials/netflix'>Netflix</NavLink>
                            <NavLink to='/serials/pixar'>Pixar</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SerialMenu;
