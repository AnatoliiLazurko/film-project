import React, { useEffect, useState } from 'react';
import styles from './EmailConfirmStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../../constants/userEndpoints';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailConfirm = () => {

    const nav = useNavigate();
    const [error, setError] = useState();

    const query = useQuery();
    const token = query.get('token');

    useEffect(() => {
        if (token) {   
            const fetchEmailConfirm = async () => {
                try {
                    await axios.post(`${USER_ENDPOINTS.emailConfirm}?token=${token}`);

                    setError();
                } catch (error) {
                    //console.error('Error email confirming: ', error);
                    setError(error.response.data);
                }
            };

            fetchEmailConfirm();
        }
    }, [token]);

    return (
        <>
            {!error && 
                <div className={styles["alert"]}>
                    <h1>Your mail has been confirmed! <FontAwesomeIcon icon={faCheck} /></h1>
                    <p className={styles["text"]}>You can return to the main page</p>
                    <div className={styles["btn-okay"]} onClick={() => { nav('/'); }}>Okay</div>
                </div>
            }
            {error &&
                <div className={styles["alert-error"]}>
                    <h1>E-mail verification error!</h1>
                    <p className={styles["text-error"]}>{error}</p>
                    <div className={styles["btn-okay"]} onClick={() => { nav('/'); }}>Back to main</div>
                </div>
            }
        </>
    );
}

export default EmailConfirm;
