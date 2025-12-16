import type { LatLngTuple } from "leaflet";

interface MapConstants {
  DEFAULT_POSITION: LatLngTuple;
  DEFAULT_ZOOM: number;
  INTEREST_COLORS: Record<string, string>;
}

export const map: MapConstants = {
  DEFAULT_POSITION: [50.45, 30.52] as LatLngTuple, // Kyiv, Ukraine
  DEFAULT_ZOOM: 5, // Country-level zoom
  INTEREST_COLORS: {
    hiking: "#f94144",
    cooking: "#f3722c",
    traveling: "#f9c74f",
    reading: "#90be6d",
    photography: "#43aa8b",
    gaming: "#577590",
    music: "#277da1",
    sports: "#9d4edd",
    art: "#f15bb5",
    technology: "#00bbf9",
  },
};
