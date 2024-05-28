import React, { useState } from 'react';
import styles from './PasswordStyles.module.css';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import EmailVerification from '../../../Technicall/Email/EmailVerification';
import RequestError from '../../../Technicall/Error/RequestError';

const PasswordSettings = () => {

    const { user } = useAuth();
    const [isEmailSent, setEmailSent] = useState(false);
    const [error, setError] = useState();

    const sendVerification = async () => {
        try {
            await axios.post('https://localhost:7176/api/Users/sendemailchangepassword', { email: user.email }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setEmailSent(true);
        } catch (error) {
            setError(error.response.data);
            setTimeout(() => {
                setError(null);
            }, 6000);
        }
    }

    return (
        <>
            <div>     
                <h1 className={styles["edit-title"]}>Edit password</h1>

                <p className={styles["text"]}>
                    To change your password, we will send you a link via email. <br /> 
                    Please check your inbox and follow the instructions in the email to reset your password. <br />
                    If you do not receive the email within a few minutes, please check your spam folder.
                </p>

                <div className={styles["send-btn"]} onClick={sendVerification}>Send verification</div>
            </div>

            {error && <RequestError errorMessage={error} />}
            {isEmailSent && <EmailVerification closeModal={setEmailSent} />}
        </>
    );
}

export default PasswordSettings;
