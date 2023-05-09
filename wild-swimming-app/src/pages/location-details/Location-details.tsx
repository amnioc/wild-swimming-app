import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { LocationDetailsT } from "../../types/types";

import styles from "./location-details.module.css";
import AddCommentForm from "../../components/add-comment-form/AddCommentForm";
import Comments from "../../feature/comments/Comments";

type LocationResponseT<T> = {
  location: Array<T>;
};

const LocationDetails = () => {
  const [location, setLocation] = useState<LocationDetailsT>();

  const { id } = useParams();

  const { sendLocationRequest, isLoading, isError, errorMsg } =
    useBathingWaterRequest();

  useEffect(() => {
    const res = (data: LocationResponseT<LocationDetailsT>) => {
      setLocation(data.location[0]);
    };

    sendLocationRequest(
      "GET",
      `https://environment.data.gov.uk/data/bathing-water-profile/${id}/2023:1`,
      res
    );
  }, [sendLocationRequest, id]);

  return (
    <section className={styles.Location}>
      {isError && <span>{errorMsg}</span>}

      {isLoading && <span>Loading...</span>}

      {!isLoading && !isError && (
        <>
          <h2>{location?.name}</h2>
          <h4>
            {location?.county}, {location?.country}
          </h4>

          <div className={styles.ImgBox}>
            <img
              className={styles.Img}
              src={location?.img}
              alt={`image of ${location?.name} bathing water site`}
            />
          </div>

          <section className={styles.DetailsSection}>
            <span className={styles.LocalAuthority}>
              Local Authority: {location?.localAuthority}
            </span>

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
                {location?.historyDetails || "No information available, sorry!"}
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

      {/*TODO add a comments feature, which holds the comment cards*/}
      <AddCommentForm />
      <Comments />
    </section>
  );
};

export default LocationDetails;
