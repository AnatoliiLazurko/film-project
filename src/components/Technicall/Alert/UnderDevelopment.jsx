import React from 'react';
import styles from './UnderDevStyles.module.css';
import developing from '../../../images/status/developing.png'

const UnderDevelopment = ({ closeAlert }) => {

    return (
        <>
            <div className={styles["alert"]}>
                <h1>Sorry, this feature is under development</h1>
                <img src={developing} alt="Under development" />
                <div className={styles["btn-okay"]} onClick={() => {closeAlert(false)}} >Okay</div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default UnderDevelopment;
