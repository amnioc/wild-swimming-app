import { useState } from "react";
import styles from "./delete-button.module.css";

import { deleteCommentByID } from "../../feature/comments/utils/comments-utils";

const DeleteButton = ({ comment, setLocationComments, locationComments }) => {
  const [err, setErr] = useState(null);

  const handleDeleteClick = (event) => {
    setErr(null);
    // event.currentTarget.disabled = true;
    const deletedCommentKey = comment._id;
    setLocationComments((locationComments) => {
      return [...locationComments].filter(
        (comments, key) => comments._id != deletedCommentKey
      );
    });

    deleteCommentByID(comment._id).catch((err) => {
      console.log(err);
      setErr("Oops! Something went wrong, please try again later.");
    });
  };
  return (
    <aside className={styles.deleteCommentButton}>
      <button onClick={handleDeleteClick}>Delete Comment</button>
      {err ? <h4>{err}</h4> : null}
    </aside>
  );
};

export default DeleteButton;
