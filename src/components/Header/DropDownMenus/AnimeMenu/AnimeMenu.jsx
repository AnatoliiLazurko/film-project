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
                            <NavLink to='/anime/action'>Action</NavLink>
                            <NavLink to='/anime/adventure'>Adventure</NavLink>
                            <NavLink to='/anime/comedies'>Comedies</NavLink>
                            <NavLink to='/anime/cyberpunk'>Cyberpunk</NavLink>
                            <NavLink to='/anime/dementia'>Dementia</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/detectives'>Detectives</NavLink>
                            <NavLink to='/anime/dramas'>Dramas</NavLink>
                            <NavLink to='/anime/dystopia'>Dystopia</NavLink>
                            <NavLink to='/anime/ecchi'>Ecchi</NavLink>
                            <NavLink to='/anime/everyday'>Everyday</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/fairytale'>Fairytale</NavLink>
                            <NavLink to='/anime/fantasy'>Fantasy</NavLink>
                            <NavLink to='/anime/for_children'>For childre</NavLink>
                            <NavLink to='/anime/gothic'>Gothic</NavLink>
                            <NavLink to='/anime/history'>History</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/horror'>Horror</NavLink>
                            <NavLink to='/anime/isekai'>Isekai</NavLink>
                            <NavLink to='/anime/jyosei'>Jyosei</NavLink>
                            <NavLink to='/anime/kodomomaho-shojyo'>KodomoMaho-shojyo</NavLink>
                            <NavLink to='/anime/martial_arts'>Martial Arts</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/mecha'>Mecha</NavLink>
                            <NavLink to='/anime/musical'>Musical</NavLink>
                            <NavLink to='/anime/mystic'>Mystic</NavLink>
                            <NavLink to='/anime/parody'>Parody</NavLink>
                            <NavLink to='/anime/post-apocalyptic'>Post-apocalyptic</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/romance'>Romance</NavLink>
                            <NavLink to='/anime/school'>School</NavLink>
                            <NavLink to='/anime/seinen'>Seinen</NavLink>
                            <NavLink to='/anime/shogyo'>Shogyo</NavLink>
                            <NavLink to='/anime/shojyo-ai'>Shojyo-ai</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/shonen'>Shonen</NavLink>
                            <NavLink to='/anime/shonen-ai'>Shonen-ai</NavLink>
                            <NavLink to='/anime/sports'>Sports</NavLink>
                            <NavLink to='/anime/supernatural'>Supernatural</NavLink>
                            <NavLink to='/anime/thriller'>Thriller</NavLink>
                        </div>
                        <div>
                            <NavLink to='/anime/war'>War</NavLink>
                            <NavLink to='/anime/zombie'>Zombie</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeMenu;
