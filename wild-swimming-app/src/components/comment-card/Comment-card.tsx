import { FC, useState } from "react";
import styles from "./comment-card.module.css";
import { patchCommentVotes } from "../../feature/comments/utils/comments-utils";
import DeleteButton from "../button/Delete-Button";
import { useAuth0 } from "@auth0/auth0-react";

interface commentProps {
  avatar_url: string;
  name: string;
  created_at: string;
  body: string;
  votes: number;
  locationComments: object[];
  setLocationComments: any;
}

const CommentCard: FC<commentProps> = ({
  comment,
  setLocationComments,
  locationComments,
}) => {
  const [addedVotes, setAddedVotes] = useState(0);
  const commentDate = new Date(comment.created_at).toString().split("G")[0];
  const [err, setErr] = useState(null);
  const [authorSignedIn, setauthorSignedIn] = useState(false);
  const { user } = useAuth0();

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
    <article className={styles.comment} key={comment._id}>
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
        {comment.user_id === "unknown" ? (
          <DeleteButton
            comment={comment}
            setLocationComments={setLocationComments}
            locationComments={locationComments}
          />
        ) : null}
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
