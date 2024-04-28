import React from 'react';
import styles from './ProfilePageStyles.module.css';
import ProfileSettings from './Settings/ProfileSettings/ProfileSettings';

const ProfilePage = () => {
    return (
        <div className={styles["profile-page"]}>
            
            <div className={styles["profile-container"]}>
                <div className={styles["settings-field"]}>
                    <p className={styles["settings-txt"]}>Settings</p>
                    <div className={styles["settings-options"]}>
                        <p className={styles["active-option"]}>Profile</p>
                        <p>Password</p>
                        <p>E-mail</p>
                        <p>Comments</p>
                        <p>Subscription</p>
                    </div>
                </div>
                <div className={styles["content-field"]}>
                    <ProfileSettings />
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;
