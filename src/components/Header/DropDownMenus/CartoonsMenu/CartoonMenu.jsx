import React from 'react';
import styles from './CartoonMenuStyles.module.css';
import { NavLink } from 'react-router-dom';

const CartoonMenu = () => {
    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Categories</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/animated_series'>Animated series</NavLink>
                            <NavLink to='/cartoons/full-length_movies'>Full-length movies</NavLink>
                            <NavLink to='/cartoons/short'>Short movies</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Animation</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/3D'>3D</NavLink>
                            <NavLink to='/cartoons/2D'>2D</NavLink>
                            <NavLink to='/cartoons/clay'>Clay animation</NavLink>
                            <NavLink to='/cartoons/stop-motion'>Stop-motion animation</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["section-colums"]}>
                        <div>
                            <NavLink to='/cartoons/DC'>DC</NavLink>
                            <NavLink to='/cartoons/disney'>Disney</NavLink>
                            <NavLink to='/cartoons/dream_works'>Dream Works</NavLink>
                            <NavLink to='/cartoons/netflix'>Netflix</NavLink>
                            <NavLink to='/cartoons/sony'>Sony</NavLink>
                        </div>
                        <div>
                            <NavLink to='/cartoons/pixar'>Pixar</NavLink>
                            <NavLink to='/cartoons/warner_bros'>Warner Bros</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartoonMenu;
