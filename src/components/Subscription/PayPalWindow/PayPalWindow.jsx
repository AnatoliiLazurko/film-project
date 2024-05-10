import React from 'react';
import styles from './PayPalStyles.module.css';
import { PayPalScriptProvider, PayPalButtons, } from '@paypal/react-paypal-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const PayPalWindow = ({ closeWindow}) => {

    return (
        <>
            <div className={styles["alert"]}>

                <FontAwesomeIcon icon={faXmark} className={styles["close-mark"]} onClick={() => {closeWindow(false)}}/>

                <h1>Choose payment</h1>

                <PayPalScriptProvider
                    options={{
                        clientId: "AeqVdBK1q_pZAnCOvDIWMRAewzjqhX6vhdLp1m2RYa6W9oG4SbY8vHuihX64cV1muy4hm8AVzYzsQSz5",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                    }}
                >         
                    <PayPalButtons
                        createSubscription={(data, actions) => {
                            return actions.subscription.create({
                            plan_id: 'P-8CV30739AW495690XMYBOEEY',
                            });
                        }}
                        onApprove={(data, actions) => {
                            console.log('Subscription approved:', data.subscriptionID);
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
