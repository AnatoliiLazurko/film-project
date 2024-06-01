import React, { useEffect, useState } from 'react';
import styles from './SubscriptionStyles.module.css';
import sub_icon from '../../../../images/subscription/subscription_icon.png';
import box from '../../../../images/subscription/box.png';
import axios from 'axios';
import Subscription from '../../../Subscription/Subscription';
import PayPalWindow from '../../../Subscription/PayPalWindow/PayPalWindow';
import { TRANSACTION_ENDPOINTS } from '../../../../constants/transactionEndpoints';

const SubscriptionSettings = () => {

    const [isSubscription, setSubscription] = useState(false);
    const [isSubscriptionOpen, setSubscriptionOpen] = useState(false);
    const [isPayOpen, setPayOpen] = useState(false);
    const [subData, setSubData] = useState([]);
    const [daysLeft, setDaysLeft] = useState(0);
    
    useEffect(() => {
        
        const fetchGetSubscription = async () => {
            try {
                const response = await axios.get(TRANSACTION_ENDPOINTS.isSubscribe, { withCredentials: true });

                setSubData(response.data);

                setSubscription(true);

                const currentDate = new Date();
                let nearestEndDate = Infinity;

                response.data.forEach(subscription => {
                    const startDate = new Date(subscription.startDate);
                    const endDate = new Date(startDate.getTime() + (30 * 24 * 60 * 60 * 1000));

                    if (endDate < nearestEndDate) {
                        nearestEndDate = endDate;
                    }
                });

                const diffInTime = nearestEndDate.getTime() - currentDate.getTime();
                const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

                setDaysLeft(diffInDays);

            } catch (error) {
                console.log('Subscription error: ' + error);
                setSubscriptionOpen(true);
            }
        }
        
        fetchGetSubscription();
    }, []);

    const handlePayment = () => {
        setSubscriptionOpen(false);
        setPayOpen(true);
    }

    return (
        <div>
            
            <h1 className={styles["edit-title"]}>Subscription</h1>
            <p className={styles["current-txt"]}>Your current subscription...</p>

            {isSubscription &&
                <div className={styles["subscription-container"]}>
                    <div className={styles["left-content"]}>
                        <img src={sub_icon} alt="Subscription Icon" />
                        <div className={styles["subscription-info"]}>
                            <p className={styles["info-title"]}>Monthly subscription</p>
                            <p className={styles["privileges"]}>
                                <span>+</span> A month without ads while browsing <br />
                                <span>+</span> Movies, cartoons, series and anime in high quality
                            </p>
                            <p className={styles["expiration"]}>Days left {daysLeft}</p>
                        </div>
                    </div>
                    <div className={styles["cancel-btn"]} onClick={() => setSubscription(false)}>Cancel subscription</div>
                </div>
            }
            
            {!isSubscription && 
                <>
                    <div className={styles["none-subscription"]}>
                        <img src={box} alt="None Subscription" />
                        <p>You don’t have a subscription</p>
                    </div>
                
                    {isSubscriptionOpen &&
                        <Subscription close={setSubscriptionOpen} payWindow={handlePayment} />
                    }
                
                    {isPayOpen && 
                        <PayPalWindow closeWindow={setPayOpen} />
                    }
                </>

            }

        </div>
    );
}

export default SubscriptionSettings;
