import React, { useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartCrack, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import noneUserAvatar from '../../../../images/profile/user_avatar.jpg';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import AuthPrompt from '../../../Technicall/Auth/AuthPrompt';
import { ANIME_ENDPOINTS } from '../../../../constants/animeEndpoints';

const Subcomment = ({ commentId, comments, update, setUpdate }) => {

    const { isAuth } = useAuth();

    const [isAuthPrompt, setIsAuthPrompt] = useState(false);
    
    const subComments = comments.filter(comment => comment.parentCommentId === commentId);

    //LIKE AND DISLIKE

    const toLike = async (commentId) => {  
        if (isAuth) {
            try {
                await axios.post(`${ANIME_ENDPOINTS.commentLike}?commentId=${commentId}`, null, {
                    withCredentials: true
                });

                setUpdate(!update);
            } catch (error) {
                console.error('Error liking comment:', error);
            }
        } else {
            setIsAuthPrompt(true);
        }
    };

    const toDisLike = async (commentId) => {
        if (isAuth) {
            try {
                await axios.post(`${ANIME_ENDPOINTS.commentDislike}?commentId=${commentId}`, null, {
                    withCredentials: true
                });

                setUpdate(!update);
            } catch (error) {
                console.error('Error disliking comment:', error);
            }
        } else {
            setIsAuthPrompt(true);
        }
    };

    // TIME

    const getTimeDifference = (timestamp) => {
        const commentTimestamp = new Date(timestamp);
        const currentTimestamp = new Date();
        const difference = currentTimestamp - commentTimestamp;

        if (difference < (1000 * 60)) {
            const secondsDifference = Math.floor(difference / 1000);
            return `${secondsDifference} seconds ago`;
        } else if (difference < (1000 * 60 * 60)) {
            const minutesDifference = Math.floor(difference / (1000 * 60));
            return `${minutesDifference} minutes ago`;
        } else if (difference < (1000 * 60 * 60 * 24)) {
            const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
            return `${hoursDifference} hours ago`;
        } else {
            const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
            return `${daysDifference} days ago`;
        }
    }

    return (
        <>
            {subComments.map((subComment, index) => (
                <div className={styles["subcomment"]} key={index}>
                    <div className={styles["commnet-avatar"]}>
                        {subComment.user.avatar && <img src={`data:image/jpeg;base64,${subComment.user.avatar}`} alt="User Avatar" />}
                        {!subComment.user.avatar && <img src={noneUserAvatar} alt="User Avatar" />}
                    </div>
                    <div className={styles["comment-content"]}>
                        <div className={styles["top-section"]}>
                            <p className={styles["username"]}>{subComment.user.userName} <span>{getTimeDifference(subComment.date)}</span></p>
                            {/* <FontAwesomeIcon icon={faEllipsis} /> */}
                        </div>
                        <div className={styles["comment"]}>                     
                            {subComment.text}
                        </div>
                        <div className={styles["under-comment-section"]}>
                            <div className={styles["left-section"]}>
                                <p className={styles["like"]}>
                                    {subComment.isLiked && <FontAwesomeIcon icon={solidHeart} onClick={() => toLike(subComment.id)} />}
                                    {!subComment.isLiked && <FontAwesomeIcon icon={regularHeart} onClick={() => toLike(subComment.id)} />}
                                    {subComment.countLikes}
                                </p>
                                <p className={styles["dislike"]}>
                                    {subComment.isDisliked && <FontAwesomeIcon icon={faHeartCrack} onClick={() => toDisLike(subComment.id)} />}
                                    {!subComment.isDisliked && <FontAwesomeIcon icon={regularHeart} onClick={() => toDisLike(subComment.id)} />}
                                    {subComment.countDislikes}
                                </p>
                            </div> 
                        </div>

                    </div>
                </div>
            ))}

            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default Subcomment;
