import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { LocationDetailsT } from "../../types/types";

import styles from "./location-details.module.css";

import SiteMap from "../../feature/map/SiteMap";
import Header from "../../components/Header/Header";
import axios from "axios";

import AddCommentForm from "../../components/add-comment-form/AddCommentForm";
import { useAuth0 } from "@auth0/auth0-react";
import Comments from "../../feature/comments/Comments";


type LocationResponseT<T> = {
  location: Array<T>;
};
type InlandLocationT = {
  name: string;
  locationDescription: number;
  lat: number;
  long: number;
};

const LocationDetails = () => {

  const [location, setLocation] = useState<
    LocationDetailsT | InlandLocationT
  >();


 
const{user} = useAuth0()


  const { id } = useParams();

  const { sendLocationRequest, isLoading, isError, errorMsg } =
    useBathingWaterRequest();

  useEffect(() => {
    const res = (data: LocationResponseT<LocationDetailsT>) => {
      setLocation(data.location[0]);
    };

    if (id?.startsWith("uk")) {
      sendLocationRequest(
        "GET",
        `https://environment.data.gov.uk/data/bathing-water-profile/${id}/2023:1`,
        res
      );
    } else {
      const res = async () => {
        const data = await axios.get(
          "https://services3.arcgis.com/Bb8lfThdhugyc4G3/arcgis/rest/services/River_Amenity_Sites_2/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
        );
        const currentLocation = data.data.features.find((loc) => {
          return +loc.properties.objectid === +id;
        });

        const formattedLocation = {
          name: currentLocation.properties.site_name,
          locationDescription: currentLocation.properties.description,
          lat: currentLocation.geometry.coordinates[1],
          long: currentLocation.geometry.coordinates[0],
        };

        console.log(formattedLocation);
        setLocation(formattedLocation);

        // console.log(data.data.features[0].properties.objectid);
        // setInlandLocations(data.data.features);
      };

      res();
    }
  }, [sendLocationRequest, id]);

  return (

    <>
      <Header />
      <section className={styles.Location}>
        {isError && <span>{errorMsg}</span>}

        {isLoading && <span>Loading...</span>}

        {!isLoading && !isError && (
          <>
            <h2>{location?.name}</h2>
            {location?.county && (
              <h4>
                {location?.county}, {location?.country}
              </h4>
            )}

            {location?.img && (
              <div className={styles.ImgBox}>
                <img
                  className={styles.Img}
                  src={location?.img}
                  alt={`image of ${location?.name} bathing water site`}
                />
              </div>
            )}

            <section className={styles.DetailsSection}>
              {location?.LocalAuthority && (
                <span className={styles.LocalAuthority}>
                  Local Authority: {location?.localAuthority}
                </span>
              )}

              <details className={styles.Details}>
                <summary>About</summary>
                <p>
                  {location?.locationDescription ||
                    "No information available, sorry!"}
                </p>
              </details>

              <details className={styles.Details}>
                <summary>Details</summary>
                <p>
                  {location?.riverDetails || "No information available, sorry!"}
                </p>
              </details>

              <details className={styles.Details}>
                <summary>Storm Overflow</summary>
                <p>
                  {location?.stormOverflowDetails ||
                    "No information available, sorry!"}
                </p>
              </details>

              <details className={styles.Details}>
                <summary>Treatment History</summary>
                <p>
                  {location?.historyDetails ||
                    "No information available, sorry!"}
                </p>
              </details>

              <details className={styles.Details}>
                <summary>
                  <div className={styles.Risk_Summary}>
                    <span>Risk</span>
                    <span
                      className={`${styles.Risk_Summary_alert} ${
                        location?.riskForecast
                          ? styles.Risk_Summary_alert__true
                          : styles.Risk_Summary_alert__false
                      }`}
                    ></span>
                  </div>
                </summary>

                <p>
                  {location?.riskForcastDetails ||
                    "No information available, sorry!"}
                </p>
              </details>

              <details className={styles.Details}>
                <summary>Visible Pollution</summary>
                <p>
                  {location?.visiblePollution ||
                    "No information available, sorry!"}
                </p>
              </details>
            </section>
          </>
        )}

        {location && <SiteMap location={location} />}

        {/*TODO add a comments feature, which holds the comment cards*/}
      </section>
    </>
  );
};

export default LocationDetails;
