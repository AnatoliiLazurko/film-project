import React from 'react';
import styles from './RequestErrorStyles.module.css';

const RequestError = ({ errorMessage }) => {
    return (
        <div className={styles["error-container"]}>
            {errorMessage}
        </div>
    );
}

export default RequestError;
