import axios from "axios";
const swimmingApi = axios.create({
  baseURL: "",
});
export const postComments = (location_Id, inputComment) => {
  return swimmingApi
    .post(`/${location_Id}/comments`, inputComment)
    .then((response) => {
      return response.data.comments;
    });
};

export const getCommentsByLocation = (location_id) => {
  return axios
    .get(
      `https://splash-wild-swimming-be.onrender.com/comments/location/${location_id}`
    )
    .then((response) => {
      return response.data.comments;
    });
};
// const testLocation = ukd5400-40750
