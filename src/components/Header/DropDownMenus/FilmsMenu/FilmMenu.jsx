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
                            <NavLink to='/films/genre:action'>Action</NavLink>
                            <NavLink to='/films/genre:biographical'>Biographical</NavLink>
                            <NavLink to='/films/genre:crime'>Crime</NavLink>
                            <NavLink to='/films/genre:comedies'>Comedies</NavLink>
                            <NavLink to='/films/genre:dramas'>Dramas</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genre:detectives'>Detectives</NavLink>
                            <NavLink to='/films/genre:documentaries'>Documentaries</NavLink>
                            <NavLink to='/films/genre:family'>Family</NavLink>
                            <NavLink to='/films/genre:fantasy'>Fantasy</NavLink>
                            <NavLink to='/films/genre:historical'>Historical</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genre:melodrams'>Melodrams</NavLink>
                            <NavLink to='/films/genre:musicals'>Musicals</NavLink>
                            <NavLink to='/films/genre:thrillers'>Thrillers</NavLink>
                            <NavLink to='/films/genre:westerns'>Westerns</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genre:short_films'>Short films</NavLink>
                            <NavLink to='/films/genre:full-length_films'>Full-length films</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/films/popular-studio:DC'>DC</NavLink>
                            <NavLink to='/films/popular-studio:disney'>Disney</NavLink>
                            <NavLink to='/films/popular-studio:netflix'>Netflix</NavLink>
                            <NavLink to='/films/popular-studio:sony'>Sony</NavLink>
                            <NavLink to='/films/popular-studio:warner_bros'>Warner Bros</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilmMenu;