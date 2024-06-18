import React, { useState } from 'react';
import styles from './EmailWarningStyles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../../constants/userEndpoints';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailWarning = () => {

    const nav = useNavigate();

    const query = useQuery();
    const token = query.get('token');

    const [error, setError] = useState();

    const sendToken = async () => {
        try {
            await axios.post(`${USER_ENDPOINTS.migrateUser}?token=${token}`);

            nav('/');
        } catch (error) {
            console.error('Error email changing: ', error);
            setError(error.response.data);
        }
    }

    return (
        <>
            {!error &&
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
                        <div className={styles["btn-cancel"]} onClick={() => { nav('/'); }}>Cancel</div>
                        <div className={styles["btn-continue"]} onClick={sendToken}>Continue</div>
                    </div>
                </div>
            }
            {error &&
                <div className={styles["alert-error"]}>
                    <h1>Email transfer error!</h1>
                    <p className={styles["text-error"]}>{error}</p>
                    <div className={styles["btn-okay"]} onClick={() => { nav('/'); }}>Back to main</div>
                </div>
            }
        </>
    );
}

export default EmailWarning;
