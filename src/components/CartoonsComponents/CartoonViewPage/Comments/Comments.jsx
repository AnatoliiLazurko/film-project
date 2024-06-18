import React, { useEffect, useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartCrack, faShuffle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faFaceSmile, faCommentDots as faEmptyCommentDots } from '@fortawesome/free-regular-svg-icons';
import Subcomment from './Subcomment';
import ReplyComment from './ReplyComment';
import useAuth from '../../../../hooks/useAuth';
import noneUserAvatar from '../../../../images/profile/user_avatar.jpg';
import AuthPrompt from '../../../Technicall/Auth/AuthPrompt';
import axios from 'axios';
import Spinner from '../../../Technicall/Spinner/Spinner';
import { USER_ENDPOINTS } from '../../../../constants/userEndpoints';
import { CARTOON_ENDPOINTS } from '../../../../constants/cartoonEndpoints';

const Comments = ({ cartoonDetails, partId }) => {

    const { isAuth, user } = useAuth();
    const [isAuthPrompt, setIsAuthPrompt] = useState(false);

    const emojis = ['😊', '😎', '😍', '😂',  '☹️', '😴', '🤮', '😡', '🤡', '👍', '👎'];
    const [openEmoji, setOpenEmoji] = useState(false);

    const [isSortDropdown, setSortDropDown] = useState(false);

    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [replyStates, setReplyStates] = useState([]);
    const [showReplayedStates, setShowReplayedStates] = useState([]);

    const [update, setUpdate] = useState(true);

    const [sortDirection, setSortDirection] = useState('newToOld');

    const [visibleComments, setVisibleComments] = useState(5);

    const loadMore = () => {
        setVisibleComments(prevCount => prevCount + 5);
    };

    const handleEmojiSelect = (emoji) => {
        setComment(comment + emoji);
    };

    useEffect(() => {
        
        const fetchGetComments = async () => {
            try {
                const response = await axios.get(`${CARTOON_ENDPOINTS.getComments}?cartoonId=${cartoonDetails.id}&cartoonPartId=${partId}`, {
                    withCredentials: true
                });

                const comments = response.data;

                const userIds = comments.map(comment => comment.userId);

                const usersResponse = await axios.post(USER_ENDPOINTS.getUsersByIds,  userIds);
                const usersData = usersResponse.data;

                const usersMap = {};
                usersData.forEach(user => {
                    usersMap[user.id] = user;
                });

                const commentsWithUserData = comments.map(comment => ({
                    ...comment,
                    user: usersMap[comment.userId]
                }));
                setCommentsList(commentsWithUserData);

            } catch (error) {
                //console.log(error);
                setCommentsList([]);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchGetComments();
    }, [cartoonDetails.id, update, partId]);

    
    //LIKE AND DISLIKE

    const toLike = async (commentId) => {  
        if (isAuth) {
            try {
                await axios.post(`${CARTOON_ENDPOINTS.commentLike}?commentId=${commentId}`, null, {
                    withCredentials: true
                });
            } catch (error) {
                console.error('Error liking comment:', error);
            }
            setUpdate(!update);
        } else {
            setIsAuthPrompt(true);
        }
    };

    const toDisLike = async (commentId) => {
        if (isAuth) {
            try {
                await axios.post(`${CARTOON_ENDPOINTS.commentDislike}?commentId=${commentId}`, null, {
                    withCredentials: true
                });
            } catch (error) {
                console.error('Error disliking comment:', error);
            }
            setUpdate(!update);
        } else {
            setIsAuthPrompt(true);
        }
    };

    //COMMENT

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        if (isAuth) {
            if (comment.trim() !== '') {
                try {
                    await axios.post(CARTOON_ENDPOINTS.createComment, {
                        CartoonId: cartoonDetails.id,
                        CartoonPartId: partId === 0 ? null : partId,
                        ParentCommentId: null,
                        Text: comment
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });

                    setComment('');
                    setUpdate(!update);
                } catch (error) {
                    console.log("Add comment error: " + error)
                }
            }
        } else {
            setIsAuthPrompt(true);
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

    // SORT

    const handleSortChange = (direction) => {
        setSortDirection(direction);
        setSortDropDown(false)
    };

    const sortByOldToNew = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    };

    const sortByNewToOld = (a, b) => {
        return new Date(b.date) - new Date(a.date);
    };

    const sortByLikes = (a, b) => {
        return b.countLikes - a.countLikes;
    };

    const handleSortByLikes = () => {
        setSortDirection('likes');
        setSortDropDown(false);
    };

    const sortFunction = sortDirection === 'oldToNew' ? sortByOldToNew :
        sortDirection === 'newToOld' ? sortByNewToOld :
        sortByLikes;

    //console.log(commentsList);
    
    return (
        <>
            <div className={styles["comments-section"]}>
                <div className={styles["top-panel"]}>
                    <p>{commentsList.length} Comments</p>
                    <div className={styles["sort-block"]}>
                        <p className={styles["sort-comments"]} onClick={() => setSortDropDown(!isSortDropdown)}>Sort by <FontAwesomeIcon icon={faShuffle} /></p>
                        {isSortDropdown && 
                            <div className={styles["sort-dropdown"]}>
                                <p onClick={handleSortByLikes}>By popularity</p>
                                <p onClick={() => handleSortChange('oldToNew')}>From old to new</p>
                                <p onClick={() => handleSortChange('newToOld')}>From new to old</p>
                            </div>
                        }
                    </div>
                </div>

                <div className={styles["leave-comment"]}>
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
                                value={comment}
                                onChange={handleChange}
                                placeholder="Enter message..."
                                className={styles[`${comment ? 'inputed-message' : 'input-message'}`]}
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

                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className={styles["list-of-comments"]}>
                                                        
                            {commentsList.filter(comment => !comment.parentCommentId).sort(sortFunction).slice(0, visibleComments).map((comment, index) => (
                                <div className={styles["comment-block"]} key={index}>
                                    <div className={styles["commnet-avatar"]}>
                                        {comment.user.avatar && <img src={`data:image/jpeg;base64,${comment.user.avatar}`} alt="User Avatar" />}
                                        {!comment.user.avatar && <img src={noneUserAvatar} alt="User Avatar" />}
                                    </div>
                                    <div className={styles["comment-content"]}>
                                        <div className={styles["top-section"]}>
                                            <p className={styles["username"]}>{comment.user.userName} <span>{getTimeDifference(comment.date)}</span></p>
                                            {/* <FontAwesomeIcon icon={faEllipsis} /> */}
                                        </div>
                                        <div className={styles["comment"]}>
                                            {comment.text}
                                        </div>
                                        <div className={styles["under-comment-section"]}>
                                            <div className={styles["left-section"]}>
                                                <p className={styles["like"]}>
                                                    {comment.isLiked && <FontAwesomeIcon icon={solidHeart} onClick={() => toLike(comment.id)} />}
                                                    {!comment.isLiked && <FontAwesomeIcon icon={regularHeart} onClick={() => toLike(comment.id)} />}
                                                    {comment.countLikes}
                                                </p>
                                                <p className={styles["dislike"]}>
                                                    {comment.isDisliked && <FontAwesomeIcon icon={faHeartCrack} onClick={() => toDisLike(comment.id)} />}
                                                    {!comment.isDisliked && <FontAwesomeIcon icon={regularHeart} onClick={() => toDisLike(comment.id)} />}
                                                    {comment.countDislikes}
                                                </p>
                                                <p className={styles["see-comments"]}>
                                                    {comment.countReplies > 0 && <FontAwesomeIcon icon={faCommentDots} onClick={() => showReplayedComments(comment.id)} />}
                                                    {comment.countReplies === 0 && <FontAwesomeIcon icon={faEmptyCommentDots} onClick={() => showReplayedComments(comment.id)} />}
                                                    {comment.countReplies}
                                                </p>
                                            </div>
                                            <button className={styles["btn-comment"]} onClick={() => replyComment(comment.id)}>Comment</button>
                                        </div>

                                        {replyStates[comment.id] &&
                                            <ReplyComment
                                                cartoonId={cartoonDetails.id}
                                                commentId={comment.id}
                                                partId={partId}
                                                setIsAuthPrompt={setIsAuthPrompt}
                                                update={update}
                                                setUpdate={setUpdate}
                                                setReplyStates={setReplyStates}
                                            />
                                        }
                                        
                                        {showReplayedStates[comment.id] &&
                                            <Subcomment
                                                commentId={comment.id}
                                                comments={commentsList}
                                                update={update}
                                                setUpdate={setUpdate}
                                            />
                                        }
                                        
                                    </div>      
                                </div>   
                            ))}
                        </div>

                        {commentsList.length > visibleComments && (
                            <div className={styles["view-more"]} onClick={loadMore}>View more</div>
                        )}
                    </>
                )}
                
            </div>
            {isAuthPrompt && <AuthPrompt closeAlert={setIsAuthPrompt} /> }
        </>
    );
}

export default Comments;