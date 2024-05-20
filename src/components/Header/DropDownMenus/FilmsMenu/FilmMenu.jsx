import React from 'react';
import styles from "./FilmMenuStyles.module.css";
import { NavLink } from 'react-router-dom';

const FilmMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Genres</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/films/action'>Action</NavLink>
                            <NavLink to='/films/biographical'>Biographical</NavLink>
                            <NavLink to='/films/crime'>Crime</NavLink>
                            <NavLink to='/films/comedies'>Comedies</NavLink>
                            <NavLink to='/films/dramas'>Dramas</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/detectives'>Detectives</NavLink>
                            <NavLink to='/films/documentaries'>Documentaries</NavLink>
                            <NavLink to='/films/family'>Family</NavLink>
                            <NavLink to='/films/fantasy'>Fantasy</NavLink>
                            <NavLink to='/films/historical'>Historical</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/melodrams'>Melodrams</NavLink>
                            <NavLink to='/films/musicals'>Musicals</NavLink>
                            <NavLink to='/films/thrillers'>Thrillers</NavLink>
                            <NavLink to='/films/westerns'>Westerns</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/short_films'>Short films</NavLink>
                            <NavLink to='/films/full-length_films'>Full-length films</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/films/DC'>DC</NavLink>
                            <NavLink to='/films/disney'>Disney</NavLink>
                            <NavLink to='/films/netflix'>Netflix</NavLink>
                            <NavLink to='/films/sony'>Sony</NavLink>
                            <NavLink to='/films/warner_bros'>Warner Bros</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilmMenu;