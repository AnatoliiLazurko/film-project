import React from 'react';
import styles from './CartoonMenu.module.css';
import { NavLink } from 'react-router-dom';

const CartoonMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Categories</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/category:animated_series'>Animated series</NavLink>
                            <NavLink to='/cartoons/category:full-length_movies'>Full-length movies</NavLink>
                            <NavLink to='/cartoons/category:short'>Short movies</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Animation</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/animation:3D'>3D</NavLink>
                            <NavLink to='/cartoons/animation:2D'>2D</NavLink>
                            <NavLink to='/cartoons/animation:clay'>Clay animation</NavLink>
                            <NavLink to='/cartoons/animation:stop-motion'>Stop-motion animation</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/popular-studio:DC'>DC</NavLink>
                            <NavLink to='/cartoons/popular-studio:disney'>Disney</NavLink>
                            <NavLink to='/cartoons/popular-studio:dream_works'>Dream Works</NavLink>
                            <NavLink to='/cartoons/popular-studio:netflix'>Netflix</NavLink>
                            <NavLink to='/cartoons/popular-studio:sony'>Sony</NavLink>
                        </div>
                        <div>
                            <NavLink to='/cartoons/popular-studio:pixar'>Pixar</NavLink>
                            <NavLink to='/cartoons/popular-studio:warner_bros'>Warner Bros</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartoonMenu;
