import React from 'react';
import styles from './CancelSubStyles.module.css';

const CancelSubscription = () => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>Are you sure you want to cancel your <br /> subscription?</h1>
                <p className={styles["description"]}>
                    Please note that when subscription is canceled you will notreceive your money back.
                </p>
                <div className={styles["btn-container"]}>
                    <div className={styles["btn-cancel"]}>Cancel</div>
                    <div className={styles["btn-continue"]}>Continue</div>
                </div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default CancelSubscription;
