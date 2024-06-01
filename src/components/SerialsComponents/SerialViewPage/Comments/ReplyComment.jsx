import React, { useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, } from '@fortawesome/free-regular-svg-icons';
import noneUserAvatar from '../../../../images/profile/user_avatar.jpg';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import { SERIAL_ENDPOINTS } from '../../../../constants/serialEndpoints';

const ReplyComment = ({ serialId, commentId, setIsAuthPrompt, update, setUpdate }) => {

    const { isAuth, user } = useAuth();

    const [replyComment, setReplyComment] = useState();

    const emojis = ['😊', '😎', '😍', '😂',  '☹️', '😴', '🤮', '😡', '🤡', '👍', '👎'];
    const [openEmoji, setOpenEmoji] = useState(false);

    const handleChange = (event) => {
        setReplyComment(event.target.value);
    };

    const handleEmojiSelect = (emoji) => {
        setReplyComment(replyComment + emoji);
    };

    const handleSubmit = () => {
        if (isAuth) {
            if (replyComment.trim() !== '') {
                try {
                    axios.post(SERIAL_ENDPOINTS.createComment, {
                        serialId: serialId,
                        ParentCommentId: commentId,
                        Text: replyComment
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });

                    setReplyComment('');
                } catch (error) {
                    console.log("Add comment error: " + error)
                }
                setUpdate(!update);
            }
        } else {
            setIsAuthPrompt(true);
        }
    };

    return (
        <div className={styles["reply-comment"]}>
            <div className={styles["commnet-avatar"]}>
                {isAuth &&
                    <>
                        {user.avatar && <img src={`data:image/jpeg;base64,${user.avatar}`} alt="User Avatar" />}
                        {!user.avatar && <img src={noneUserAvatar} alt="User Avatar" />}
                    </>
                }
                {!isAuth && <img src={noneUserAvatar} alt="User Avatar" />}
            </div>
            <div className={styles["commnet-form"]}>
                <p className={styles["username"]}>{user ? user.userName : 'Username'}</p>
                <div className={styles["input-section"]}>
                    <input
                        type="text"
                        value={replyComment}
                        onChange={handleChange}
                        placeholder="Enter message..."
                        className={styles[`${replyComment ? 'inputed-message' : 'input-message'}`]}
                    />
                    <div className={styles["under-input-section"]}>
                        <div className={styles["emoji-block"]}>
                            <FontAwesomeIcon icon={faFaceSmile} onClick={() => {setOpenEmoji(!openEmoji)}}/>
                            {openEmoji &&
                                <div className={styles["emojis-container"]}>
                                    {emojis.map((emoji, index) => (
                                        <span key={index} style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => handleEmojiSelect(emoji)}>
                                            {emoji}
                                        </span>
                                    ))}
                                </div>
                            }
                        </div>
                        <div>
                            <button className={styles["btn-cancel"]} onClick={() => {setReplyComment('')}}>Cancel</button>
                            <button className={styles["btn-send"]} onClick={handleSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyComment;
