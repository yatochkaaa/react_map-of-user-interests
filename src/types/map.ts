import type { LatLngTuple } from "leaflet";
import type { User } from "./user";

export interface MapConstants {
  DEFAULT_POSITION: LatLngTuple;
  DEFAULT_ZOOM: number;
  INTEREST_COLORS: Record<string, string>;
}

export interface UserMarker extends L.Marker {
  options: L.MarkerOptions & { user: User };
}
