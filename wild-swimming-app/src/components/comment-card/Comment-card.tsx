import { FC, useState } from "react";
import styles from "./comment-card.module.css";
import { patchCommentVotes } from "../../feature/comments/utils/comments-utils";
import DeleteButton from "../button/Button";

interface commentProps {
  avatar: string;
  name: string;
  created_at: string;
  body: string;
  votes: number;
}

const CommentCard: FC<commentProps> = ({ comment, user }) => {
  const [addedVotes, setAddedVotes] = useState(0);
  const commentDate = new Date(comment.created_at).toString().split("G")[0];
  const [err, setErr] = useState(null);

  const handleVoteClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    event.currentTarget.disabled = true;

    patchCommentVotes(comment._id).catch((err) => {
      console.log(err);
      setErr("Oops! Something went wrong, please try again later.");
      setAddedVotes(0);
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
          {commentDate} . {comment.votes + addedVotes} votes
        </span>
        <span className={styles.userSays}>{comment.name} says:</span>
        <span className={styles.commentBody}>{comment.body}</span>
        {/* {comment.user_id === user.user_id ? <DeleteButton /> : null} */}
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
        {err ? <p>{err}</p> : null}
      </section>
    </article>
  );
};

export default CommentCard;
