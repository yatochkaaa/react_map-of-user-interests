import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface UserInterest {
  id: string;
  label: string;
  color: string;
  icon: IconDefinition;
}

export interface User {
  _id: number;
  fullName: string;
  lat: number;
  lon: number;
  interests: string[];
}
