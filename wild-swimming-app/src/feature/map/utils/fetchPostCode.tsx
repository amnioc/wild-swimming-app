import axios from "axios";
import { error } from "console";

export const checkValidPostocde =(postcode:any) => {

  return axios.get(`https://postcodes.io/postcodes/
  ${postcode}/validate`).then((response)=>{
  
    return response.data.result 
  })
  }



export const fetchPostCode = (postcode: any) => {
 
  return  axios.get(`https://postcodes.io/postcodes/${postcode}`).then((res) => {
   
    let num1 = res.data.result.longitude;
    let num2 = res.data.result.latitude;
    const postcodeLocation = {
      loaded: true,
      coordinates: { lat: num2, lng: num1 },
    };

    return postcodeLocation;
  });
};
