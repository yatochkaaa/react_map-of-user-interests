import type { LatLngTuple } from "leaflet";
import type { MapConstants } from "./types/map";
import type { UserInterest } from "./types/user";

export const interestsList: UserInterest[] = [
  { id: "hiking", label: "Hiking", color: "#f94144" },
  { id: "cooking", label: "Cooking", color: "#f3722c" },
  { id: "traveling", label: "Traveling", color: "#f9c74f" },
  { id: "reading", label: "Reading", color: "#90be6d" },
  { id: "photography", label: "Photography", color: "#43aa8b" },
  { id: "gaming", label: "Gaming", color: "#577590" },
  { id: "music", label: "Music", color: "#277da1" },
  { id: "sports", label: "Sports", color: "#9d4edd" },
  { id: "art", label: "Art", color: "#f8961e" },
  { id: "technology", label: "Technology", color: "#4d908e" },
];

export const map: MapConstants = {
  DEFAULT_POSITION: [50.45, 30.52] as LatLngTuple, // Kyiv, Ukraine
  DEFAULT_ZOOM: 5, // Country-level zoom
  INTEREST_COLORS: interestsList.reduce((acc, interest) => {
    acc[interest.id] = interest.color;
    return acc;
  }, {} as Record<string, string>),
};
