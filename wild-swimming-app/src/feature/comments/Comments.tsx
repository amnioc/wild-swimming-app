import { useEffect, useState } from "react";
import CommentCard from "../../components/comment-card/Comment-card";
import styles from "./comments.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { getCommentsByLocation } from "../../components/add-comment-form/utils/ comments-utils";

const Comments = () => {
  const [locationComments, setLocationComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth0();
  const { id } = useParams();
  const location_id = id;

  useEffect(() => {
    setIsLoading(true);
    getCommentsByLocation(location_id).then((comments) => {
      setIsLoading(false);
      setLocationComments(comments);
    });
  }, [location_id]);

  if (isLoading) {
    {
      err ? <h4>{err}</h4> : null;
    }
    return <h4 className={styles.loadingMessage}>Comments Loading...</h4>;
  }
  //map comments

  return (
    <section className={styles.commentsSection}>
      {/* <New Comment Form> */}
      <ul className={styles.commentsList}>
        {locationComments.map((comment) => {
          return (
            <section>
              <CommentCard user={user} comment={comment} />
            </section>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
