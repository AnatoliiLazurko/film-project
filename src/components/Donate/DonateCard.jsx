import React from 'react';
import styles from './DonateStyles.module.css';

const DonateCard = () => {

    const handleDonateClick = () => {
        window.open('https://www.sandbox.paypal.com/donate/?campaign_id=4C2UB8ANVY8MG', '_blank');
    };

    return (
        <div className={styles["donate-card"]}>

            <img src="https://umoloda.kyiv.ua/img/content/i169/169773.jpg" alt="" />
            
            <p className={styles["donate-title"]}>Join Us in Making a Difference!</p>
            <p className={styles["donate-status"]}>Collection started</p>
            <p className={styles["donate-description"]}>
                Dear users, <br/>
                Every child deserves to feel loved, safe, and supported.
                Sadly, many children in our community are facing difficult challe...
            </p>

            <div className={styles["donate-btn"]} onClick={handleDonateClick}>Donate</div>

        </div>
    );
}

export default DonateCard;
