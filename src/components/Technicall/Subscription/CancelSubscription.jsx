import React from 'react';
import styles from './CancelSubStyles.module.css';
import axios from 'axios';
import { TRANSACTION_ENDPOINTS } from '../../../constants/transactionEndpoints';

const CancelSubscription = ({ close }) => {

    const changeSubStatus = async () => {
        try {
            await axios.put(`${TRANSACTION_ENDPOINTS.changeStatus}?reason=I changed my mind`, {}, { withCredentials: true });

            close();
        } catch (error) {
            console.log("Subscription changing status error: " + error);
        }
    }

    return (
        <>
            <div className={styles["alert"]}>
                <h1>Are you sure you want to cancel your <br /> subscription?</h1>
                <p className={styles["description"]}>
                    Please note that when subscription is canceled you will notreceive your money back.
                </p>
                <div className={styles["btn-container"]}>
                    <div className={styles["btn-cancel"]} onClick={close}>Cancel</div>
                    <div className={styles["btn-continue"]} onClick={changeSubStatus}>Continue</div>
                </div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default CancelSubscription;
