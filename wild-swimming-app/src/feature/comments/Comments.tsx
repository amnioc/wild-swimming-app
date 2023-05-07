import { useState } from "react";
import CommentCard from "../../components/comment-card/Comment-card";
import styles from "./comments.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const Comments = () => {
  const [comments, setComments] = useState("");
  const { user } = useAuth0();

  console.log(user);
  //get comments by location ID
  //map comments

  return (
    <ul className={styles.commentsList}>
      {comments.map((comment) => {
        return (
          <section>
            {err ? <h4>{err}</h4> : null}
            <CommentCard user={user} comment={comment} />
          </section>
        );
      })}
    </ul>
  );
};

export default Comments;
