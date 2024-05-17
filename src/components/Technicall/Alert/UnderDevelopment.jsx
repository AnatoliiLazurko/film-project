import React from 'react';
import styles from './UnderDevStyles.module.css';

const UnderDevelopment = () => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>Under development...</h1>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default UnderDevelopment;
