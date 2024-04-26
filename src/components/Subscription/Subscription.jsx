import React from 'react';
import styles from './SubscriptionStyles.module.css';
import subscription from '../../images/subscription/subscription.png';
import subscriptionIcon from '../../images/subscription/subscription_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

const Subscription = ({ close }) => {
    return (
        <>
            <div className={styles["screen-dimming"]}></div>
            <div className={styles["subscription"]}>
                
                <FontAwesomeIcon icon={faXmark} className={styles["close-mark"]} onClick={() => {close(true)}}/>
                
                <img src={subscription} alt="" />
                <div className={styles["sub-content"]}>
                    <div className={styles["left-side"]}>
                        <div className={styles["sub-icon"]}>
                            <img src={subscriptionIcon} alt="" />
                        </div>
                        <div className={styles["sub-info"]}>
                            <div className={styles["star-line"]}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                                <p className={styles["sub-title"]}>Buy a monthly subscription!</p>

                                <div className={styles["sub-details"]}>
                                    <p>You will receive:</p>
                                    <p><span>+</span> A month without ads while browsing</p>
                                    <p><span>+</span> Movies, cartoons, series and anime in high quality</p>
                                </div>
                            </div>
                            <div className={styles["star-line"]}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                        <div className={styles["sub-price"]}>$5.99</div>
                    </div>
                    <div className={styles["right-side"]}>
                        <p>Buy!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subscription;
