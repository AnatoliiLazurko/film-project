import React, { useEffect, useState } from 'react';
import styles from './EmailChangeResultStyles.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_ENDPOINTS } from '../../../../constants/userEndpoints';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailChangeResult = () => {
    const nav = useNavigate();
    const [error, setError] = useState();

    const query = useQuery();
    const token = query.get('token');

    useEffect(() => {
        if (token) {   
            const fetchEmailConfirm = async () => {
                try {
                    await axios.put(`${USER_ENDPOINTS.changeEmail}?token=${token}`);
                } catch (error) {
                    console.error('Error email changing: ', error);
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
                    <h1>Your mail has been changed! <FontAwesomeIcon icon={faCheck} /></h1>
                    <p className={styles["text"]}>You can return to the main page</p>
                    <div className={styles["btn-okay"]} onClick={() => { nav('/'); }}>Okay</div>
                </div>
            }
            {error &&
                <div className={styles["alert-error"]}>
                    <h1>E-mail changing error!</h1>
                    <p className={styles["text-error"]}>{error}</p>
                    <div className={styles["btn-okay"]} onClick={() => { nav('/'); }}>Back to main</div>
                </div>
            }
        </>
    );
}

export default EmailChangeResult;
