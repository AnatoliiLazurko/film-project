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
                            <NavLink to='/anime/genre:adventure'>Adventure</NavLink>
                            <NavLink to='/anime/genre:comedies'>Comedies</NavLink>
                            <NavLink to='/anime/genre:cyberpunk'>Cyberpunk</NavLink>
                            <NavLink to='/anime/genre:dementia'>Dementia</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:detectives'>Detectives</NavLink>
                            <NavLink to='/anime/genre:dramas'>Dramas</NavLink>
                            <NavLink to='/anime/genre:dystopia'>Dystopia</NavLink>
                            <NavLink to='/anime/genre:ecchi'>Ecchi</NavLink>
                            <NavLink to='/anime/genre:everyday'>Everyday</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:fairytale'>Fairytale</NavLink>
                            <NavLink to='/anime/genre:fantasy'>Fantasy</NavLink>
                            <NavLink to='/anime/genre:for_children'>For childre</NavLink>
                            <NavLink to='/anime/genre:gothic'>Gothic</NavLink>
                            <NavLink to='/anime/genre:history'>History</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:horror'>Horror</NavLink>
                            <NavLink to='/anime/genre:isekai'>Isekai</NavLink>
                            <NavLink to='/anime/genre:jyosei'>Jyosei</NavLink>
                            <NavLink to='/anime/genre:kodomomaho-shojyo'>KodomoMaho-shojyo</NavLink>
                            <NavLink to='/anime/genre:martial_arts'>Martial Arts</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:mecha'>Mecha</NavLink>
                            <NavLink to='/anime/genre:musical'>Musical</NavLink>
                            <NavLink to='/anime/genre:mystic'>Mystic</NavLink>
                            <NavLink to='/anime/genre:parody'>Parody</NavLink>
                            <NavLink to='/anime/genre:post-apocalyptic'>Post-apocalyptic</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:romance'>Romance</NavLink>
                            <NavLink to='/anime/genre:school'>School</NavLink>
                            <NavLink to='/anime/genre:seinen'>Seinen</NavLink>
                            <NavLink to='/anime/genre:shogyo'>Shogyo</NavLink>
                            <NavLink to='/anime/genre:shojyo-ai'>Shojyo-ai</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:shonen'>Shonen</NavLink>
                            <NavLink to='/anime/genre:shonen-ai'>Shonen-ai</NavLink>
                            <NavLink to='/anime/genre:sports'>Sports</NavLink>
                            <NavLink to='/anime/genre:supernatural'>Supernatural</NavLink>
                            <NavLink to='/anime/genre:thriller'>Thriller</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/genre:war'>War</NavLink>
                            <NavLink to='/anime/genre:zombie'>Zombie</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeMenu;
