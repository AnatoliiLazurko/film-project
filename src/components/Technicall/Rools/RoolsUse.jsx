import React from 'react';
import styles from './RoolsStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from './CookiePolicy/CookiePolicy';
import TermsConditions from './TermsConditions/TermsConditions';

const RoolsUse = () => {

    const navigate = useNavigate();
    const { term } = useParams();

    const showPrivacyPolicy = () => {
        navigate('/rools/privacy-policy')
    }

    const showCookiePolicy = () => {
        navigate('/rools/cookie-policy')
    }

    const showTermsConditions = () => {
        navigate('/rools/terms-conditions')
    }

    return (
        <div className={styles["rools-page"]}>
            
            <div className={styles["nav-section"]}>
                <div onClick={showPrivacyPolicy} className={ term === 'privacy-policy' ? `${styles["active"]}` : '' }>Privacy Policy</div>
                <div onClick={showCookiePolicy} className={ term === 'cookie-policy' ? `${styles["active"]}` : '' }>Cookie Policy</div>
                <div onClick={showTermsConditions} className={ term === 'terms-conditions' ? `${styles["active"]}` : '' }>Terms&Conditions</div>
            </div>

            <div>
                {term === 'privacy-policy' && <PrivacyPolicy /> }
                
                {term === 'cookie-policy' && <CookiePolicy /> }

                {term === 'terms-conditions' && <TermsConditions /> }
            </div>

        </div>
    );
}

export default RoolsUse;
