import React, { useState } from 'react';
import styles from './CommentsStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartCrack, faEllipsis, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ReplyComment from './ReplyComment';

const Subcomment = () => {

    const [isLiked, setLiked] = useState(false);
    const [isDisLiked, setDisLiked] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [disLikeCount, setDisLikeCount] = useState(0);

    const [isReply, setReply] = useState(false);

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

    const replyComment = () => {
        setReply(!isReply);
    }

    return (
        <>
            <div className={styles["subcomment"]}>
                <div className={styles["commnet-avatar"]}>
                    <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
                </div>
                <div className={styles["comment-content"]}>
                    <div className={styles["top-section"]}>
                        <p className={styles["username"]}>Username <span>2 hours ago</span></p>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                    <div className={styles["comment"]}>                     
                        Lorem ipsum dolor sit amet consectetur. Euismod nulla viverra a sapien a adipiscing ut eget.
                        At in orci nulla suspendisse sem vestibulum vitae imperdiet diam. Varius ultricies
                        commodo netus vel pellentesque morbi. Mauris id pretium vitae magnis varius rhoncus
                        morbi ullamcorper. Lorem aliquam duis sed turpis laoreet odio. Lobortis proin integer
                        eget fermentum lorem amet. In sed non tortor eget dui quis dictum elementum phasellus. Commodo
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
                                <FontAwesomeIcon icon={faCommentDots} />
                                0
                            </p>
                        </div>
                        <button className={styles["btn-comment"]} onClick={replyComment}>Comment</button>
                    </div>

                </div>
            </div>

            {isReply && <ReplyComment />}
        </>
    );
}

export default Subcomment;
