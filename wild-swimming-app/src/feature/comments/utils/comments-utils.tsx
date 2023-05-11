import axios from "axios";

//return all comments by location
export const getCommentsByLocation = (location_id) => {
  return axios
    .get(
      `https://splash-wild-swimming-be.onrender.com/api/comments/location/${location_id}`
    )
    .then((response) => {
      return response.data.comments;
    });
};

//add votes to comment
export const patchCommentVotes = (comment_id) => {
  return axios
    .patch(
      `https://splash-wild-swimming-be.onrender.com/api/comments/${comment_id}`,
      {
        incVotes: 1,
      }
    )
    .then((response) => {
      return response.data.comment.votes;
    });
};

//delete comment if comment written by user
export const deleteCommentByID = (comment_id) => {
  return axios
    .delete(
      `https://splash-wild-swimming-be.onrender.com/api/comments/${comment_id}`
    )
    .then((response) => {
      return response.data.comment;
    });
};

// const testLocation = ukd5400-40750
