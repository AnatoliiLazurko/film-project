import React, { useState } from 'react';
import styles from './ProfileStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear} from '@fortawesome/free-solid-svg-icons';
import BrowsingHistory from './BrowsingHistory/BrowsingHistory';
import Bookmarks from './Bookmarks/Bookmarks';
import { NavLink } from 'react-router-dom';

const Profile = () => {

    const [profileContent, setProfileContent] = useState('history');

    const handleBrowsingHistory = () => {
        setProfileContent('history');
    }
    const handleBookmarks = () => {
        setProfileContent('bookmarks');
    }

    return (
        <div className={styles["profile-page"]}>
            
            <div className={styles["user-container"]}>
                <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
                <div className={styles["profile-info"]}>
                    <div className={styles["top-content"]}>
                        <p>Username</p>
                        <NavLink to={'/settings/profile'}><FontAwesomeIcon icon={faGear} /></NavLink>
                    </div>
                    <div className={styles["bottom-content"]}>
                        <p>Viewed: 26</p>
                        <p>Bookmarked: 32</p>
                        <p>Comments left: 146</p>
                    </div>
                </div>
            </div>
            
            <div className={styles["btns-conatiner"]}>
                <div className={`${profileContent === 'history' ? styles["active"] : ''}`} onClick={handleBrowsingHistory}>Browsing history</div>
                <div className={`${profileContent === 'bookmarks' ? styles["active"] : ''}`} onClick={handleBookmarks}>Bookmarks</div>
            </div>

            {profileContent === 'history' && <BrowsingHistory />}
            {profileContent === 'bookmarks' && <Bookmarks />}

        </div>
    );
}

export default Profile;
