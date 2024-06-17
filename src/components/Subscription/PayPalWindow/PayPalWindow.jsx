import React from 'react';
import styles from './PayPalStyles.module.css';
import { PayPalScriptProvider, PayPalButtons, } from '@paypal/react-paypal-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { TRANSACTION_ENDPOINTS } from '../../../constants/transactionEndpoints';

const PayPalWindow = ({ closeWindow, setUpdate, update }) => {

    const clientId = "AYrY95Xxkr1UUigZ0tvccb1Uri57XfEdJlv1YxPtAquphFnIPtyHjwZYkiEQPL2SIVg5py8P70PWLFSP";
    const planId = 'P-222361577E286225NMZYDTCQ';

    const createSubscription = async (orderId, subscriptionId) => {
        try {

            await axios.post(TRANSACTION_ENDPOINTS.subscribe, {
                OrderId: orderId,
                SubscriptionId: subscriptionId
            }, {
                withCredentials: true
            });

            setUpdate(!update);
            closeWindow(false);
        } catch (error) {
            console.error('Error creating subscription:' + error);
        }
    };

    return (
        <>
            <div className={styles["alert"]}>

                <FontAwesomeIcon icon={faXmark} className={styles["close-mark"]} onClick={() => {closeWindow(false)}}/>

                <h1>Choose payment</h1>

                <PayPalScriptProvider
                    options={{
                        clientId: clientId,
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                    }}
                >         
                    <PayPalButtons
                        createSubscription={(data, actions) => {
                            return actions.subscription.create({
                            plan_id: planId,
                            });
                        }}
                        onApprove={(data, actions) => {
                            createSubscription(data.orderID, data.subscriptionID);
                        }}
                        style={{
                            label: "subscribe",
                        }}
                    />
                </PayPalScriptProvider>

            </div>
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default PayPalWindow;
