import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

import { getBathingWater } from "./utils/riversTrustAPI";
import userGeoLocation from "./utils/getUserLocation";
import { fetchPostCode } from "./utils/fetchPostCode";
import { markerIcon, userIcon, bathingIcon } from "./mapIcons";
import stormOverflow2022 from "./Data/stormOverflow2022.json";

const Map = () => {
  //Map Initialisation
  const [center, setCenter] = useState({
    lat: 51.5095146286,
    lng: -0.1244828354,
  });
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  //Geolocation

  const userLocation = userGeoLocation();
  const showMyLocation = () => {
    if (userLocation.loaded) {
      mapRef.current.flyTo(
        [userLocation.coordinates.lat, userLocation.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    }
  };

  //Postcode

  const [postcode, setPostcodeList] = useState();
  const postcodeLocation = fetchPostCode(postcode);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchPostCode(postcode).then((postcodeLocation) => {
      if (postcodeLocation.loaded) {
        mapRef.current.flyTo(
          [postcodeLocation.coordinates.lat, postcodeLocation.coordinates.lng],
          ZOOM_LEVEL,
          { animate: true }
        );
      }
    });
  };

  // Storm overflow Sewage

  // const [filteredSewage, setFilteredSewage] = useState([]);
  // getSewage().then((data) => {
  //   const mapData = data.data.features;
  //   const removeNullGeo = mapData.filter((mark: any) => mark.geometry !== null);
  //   const filteredSewage = removeNullGeo.slice(0, 200); // changes number of markers ploted on map
  //   setFilteredSewage(filteredSewage);
  // });

  // const [filteredSewage, setFilteredSewage] = useState([]);

  const filteredSewage = stormOverflow2022.filter(
    (mark: any) => mark.geometry !== null
  );

  // Bathing Water

  const [filteredBathing, setFilteredBathing] = useState([]);
  getBathingWater().then((data) => {
    const filteredBathing = data.data.features;

    setFilteredBathing(filteredBathing);
  });

  return (
    <>
      <h1> Map goes here</h1>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        />
      </head>
      <body>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup disableClusteringAtZoom={14}>
            {filteredSewage.map((marker: any) => (
              <Marker
                key={marker.properties.OBJECTID}
                position={[
                  marker.geometry.coordinates[1],
                  marker.geometry.coordinates[0],
                ]}
                icon={markerIcon}
              >
                <Popup>
                  Water Company: {marker.properties.waterCompanyName}
                  Storm Overflow Duration:{" "}
                  {marker.properties.totalDurationAllSpillsHrs} hours
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {filteredBathing.map((marker: any) => (
            <Marker
              key={marker.properties.objectid}
              position={[
                marker.geometry.coordinates[1],
                marker.geometry.coordinates[0],
              ]}
              icon={bathingIcon}
            >
              <Popup>
                Site Name: {marker.properties.site_name}
                <br />
                Description: {marker.properties.description}
              </Popup>
            </Marker>
          ))}

          <Marker
            icon={userIcon}
            position={[
              userLocation.coordinates.lat,
              userLocation.coordinates.lng,
            ]}
          ></Marker>
        </MapContainer>
        <div>
          <button onClick={showMyLocation}>Locate Me</button>
        </div>
      </body>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Search by postcode</p>
            <input
              type="text"
              required
              value={postcode}
              onChange={(event) => setPostcodeList(event.target.value)}
            />
          </label>

          <br></br>
          <button className="button" type="submit">
            submit!
          </button>
        </form>
      </div>
    </>
  );
};
export default Map;
