import axios from "axios";
export const getSewage = () => {
  return axios
    .get(
      "https://services3.arcgis.com/Bb8lfThdhugyc4G3/arcgis/rest/services/Event_Duration_Monitoring_Storm_Overflows_2022_England_and_Wales/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
    )
    .then((res) => {
      return res;
    });
};
