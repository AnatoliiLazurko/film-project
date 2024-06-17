import React from 'react';
import styles from './DonateStyles.module.css';

const DonateCard = ({ fundraising }) => {

    const handleDonateClick = (url) => {
        window.open(`${url}`, '_blank');
    };

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <>
            {fundraising.map((item, index) => (
                <div className={styles["donate-card"]} key={index}>

                    <img src={item.image ? `data:image/jpeg;base64,${item.image}` : ''} alt="Donation Poster" />
                    
                    <p className={styles["donate-title"]}>{item.name}</p>
                    <p className={styles["donate-status"]}>Collection started</p>
                    <p className={styles["donate-description"]}>
                        {truncateDescription(item.description, 150)}
                    </p>

                    <div className={styles["donate-btn"]} onClick={() => handleDonateClick(item.fundraisingUrl)}>Donate</div>

                </div>
            ))}
        </>
    );
}

export default DonateCard;
