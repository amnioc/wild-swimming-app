import axios from "axios";

// export const getBathingWater = () => {
//   return axios
//     .get(
//       "https://services3.arcgis.com/Bb8lfThdhugyc4G3/arcgis/rest/services/River_Amenity_Sites_2/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
//     )
//     .then((res) => {
//       return res;
//     });
// };

export const getBathingWater = (bounds) => {
  console.log(bounds._northEast);
  return axios
    .get(
      `https://environment.data.gov.uk/doc/bathing-water.json?min-samplingPoint.long=${bounds._northEast.lng}&max-samplingPoint.long=${bounds._southWest.lng}&min-samplingPoint.lat=${bounds._northEast.lat}&max-samplingPoint.lat=${bounds._northEast.lat}`
    )
    .then((res) => {
      console.log(res);
      return res;
    });
};
