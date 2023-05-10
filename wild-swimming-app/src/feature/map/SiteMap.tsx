import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  LayersControl,
  LayerGroup,
} from "react-leaflet";

import styles from "./map.module.css";

import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

import { markerIcon, bathingIcon } from "./mapIcons";
import stormOverflow2022 from "./Data/stormOverflow2022.json";
import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { useNavigate } from "react-router";

type Props = {
  setFilteredSewageLocations: Function;
};

// TODO be moved to seperate folder as a component
const MapListener = ({ setFilteredSewageLocations }: Props) => {
  const { sendBathingWaterRequest } = useBathingWaterRequest();
  const [bounds, setBounds] = useState(undefined);

  const handle = (e: any) => {
    setBounds(map.getBounds());
  };

  const map = useMapEvent("moveend", handle);

  useEffect(() => {
    const filteredSewage = stormOverflow2022.filter(
      (mark: any) => mark.geometry !== null
    );

    const recentFilteredSewage = filteredSewage?.filter((location) =>
      map.getBounds().contains({
        lat: location.geometry.coordinates[1],
        lng: location.geometry.coordinates[0],
      })
    );

    setFilteredSewageLocations(recentFilteredSewage);
  }, [bounds]);

  return null;
};

// Map Component
const SiteMap = (location) => {
  //Map Initialisation

  const [center, setCenter] = useState({
    lat: location.location.lat,
    lng: location.location.long,
  });

  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  const [filteredSewageLocations, setFilteredSewageLocations] = useState([]);

  return (
    <>
      <div>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          />

          <MapListener
            location={location}
            setFilteredSewageLocations={setFilteredSewageLocations}
          />

          <LayersControl postion="topright">
            <LayersControl.Overlay checked name="Storm Overflow 2022">
              <MarkerClusterGroup disableClusteringAtZoom={16}>
                {filteredSewageLocations.map((marker: any) => (
                  <Marker
                    key={marker.properties.OBJECTID}
                    position={[
                      marker.geometry.coordinates[1],
                      marker.geometry.coordinates[0],
                    ]}
                    icon={markerIcon}
                  >
                    <Popup>
                      <span>
                        Storm Overflow Duration:
                        {marker.properties.totalDurationAllSpillsHrs} hours
                      </span>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
          </LayersControl>
          <Marker
            icon={bathingIcon}
            position={[location.location.lat, location.location.long]}
          ></Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default SiteMap;
