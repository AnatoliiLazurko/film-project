import React, { useState } from 'react';
import styles from './ProfileStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear} from '@fortawesome/free-solid-svg-icons';
import BrowsingHistory from './BrowsingHistory/BrowsingHistory';
import Bookmarks from './Bookmarks/Bookmarks';
import { NavLink } from 'react-router-dom';
import noneUserAvatar from '../../images/profile/user_avatar.jpg'
import useAuth from '../../hooks/useAuth';

const Profile = () => {

    const { user } = useAuth();

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
                {user.avatar && <img src={`data:image/jpeg;base64,${user.avatar}`} alt="User Avatar" />}
                {!user.avatar && <img src={noneUserAvatar} alt="User Avatar" />}
                <div className={styles["profile-info"]}>
                    <div className={styles["top-content"]}>
                        <p>{user.userName}</p>
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
