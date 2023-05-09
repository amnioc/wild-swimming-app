import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

import styles from "./map.module.css";

import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

import userGeoLocation from "./utils/getUserLocation";
import { checkValidPostocde, fetchPostCode } from "./utils/fetchPostCode";
import { markerIcon, userIcon, bathingIcon } from "./mapIcons";
import stormOverflow2022 from "./Data/stormOverflow2022.json";
import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { useNavigate } from "react-router";
import axios from "axios";

type Props = {
  setFilteredInlandLocations: Function;
  setFilteredCoastalLocations: Function;
  setFilteredSewageLocations: Function;
};

// TODO be moved to seperate folder as a component
const MapListener = ({
  setFilteredInlandLocations,
  setFilteredCoastalLocations,
  setFilteredSewageLocations,
}: Props) => {
  const [inlandLocations, setInlandLocations] = useState();
  const [coastalLocations, setCoastalLocations] = useState();
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

  useEffect(() => {
    const recentFilteredInlandLocations = inlandLocations?.filter((location) =>
      map.getBounds().contains({
        lat: location.geometry.coordinates[1],
        lng: location.geometry.coordinates[0],
      })
    );

    setFilteredInlandLocations(recentFilteredInlandLocations);
  }, [bounds]);

  useEffect(() => {
    const recentFilteredCoastalLocations = coastalLocations?.filter(
      (location) =>
        map.getBounds().contains({
          lat: location.lat,
          lng: location.long,
        })
    );

    setFilteredCoastalLocations(recentFilteredCoastalLocations);
  }, [bounds]);

  useEffect(() => {
    map.setView(
      {
        lat: 51.5095146286,
        lng: -0.1244828354,
      },
      14
    );
  }, []);

  useEffect(() => {
    const res = async () => {
      const data = await axios.get(
        "https://services3.arcgis.com/Bb8lfThdhugyc4G3/arcgis/rest/services/River_Amenity_Sites_2/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
      );

      setInlandLocations(data.data.features);
    };

    res();
  }, []);

  useEffect(() => {
    const res = (data: any) => {
      setCoastalLocations(data.locations);
    };

    sendBathingWaterRequest(
      "GET",
      `https://environment.data.gov.uk/doc/bathing-water.json?_pageSize=1000`,
      res
    );
  }, []);

  return null;
};

// Map Component
const Map = () => {
  //Map Initialisation
  const [center, setCenter] = useState({
    lat: 51.5095146286,
    lng: -0.1244828354,
  });
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  const [filteredInlandLocations, setFilteredInlandLocations] = useState([]);
  const [filteredCoastalLocations, setFilteredCoastalLocations] = useState([]);
  const [filteredSewageLocations, setFilteredSewageLocations] = useState([]);

  const navigate = useNavigate();

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

  // const [postcode, setPostcodeList] = useState();
  // const postcodeLocation = fetchPostCode(postcode);

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   fetchPostCode(postcode).then((postcodeLocation) => {
  //     if (postcodeLocation.loaded) {
  //       mapRef.current.flyTo(
  //         [postcodeLocation.coordinates.lat, postcodeLocation.coordinates.lng],
  //         ZOOM_LEVEL,
  //         { animate: true }
  //       );
  //     }
  //   });
  // };

  // }if (isPostcodeValid === false ){
  //   setMessage("Postcode can not be found, Please enter a valid Postocde")
  // }
  const [err, setErr] = useState();
  const[message, setMessage]= useState("");
  const[isPostcodeValid, setIsPostcodeValid]=useState()
  const[postcode,  setPostcodeList] = useState("")

  const handleSubmit = (event: any) => {
    event.preventDefault();
    checkValidPostocde (postcode).then((result)=>{
      setIsPostcodeValid(result);
      if(isPostcodeValid === false){
        setMessage("Postcode can not be found, Please enter a valid Postocde")
      }
    })
    if (isPostcodeValid === true){
  fetchPostCode(postcode).then((currentPostcode) => {
      if (currentPostcode.loaded) {
        mapRef.current.flyTo(
          [currentPostcode.coordinates.lat, currentPostcode.coordinates.lng],
          ZOOM_LEVEL,
          { animate: true }
        )
      }
      
    })
    }
    setMessage("");
      setPostcodeList("");
  }
  
   
    

  const handlePopUpClick = (id: any) => {
    navigate(`/location/${id}`);
  };

  return (
    <>
      <h1> Map goes here</h1>

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
            setFilteredInlandLocations={setFilteredInlandLocations}
            setFilteredCoastalLocations={setFilteredCoastalLocations}
            setFilteredSewageLocations={setFilteredSewageLocations}
          />

          <MarkerClusterGroup disableClusteringAtZoom={14}>
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
                    Water Company:{" "}
                    <span onClick={handlePopUpClick}>
                      {marker.properties.waterCompanyName}
                    </span>
                  </span>
                  <span>
                    Storm Overflow Duration:
                    {marker.properties.totalDurationAllSpillsHrs} hours
                  </span>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {filteredCoastalLocations?.map((marker: any) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.long]}
              icon={markerIcon}
            >
              <Popup>
                <span>
                  Site Name:{" "}
                  <span onClick={() => handlePopUpClick(marker.id)}>
                    {marker.location}
                  </span>
                </span>

                <span>Description: {marker.locationDescription}</span>
              </Popup>
            </Marker>
          ))}

          {filteredInlandLocations?.map((marker: any) => (
            <Marker
              key={marker.properties.objectid}
              position={[
                marker.geometry.coordinates[1],
                marker.geometry.coordinates[0],
              ]}
              icon={bathingIcon}
            >
              <Popup>
                <span>
                  {" "}
                  Site Name:{" "}
                  <span onClick={handlePopUpClick}>
                    {marker.properties.site_name}
                  </span>
                </span>

                <span>Description: {marker.properties.description}</span>
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
      </div>

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
          {err? <p>{err}</p> :null}
          {!err ? <p>{message}</p> :null}
        </form>
      </div>
    </>
  );
};


export default Map;

