import type { User } from "./user";

export interface UserMarker extends L.Marker {
  options: L.MarkerOptions & { user: User };
}
