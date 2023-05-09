
import axios from "axios";
const swimmingApi = axios.create({
    baseURL : ''
})
export const postComments = (location_Id, inputComment) => {
    return swimmingApi.post(`/${location_Id}/comments`, inputComment)
       .then((response) => {
     return response.data.comments;
            });
    };
    // const testLocation = ukd5400-40750