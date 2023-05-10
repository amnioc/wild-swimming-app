import { FC, useState } from "react";
import styles from "./comment-card.module.css";
import { patchCommentVotes } from "../../feature/comments/utils/comments-utils";

interface commentProps {
  avatar: string;
  name: string;
  created_at: string;
  body: string;
  votes: number;
}

const CommentCard: FC<commentProps> = ({ comment, user }) => {
  const [thisComment, setThisComment] = useState(comment);
  const [commentVotes, setCommentVotes] = useState(`${comment.votes}`);
  const commentDate = new Date(comment.created_at).toString().split("G")[0];
  const [err, setErr] = useState(null);

  const handleVoteClick = (event) => {
    setThisComment((comment) => {
      setErr(null);
      event.currentTarget.disabled = true;
      return { ...comment, votes: comment.votes + 1 };
    });

    patchCommentVotes(comment._id)
      .then((votes) => {
        setCommentVotes(votes);
      })
      .catch((err) => {
        setErr("Oops! Something went wrong, please try again later.");
        setThisComment((comment) => {
          return { ...comment, votes: comment.votes - 1 };
        });
      });
  };

  return (
    <article className={styles.comment}>
      <img
        className={styles.avatar}
        src={comment.avatar_url}
        alt={`avatar for ${comment.name}`}
      />
      <section className={styles.commentDetails}>
        <span className={styles.dateVotes}>
          {commentDate} . {comment.votes} votes
        </span>
        <span className={styles.userSays}>{comment.name} says:</span>
        <span className={styles.commentBody}>{comment.body}</span>
      </section>
      <section className={styles.commentVotes}>
        Like this comment?{" "}
        <button
          aria-label="like comment"
          className={styles.likeButton}
          onClick={handleVoteClick}
        >
          {" "}
          👍
        </button>
      </section>
    </article>
  );
};

export default CommentCard;
