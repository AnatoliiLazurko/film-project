import React from 'react';
import styles from './EmailWarningStyles.module.css';

const EmailWarning = () => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>Warning!</h1>
                <p className={styles["description"]}>
                    An account with this e-mail address already exists in the system.
                    Do you want to transfer your account to Google?
                </p>
                <p className={styles["text"]}>
                    (This action will delete your password that you specified when registering on the site.)
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

export default EmailWarning;
