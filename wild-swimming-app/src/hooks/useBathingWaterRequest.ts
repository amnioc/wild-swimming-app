import { useState, useCallback } from "react";
import { LocationDetailsT, LocationT } from "../types/types";

import axios, { AxiosError } from "axios";

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  errorMsg: string;
  resetError: () => void;
  sendBathingWaterRequest: (
    method: "GET",
    url: string,
    fn: LocationsCallBackFunction
  ) => void;
  sendLocationRequest: (
    method: "GET",
    url: string,
    fn: LocationCallBackFunction
  ) => void;
};

// These needs refactoring (need a better way to reuse types)
type ResponseT<T> = {
  locations: Array<T>;
};

type LocationResponseT<T> = {
  location: Array<T>;
};

type LocationsCallBackFunction = (data: ResponseT<LocationT>) => void;

type LocationCallBackFunction = (
  data: LocationResponseT<LocationDetailsT>
) => void;

const useBathingWaterRequest = (): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sendLocationRequest = useCallback(
    async (
      method: "GET",
      url: string,
      fn: LocationCallBackFunction
    ): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        let data;

        if (method === "GET") {
          data = await axios.get(`${url}`);
        }

        if (!data) {
          setIsLoading(false);
          throw data;
        }

        const formattedResult: Array<LocationDetailsT> = [];

        const result = data.data.result.primaryTopic;

        const locationData = {} as LocationDetailsT;

        locationData.country = result.bathingWater.country.name?._value;
        locationData.county = result.countyName?._value;
        locationData.historyDetails = result.historyStatement?._value;
        locationData.img = result?.webResImage;
        locationData.lat = result.bathingWater.samplingPoint?.lat;
        locationData.long = result.bathingWater.samplingPoint?.long;
        locationData.localAuthority = result.localAuthority.label[0]?._value;
        locationData.locationDescription =
          result.bathingWaterDescription?._value;
        locationData.name = result.bathingWater.name?._value;
        locationData.riskForcastDetails =
          result.pollutionRiskForecastStatement?._value;
        locationData.riskForecast = !result.pollutionRiskForecasting?._value;
        locationData.riverDetails = result.streamsRiversStatement?._value;
        locationData.stormOverflowDetails = result.esoOutfallsStatement?._value;
        locationData.visiblePollution =
          result.visiblePollutionStatement?._value;

        formattedResult.push(locationData);

        const finalResult = {
          location: formattedResult,
        };

        fn(finalResult);
      } catch (err: unknown) {
        console.log(err);
        setIsError(true);
        if (err instanceof AxiosError) {
          setErrorMsg(
            err.message || "Oops, something went wrong. Please try again!"
          );

          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    },
    []
  );

  const sendBathingWaterRequest = useCallback(
    async (
      method: "GET",
      url: string,
      fn: LocationsCallBackFunction
    ): Promise<void> => {
      setIsLoading(true);
      setIsError(false);
      try {
        let data;

        if (method === "GET") {
          data = await axios.get(`${url}`);
        }

        if (!data) {
          setIsLoading(false);
          throw data;
        }

        const formattedResults: Array<LocationT> = [];

        const result = data.data.result.items;

        for (const item of result) {
          const locationData = {} as LocationT;

          locationData.latestAssessmentGrade =
            item.latestComplianceAssessment?.complianceClassification.name._value;

          locationData.location = item.name._value;

          locationData.lat = item.samplingPoint.lat;
          locationData.long = item.samplingPoint.long;

          locationData.nameOfWaterCompany =
            item.appointedSewerageUndertaker.name._value;

          locationData.id = item.eubwidNotation;

          fetch(
            `https://environment.data.gov.uk/data/bathing-water-profile/${item.eubwidNotation}/2023:1.json`
          ).then((data) => {
            data.json().then((data) => {
              if (!data) {
                setIsLoading(false);
                throw data;
              }

              const result = data.result;

              locationData.yearOfAssessmentStart =
                result.primaryTopic.seasonStartDate._value;

              locationData.yearOfAssessmentFinish =
                result.primaryTopic.seasonFinishDate._value;

              locationData.locationDescription =
                result.primaryTopic.zoiDescription._value;

              formattedResults.push(locationData);
            });
          });
        }

        const finalResult = {
          locations: formattedResults,
        };

        fn(finalResult);
      } catch (err: unknown) {
        console.log(err);
        setIsError(true);
        if (err instanceof AxiosError) {
          setErrorMsg(
            err.message || "Oops, something went wrong. Please try again!"
          );
        }
      }

      setIsLoading(false);
    },
    []
  );

  const resetError = () => {
    setIsError(false);
  };

  const request = {
    isLoading,
    isError,
    errorMsg,
    resetError,
    sendBathingWaterRequest,
    sendLocationRequest,
  };

  return request;
};

export default useBathingWaterRequest;
