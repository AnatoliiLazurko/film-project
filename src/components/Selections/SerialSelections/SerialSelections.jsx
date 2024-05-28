import React from 'react';
import styles from '../SelectionsStyles.module.css'
import { NavLink } from 'react-router-dom';

const SerialSelections = ({ selections }) => {
    return (
        <>
            {selections.map((selection, index) => (
                <NavLink to={`/selection/serials/${selection.name.toLowerCase().replace(/ /g, '_')}/1`} className={styles["selection-card"]} key={index}>
                    <img src={selection.image ? `data:image/jpeg;base64,${selection.image}` : ''} alt="Selection Poster" />
                    <p className={styles["selection-name"]}>{selection.name}</p>
                </NavLink>
            ))}
        </>
    );
}

export default SerialSelections;
