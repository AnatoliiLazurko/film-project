import React from 'react';
import styles from './AuthPromptStyles.module.css';

const AuthPrompt = ({ closeAlert }) => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>You are not authorized!</h1>
                <p className={styles["text"]}>
                    In order to use this functionality, you need to sign in
                </p>
                <div className={styles["btn-okay"]} onClick={() => {closeAlert(false)}} >Okay</div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default AuthPrompt;
