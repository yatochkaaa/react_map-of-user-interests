export interface UserInterest {
  id: string;
  label: string;
  color: string;
}

export interface User {
  _id: number;
  fullName: string;
  lat: number;
  lon: number;
  interests: string[];
}
