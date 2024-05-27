import React from 'react';
import styles from './EmailChangeAlertStyles.module.css';

const EmailChangeAlert = ({closeModal}) => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>Your request has been sent!</h1>
                <p className={styles["text"]}>
                    Please check your email for a changing message.<br />
                    <span>(It can be in the spam folder)</span>
                </p>
                <div className={styles["btn-okay"]} onClick={() => { closeModal(false); }}>Okay</div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default EmailChangeAlert;
