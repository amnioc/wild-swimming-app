import { FC } from "react";
import styles from "./comment-card.module.css";

interface commentProps {
  avatar: string;
  username: string;
  created_at: string;
  body: string;
  votes: number;
}

const CommentCard: FC<commentProps> = ({
  avatar,
  username,
  created_at,
  body,
  votes,
}) => {
  return (
    <article className={styles.comment}>
      <img
        className={styles.avatar}
        src={avatar}
        alt={`avatar for ${username}`}
      />
      <section className={styles.commentDetails}>
        {username}
        <span className={styles.dateVotes}>
          {created_at} . {votes} votes
        </span>
        <span className={styles.commentBody}>{body}</span>
      </section>
      <section className={styles.commentVotes}>
        Agree? <button aria-label="like comment"> 👍</button>
      </section>
    </article>
  );
};

export default CommentCard;
