import axios from "axios";

export const getCommentsByLocation = (location_id) => {
  return axios
    .get(
      `https://splash-wild-swimming-be.onrender.com/api/comments/location/${location_id}`
    )
    .then((response) => {
      return response.data.comments;
    });
};
// const testLocation = ukd5400-40750
