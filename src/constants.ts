import type { LatLngTuple } from "leaflet";
import type { MapConstants } from "./types/map";
import type { UserInterest } from "./types/user";
import {
  faBook,
  faMusic,
  faCamera,
  faGamepad,
  faRunning,
  faPaintBrush,
  faLaptop,
  faUtensils,
  faHiking,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

export const interestsList: UserInterest[] = [
  { id: "hiking", label: "Hiking", color: "#f94144", icon: faHiking },
  { id: "cooking", label: "Cooking", color: "#f3722c", icon: faUtensils },
  { id: "traveling", label: "Traveling", color: "#f9c74f", icon: faPlane },
  { id: "reading", label: "Reading", color: "#90be6d", icon: faBook },
  { id: "photography", label: "Photography", color: "#43aa8b", icon: faCamera },
  { id: "gaming", label: "Gaming", color: "#577590", icon: faGamepad },
  { id: "music", label: "Music", color: "#277da1", icon: faMusic },
  { id: "sports", label: "Sports", color: "#9d4edd", icon: faRunning },
  { id: "art", label: "Art", color: "#f8961e", icon: faPaintBrush },
  { id: "technology", label: "Technology", color: "#4d908e", icon: faLaptop },
];

export const map: MapConstants = {
  DEFAULT_POSITION: [50.45, 30.52] as LatLngTuple, // Kyiv, Ukraine
  DEFAULT_ZOOM: 5, // Country-level zoom
  INTEREST_COLORS: interestsList.reduce((acc, interest) => {
    acc[interest.id] = interest.color;
    return acc;
  }, {} as Record<string, string>),
};
