import React, { useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartCrack, faShuffle, faEllipsis, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faFaceSmile,  } from '@fortawesome/free-regular-svg-icons';
import Subcomment from './Subcomment';
import ReplyComment from './ReplyComment';

const Comments = () => {

    const emojis = ['😊', '😎', '😍', '😂',  '☹️', '😴', '🤮', '😡', '🤡', '👍', '👎'];
    const [openEmoji, setOpenEmoji] = useState(false);

    const [isSortDropdown, setSortDropDown] = useState(false);

    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    const [replyStates, setReplyStates] = useState([]);
    const [showReplayedStates, setShowReplayedStates] = useState([]);

    const [isLiked, setLiked] = useState(false);
    const [isDisLiked, setDisLiked] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [disLikeCount, setDisLikeCount] = useState(0);

    const [sortDirection, setSortDirection] = useState('newToOld');


    const handleEmojiSelect = (emoji) => {
        setComment(comment + emoji);
    };

    // TEMPORARY

    const toLike = () => {
        if (!isLiked) {
            setLiked(!isLiked);
            setDisLiked(false);
            setLikeCount(likeCount + 1);

            if (isDisLiked) {
                setDisLikeCount(disLikeCount - 1);
            }
        }
        
        if (isLiked) {
            setLiked(!isLiked);
            setLikeCount(likeCount - 1);
        }   
    };

    const toDisLike = () => {

        if (!isDisLiked) {
            setDisLiked(!isDisLiked);
            setLiked(false);
            setDisLikeCount(disLikeCount + 1);

            if (isLiked) {
                setLikeCount(likeCount - 1);
            }
        }

        if (isDisLiked) {
            setDisLiked(!isDisLiked);
            setDisLikeCount(disLikeCount - 1);
        } 
    };

    //COMMENT

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        if (comment.trim() !== '') {
            const newComment = {
                text: comment,
                timestamp: new Date()
            };
            setCommentsList([...commentsList, newComment]);
            setComment('');
        }
    };

    //REPLAY COMMENT

    const replyComment = (index) => {
        const newReplyStates = [...replyStates];
        newReplyStates[index] = !newReplyStates[index];
        setReplyStates(newReplyStates);
    }

    const showReplayedComments = (index) => {
        const newReplyStates = [...showReplayedStates];
        newReplyStates[index] = !newReplyStates[index];
        setShowReplayedStates(newReplyStates);
    }

    // TIME

    const getTimeDifference = (timestamp) => {
        const currentTimestamp = new Date();
        const difference = currentTimestamp - timestamp;

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

    // SORT

    const handleSortChange = (direction) => {
        setSortDirection(direction);
        setSortDropDown(false)
    };

    const sortByOldToNew = (a, b) => {
        return a.timestamp - b.timestamp;
    };

    const sortByNewToOld = (a, b) => {
        return b.timestamp - a.timestamp;
    };

    const sortFunction = sortDirection === 'oldToNew' ? sortByOldToNew : sortByNewToOld;

    return (
        <div className={styles["comments-section"]}>
            <div className={styles["top-panel"]}>
                <p>{commentsList.length} Comments</p>
                <div className={styles["sort-block"]}>
                    <p className={styles["sort-comments"]} onClick={() => setSortDropDown(!isSortDropdown)}>Sort by <FontAwesomeIcon icon={faShuffle} /></p>
                    {isSortDropdown && 
                        <div className={styles["sort-dropdown"]}>
                            <p>By popularity</p>
                            <p onClick={() => handleSortChange('oldToNew')}>From old to new</p>
                            <p onClick={() => handleSortChange('newToOld')}>From new to old</p>
                        </div>
                    }
                </div>
            </div>

            <div className={styles["leave-comment"]}>
                <div className={styles["commnet-avatar"]}>
                    <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
                </div>
                <div className={styles["commnet-form"]}>
                    <p className={styles["username"]}>Username</p>
                    <div className={styles["input-section"]}>
                        <input
                            type="text"
                            value={comment}
                            onChange={handleChange}
                            placeholder="Enter message..."
                            className={styles["input-message"]}
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
                                <button className={styles["btn-cancel"]} onClick={() => {setComment('')}}>Cancel</button>
                                <button className={styles["btn-send"]} onClick={handleSubmit}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["list-of-comments"]}>
                

                {commentsList.slice().sort(sortFunction).map((comment, index) => (
                    <div className={styles["comment-block"]} key={index}>
                        <div className={styles["commnet-avatar"]}>
                            <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
                        </div>
                        <div className={styles["comment-content"]}>
                            <div className={styles["top-section"]}>
                                <p className={styles["username"]}>Username <span>{getTimeDifference(comment.timestamp)}</span></p>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                            <div className={styles["comment"]}>
                                {comment.text}
                            </div>
                            <div className={styles["under-comment-section"]}>
                                <div className={styles["left-section"]}>
                                    <p className={styles["like"]}>
                                        {isLiked && <FontAwesomeIcon icon={solidHeart} onClick={toLike} />}
                                        {!isLiked && <FontAwesomeIcon icon={regularHeart} onClick={toLike} />}
                                        {likeCount}
                                    </p>
                                    <p className={styles["dislike"]}>
                                        {isDisLiked && <FontAwesomeIcon icon={faHeartCrack} onClick={toDisLike} />}
                                        {!isDisLiked && <FontAwesomeIcon icon={regularHeart} onClick={toDisLike} />}
                                        {disLikeCount}
                                    </p>
                                    <p className={styles["see-comments"]}>
                                        <FontAwesomeIcon icon={faCommentDots} onClick={() => showReplayedComments(index)}/>
                                        0
                                    </p>
                                </div>
                                <button className={styles["btn-comment"]} onClick={() => replyComment(index)}>Comment</button>
                            </div>

                            {replyStates[index] && <ReplyComment />}
                            
                            {showReplayedStates[index] && <Subcomment/> }

                        </div>      
                    </div>   
                ))}
            </div>

            <div className={styles["view-more"]}>View more</div>
        </div>
    );
}

export default Comments;
