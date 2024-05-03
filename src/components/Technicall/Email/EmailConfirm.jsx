import React from 'react';
import styles from './EmailConfirmStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

const EmailConfirm = () => {
    return (
        <>
            <div className={styles["alert"]}>
                <h1>Your mail has been confirmed! <FontAwesomeIcon icon={faCheck} /></h1>
                <p className={styles["text"]}>You can return to the main page</p>
                <div className={styles["btn-okay"]}>Okay</div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default EmailConfirm;
