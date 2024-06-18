import React, { useEffect, useState } from 'react';
import styles from './CartoonMenuStyles.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CARTOON_ENDPOINTS } from '../../../../constants/cartoonEndpoints';

const CartoonMenu = () => {

    // CATEGORIES

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCaegories = async () => {
            try {
                const response = await axios.get(CARTOON_ENDPOINTS.getCategories);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCaegories();
    }, []);

    const rowsCategories = [];
  
    for (let i = 0; i < categories.length; i += 5) {
        rowsCategories.push(categories.slice(i, i + 5));
    }

    // ANIMATION

    const [animations, setAnimations] = useState([]);

    useEffect(() => {
        const fetchAnimations = async () => {
            try {
                const response = await axios.get(CARTOON_ENDPOINTS.getAnimations);
                setAnimations(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchAnimations();
    }, []);

    const rowsAnimations = [];
  
    for (let i = 0; i < animations.length; i += 5) {
        rowsAnimations.push(animations.slice(i, i + 5));
    }

    // STUDIOS

    const [studios, setStudios] = useState([]);

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await axios.get(CARTOON_ENDPOINTS.getStudios);
                setStudios(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchStudios();
    }, []);

    const rowsStudios = [];
  
    for (let i = 0; i < studios.length; i += 5) {
        rowsStudios.push(studios.slice(i, i + 5));
    }

    return (
        <>
            <div className={styles["flex-container"]}>
                <div>
                    <p className={styles["section-title"]}>Categories</p>
                    <div className={styles["columns-container"]}>
                        {rowsCategories.map((row, rowIndex) => (
                            <div className={styles["column"]} key={rowIndex}>
                            {row.map((category, index) => (
                                <div className={styles["row"]} key={index}>
                                    <NavLink to={`/cartoons/${category.name.toLowerCase().replace(/ /g, '_')}/animation=u/studio=u/date=u/popular=u/1`}>{category.name}</NavLink>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Animation</p>
                    <div className={styles["columns-container"]}>
                        {rowsAnimations.map((row, rowIndex) => (
                            <div className={styles["column"]} key={rowIndex}>
                            {row.map((animation, index) => (
                                <div className={styles["row"]} key={index}>
                                    <NavLink to={`/cartoons/category=u/${animation.name.toLowerCase().replace(/ /g, '_')}/studio=u/date=u/popular=u/1`}>{animation.name}</NavLink>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className={styles["section-title"]}>Popular studios</p>
                    <div className={styles["columns-container"]}>
                        {rowsStudios.map((row, rowIndex) => (
                            <div className={styles["column"]} key={rowIndex}>
                            {row.map((studio, index) => (
                                <div className={styles["row"]} key={index}>
                                    <NavLink to={`/cartoons/category=u/animation=u/${studio.name.toLowerCase().replace(/ /g, '_')}/date=u/popular=u/1`}>{studio.name}</NavLink>
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartoonMenu;
