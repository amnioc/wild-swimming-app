export type LocationT = {
  latestAssessmentGrade: string;
  lat: number;
  long: number;
  location: string;
  locationDescription: string;
  nameOfWaterCompany: string;
  yearOfAssessmentStart: Date;
  yearOfAssessmentFinish: Date;
  id: string;
};

export type LocationDetailsT = {
  img: string;
  name: string;
  country: string;
  county: string;
  lat: number;
  long: number;
  locationDescription: string;
  stormOverflowDetails: string;
  historyDetails: string;
  localAuthority: string;
  riskForcastDetails: string;
  riskForecast: boolean;
  visiblePollution: string;
  riverDetails: string;
};
