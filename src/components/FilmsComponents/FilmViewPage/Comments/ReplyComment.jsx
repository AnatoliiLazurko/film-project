import React, { useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile,  } from '@fortawesome/free-regular-svg-icons';

const ReplyComment = () => {

    const [replyComment, setReplyComment] = useState();

    const handleChange = (event) => {
        setReplyComment(event.target.value);
    };

    return (
        <div className={styles["reply-comment"]}>
            <div className={styles["commnet-avatar"]}>
                <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
            </div>
            <div className={styles["commnet-form"]}>
                <p className={styles["username"]}>Username</p>
                <div className={styles["input-section"]}>
                    <input
                        type="text"
                        value={replyComment}
                        onChange={handleChange}
                        placeholder="Enter message..."
                        className={styles["input-message"]}
                    />
                    <div className={styles["under-input-section"]}>
                        <FontAwesomeIcon icon={faFaceSmile} />
                        <div>
                            <button className={styles["btn-cancel"]} onClick={() => {setReplyComment('')}}>Cancel</button>
                            <button className={styles["btn-send"]}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyComment;
