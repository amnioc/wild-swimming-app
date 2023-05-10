import axios from "axios";
const swimmingApi = axios.create({
  baseURL: `https://splash-wild-swimming-be.onrender.com/api`,
});
export const postComments = ( inputComment) => {
  return swimmingApi
    .post(`/comments`, inputComment)
    .then((response) => {
      return response.data.comments;
    });
};
