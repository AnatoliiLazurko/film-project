import React from 'react';
import styles from "./AnimeMenuStyles.module.css";
import { NavLink } from 'react-router-dom';

const AnimeMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Genres</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/anime/genre:action'>Action</NavLink>
                            <NavLink to='/anime/genre:biographical'>Adventure</NavLink>
                            <NavLink to='/anime/genre:crime'>Comedies</NavLink>
                            <NavLink to='/anime/genre:comedies'>Cyberpunk</NavLink>
                            <NavLink to='/anime/genre:dramas'>Dementia</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:detectives'>Detective</NavLink>
                            <NavLink to='/anime/genre:documentaries'>Dramas</NavLink>
                            <NavLink to='/anime/genre:family'>Dystopia</NavLink>
                            <NavLink to='/anime/genre:fantasy'>Ecchi</NavLink>
                            <NavLink to='/anime/genre:historical'>Everyday</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:melodrams'>Fairytale</NavLink>
                            <NavLink to='/anime/genre:musicals'>Fantasy</NavLink>
                            <NavLink to='/anime/genre:thrillers'>For childre</NavLink>
                            <NavLink to='/anime/genre:westerns'>Gothic</NavLink>
                            <NavLink to='/anime/genre:westerns'>History</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:short_films'>Horror</NavLink>
                            <NavLink to='/anime/genre:full-length_films'>Isekai</NavLink>
                            <NavLink to='/anime/genre:westerns'>Jyosei</NavLink>
                            <NavLink to='/anime/genre:westerns'>KodomoMaho-shojyo</NavLink>
                            <NavLink to='/anime/genre:westerns'>Martial Arts</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:short_films'>Mecha</NavLink>
                            <NavLink to='/anime/genre:full-length_films'>Musical</NavLink>
                            <NavLink to='/anime/genre:westerns'>Mystic</NavLink>
                            <NavLink to='/anime/genre:westerns'>Parody</NavLink>
                            <NavLink to='/anime/genre:westerns'>Post-apocalyptic</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:short_films'>Romance</NavLink>
                            <NavLink to='/anime/genre:full-length_films'>School</NavLink>
                            <NavLink to='/anime/genre:westerns'>Seinen</NavLink>
                            <NavLink to='/anime/genre:westerns'>Shogyo</NavLink>
                            <NavLink to='/anime/genre:westerns'>Shojyo-ai</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:short_films'>Shonen</NavLink>
                            <NavLink to='/anime/genre:full-length_films'>Shonen-ai</NavLink>
                            <NavLink to='/anime/genre:westerns'>Sports</NavLink>
                            <NavLink to='/anime/genre:westerns'>Supernatural</NavLink>
                            <NavLink to='/anime/genre:westerns'>Thriller</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:short_films'>War</NavLink>
                            <NavLink to='/anime/genre:full-length_films'>Zombie</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeMenu;
