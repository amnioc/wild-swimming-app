import React, { useState, useEffect } from "react";

const userGeoLocation = () => {
  const [userLocation, setUserLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location) => {
    setUserLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  //   const onError = (error) => {
  //     setLocation({
  //       loaded: true,
  //       error: {
  //         code: error.code,
  //         message: error.message,
  //       },
  //     });
  //   };

  useEffect(() => {
    // if (!("geolocation" in navigator)) {
    //   onError({
    //     code: 0,
    //     message: "Geolocation not supported",
    //   });
    // }

    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return userLocation;
};

export default userGeoLocation;
