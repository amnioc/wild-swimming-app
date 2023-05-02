import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getSewage } from "./utils/riversTrustAPI";
import useGeoLocation from "./utils/getUserLocation";

//import { fetchPostcodes } from "./utils/api";
const Map = () => {
  const [center, setCenter] = useState({
    lat: 51.5095146286,
    lng: -0.1244828354,
  });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png",
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const userIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/?size=512&id=48096&format=png",
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const location = useGeoLocation();
  const showMyLocation = () => {
    console.log(location);
    if (location.loaded) {
      console.log(location);
      console.log(mapRef);
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    }
  };

  const [filteredMarkers, setFilteredMarkers] = useState([]);
  getSewage().then((data) => {
    const mapData = data.data.features;
    // console.log(mapData);
    const removeNullGeo = mapData.filter((mark: any) => mark.geometry !== null);
    const filteredMarkers = removeNullGeo.slice(0, 250); // changes number of markers ploted on map
    setFilteredMarkers(filteredMarkers);
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

          {filteredMarkers.map((marker: any) => (
            <Marker
              key={marker.properties.OBJECTID}
              position={[
                marker.geometry.coordinates[1],
                marker.geometry.coordinates[0],
              ]}
              icon={markerIcon}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))}

          <Marker
            icon={userIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        </MapContainer>
        <div>
          <button onClick={showMyLocation}>Locate Me</button>
        </div>
      </body>
    </>
  );
};
export default Map;
