import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { LocationDetailsT } from "../../types/types";

import styles from "./location-details.module.css";

type LocationResponseT<T> = {
  location: Array<T>;
};

const LocationDetails = () => {
  const [location, setLocation] = useState<LocationDetailsT>();

  const { id } = useParams();

  const { sendLocationRequest } = useBathingWaterRequest();

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

  console.log(location);

  return (
    <section className={styles.Location}>
      <h2>{location?.name}</h2>
      <h4>{location?.county}</h4>
      <h4>{location?.country}</h4>
      <img
        className={styles.Img}
        src={location?.img}
        alt={`image of ${location?.name} bathing water site`}
      />
      <span>Local Authority: {location?.localAuthority}</span>
      <h3>About</h3>
      <p>{location?.locationDescription}</p>
      <h3>Details</h3>
      <p>{location?.riverDetails}</p>
      <h3>Storm Overflow</h3>
      <p>{location?.stormOverflowDetails}</p>
      <h3>History</h3>
      <p>{location?.historyDetails}</p>
      <h3>Risk</h3>
      <span>{location?.riskForecast}</span>
      <p>{location?.riskForcastDetails}</p>
      <h3>Visible Pollution</h3>
      <p>{location?.visiblePollution}</p>
    </section>
  );
};

export default LocationDetails;
