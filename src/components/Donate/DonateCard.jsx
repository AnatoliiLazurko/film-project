import React from 'react';
import styles from './DonateStyles.module.css';

const DonateCard = ({ fundraising }) => {

    const handleDonateClick = (url) => {
        window.open(`${url}`, '_blank');
    };

    return (
        <>
            {fundraising.map((item, index) => (
                <div className={styles["donate-card"]} key={index}>

                    <img src={item.image ? `data:image/jpeg;base64,${item.image}` : ''} alt="Donation Poster" />
                    
                    <p className={styles["donate-title"]}>{item.name}</p>
                    <p className={styles["donate-status"]}>Collection started</p>
                    <p className={styles["donate-description"]}>
                        {item.description}
                    </p>

                    <div className={styles["donate-btn"]} onClick={() => handleDonateClick(item.fundraisingUrl)}>Donate</div>

                </div>
            ))}
        </>
    );
}

export default DonateCard;
