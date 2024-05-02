import React from 'react';
import styles from './ProfilePageStyles.module.css';
import ProfileSettings from './Settings/ProfileSettings/ProfileSettings';
import { useNavigate, useParams } from 'react-router-dom';
import PasswordSettings from './Settings/PasswordSettings/PasswordSettings';
import EmailSettings from './Settings/EmailSettings/EmailSettings';
import SubscriptionSettings from './Settings/SubscriptionSettings/SubscriptionSettings';

const ProfilePage = () => {

    const navigate = useNavigate();
    const { option } = useParams();

    const showSettingsProfile = () => {
        navigate('/settings/profile');
    }

    const showSettingsPassowrd = () => {
        navigate('/settings/password');
    }

    const showSettingsEmail = () => {
        navigate('/settings/email');
    }

    const showSettingsSuscription = () => {
        navigate('/settings/subscription');
    }

    return (
        <div className={styles["profile-page"]}>
            
            <div className={styles["profile-container"]}>
                <div className={styles["settings-field"]}>
                    <p className={styles["settings-txt"]}>Settings</p>
                    <div className={styles["settings-options"]}>
                        <p onClick={showSettingsProfile} className={ option === 'profile' ? `${styles["active-option"]}` : '' }>Profile</p>
                        <p onClick={showSettingsPassowrd} className={ option === 'password' ? `${styles["active-option"]}` : '' }>Password</p>
                        <p onClick={showSettingsEmail} className={ option === 'email' ? `${styles["active-option"]}` : '' }>E-mail</p>
                        <p onClick={showSettingsSuscription} className={ option === 'subscription' ? `${styles["active-option"]}` : '' }>Subscription</p>
                    </div>
                </div>
                <div className={styles["content-field"]}>

                    {option === 'profile' && <ProfileSettings />}
                    {option === 'password' && <PasswordSettings />}
                    {option === 'email' && <EmailSettings />}
                    {option === 'subscription' && <SubscriptionSettings />}
                    
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;
