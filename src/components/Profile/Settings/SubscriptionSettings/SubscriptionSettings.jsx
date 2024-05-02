import React, { useState } from 'react';
import styles from './SubscriptionStyles.module.css';
import sub_icon from '../../../../images/subscription/subscription_icon.png'

const SubscriptionSettings = () => {

    const [isSubscription, setSubscription] = useState(true);

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
                            <p className={styles["expiration"]}>Days left 28</p>
                        </div>
                    </div>
                    <div className={styles["cancel-btn"]} onClick={() => setSubscription(false)}>Cancel subscription</div>
                </div>
            }
            
            {!isSubscription && 
                <div className={styles["none-subscription"]}>
                    <img src={sub_icon} alt="None Subscription" />
                    <p>You don’t have a subscription</p>
                </div>
            }

        </div>
    );
}

export default SubscriptionSettings;
