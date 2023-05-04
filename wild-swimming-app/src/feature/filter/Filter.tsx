import styles from "./filter.module.css";

import useBathingWaterRequest from "../../hooks/useBathingWaterRequest";
import { LocationT } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import FilterInput from "../../components/filter-input/filter-input";

type ResponseT<T> = {
  locations: Array<T>;
};

const Filter = () => {
  const [locations, setLocations] = useState<Array<LocationT>>();
  const [filteredLocations, setFilteredLocations] =
    useState<Array<LocationT>>();

  // values
  const gradeValue = useRef<HTMLInputElement>(null);
  const waterCompanyValue = useRef<HTMLInputElement>(null);
  const locationValue = useRef<HTMLInputElement>(null);

  const { sendRequest } = useBathingWaterRequest();

  // this function should be moved to somewhere where
  // it can be use by the map to generate flags based on
  // filtered results
  const handleFiltering = async () => {
    // TODO handle postcode

    const formValues = {
      latestAssessmentGrade: gradeValue.current?.value,
      nameOfWaterCompany: waterCompanyValue.current?.value,
      location: locationValue.current?.value,
    };

    let appliedFilter = locations;

    for (const [key, value] of Object.entries(formValues)) {
      appliedFilter = appliedFilter?.filter((location) => {
        if (value === "") return true;

        return location[key as keyof LocationT] === value;
      });
    }

    setFilteredLocations(appliedFilter);
  };

  useEffect(() => {
    const res = (data: ResponseT<LocationT>) => {
      setLocations(data.locations);
    };

    // TODO Hardcoded coords - string needs to change to template literal!
    sendRequest(
      "GET",
      `https://environment.data.gov.uk/doc/bathing-water.json?min-samplingPoint.long=-3.231360&max-samplingPoint.long=-1.926734&min-samplingPoint.lat=53.075973&max-samplingPoint.lat=53.664265`,
      res
    );
  }, [sendRequest]);

  return (
    <section className={styles.Container}>
      <div className={styles.Filter}>
        <FilterInput
          locations={locations}
          placeholder="grade"
          value={gradeValue}
          keyToFilter="latestAssessmentGrade"
        />

        <FilterInput
          locations={locations}
          placeholder="water company"
          value={waterCompanyValue}
          keyToFilter="nameOfWaterCompany"
        />

        <FilterInput
          locations={locations}
          placeholder="location"
          value={locationValue}
          keyToFilter="location"
        />
      </div>

      <button onClick={handleFiltering}>Apply filtering</button>
    </section>
  );
};

export default Filter;
