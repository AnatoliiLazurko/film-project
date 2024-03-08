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
                            <NavLink to='/films/genres:action'>Action</NavLink>
                            <NavLink to='/films/genres:biographical'>Biographical</NavLink>
                            <NavLink to='/films/genres:crime'>Crime</NavLink>
                            <NavLink to='/films/genres:comedies'>Comedies</NavLink>
                            <NavLink to='/films/genres:dramas'>Dramas</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genres:detectives'>Detectives</NavLink>
                            <NavLink to='/films/genres:documentaries'>Documentaries</NavLink>
                            <NavLink to='/films/genres:family'>Family</NavLink>
                            <NavLink to='/films/genres:fantasy'>Fantasy</NavLink>
                            <NavLink to='/films/genres:historical'>Historical</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genres:melodrams'>Melodrams</NavLink>
                            <NavLink to='/films/genres:musicals'>Musicals</NavLink>
                            <NavLink to='/films/genres:thrillers'>Thrillers</NavLink>
                            <NavLink to='/films/genres:westerns'>Westerns</NavLink>
                        </div>
                        <div>
                            <NavLink to='/films/genres:short_films'>Short films</NavLink>
                            <NavLink to='/films/genres:full-length_films'>Full-length films</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/films/popular-studios:DC'>DC</NavLink>
                            <NavLink to='/films/popular-studios:disney'>Disney</NavLink>
                            <NavLink to='/films/popular-studios:netflix'>Netflix</NavLink>
                            <NavLink to='/films/popular-studios:sony'>Sony</NavLink>
                            <NavLink to='/films/popular-studios:warner_bros'>Warner Bros</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilmMenu;