import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import type { LatLngBounds } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { MultiValue } from "react-select";
import UserMarker from "./UserMarker";
import {
  handleClusterMouseOut,
  handleClusterMouseOver,
  iconCreateFunction,
} from "../../utils/donut";
import { map } from "../../constants";
import type { User } from "../../types/user";
import type { OptionType } from "../../types/select";

interface Props {
  users: User[];
  selectedInterests: MultiValue<OptionType>;
}

const UsersMap = ({ users, selectedInterests }: Props) => {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  const MapBoundsWatcher = ({
    onBoundsChange,
    bounds,
  }: {
    onBoundsChange: (bounds: LatLngBounds) => void;
    bounds: LatLngBounds | null;
  }) => {
    const currentMap = useMapEvents({
      moveend: (e) => onBoundsChange(e.target.getBounds()),
      zoomend: (e) => onBoundsChange(e.target.getBounds()),
    });

    useEffect(() => {
      const newBounds = currentMap.getBounds();
      if (!bounds || !newBounds.equals(bounds)) {
        onBoundsChange(newBounds);
      }
    }, [currentMap, onBoundsChange, bounds]);

    return null;
  };

  const filteredUsers = useMemo(() => {
    if (!bounds) return [];

    const interestsSet = new Set(selectedInterests.map((i) => i.value));

    return users.filter((u) => {
      const inBounds = bounds.contains([u.lat, u.lon]);

      if (!inBounds) return false;

      if (!interestsSet.size) return true;

      return u.interests.some((ui) => interestsSet.has(ui));
    });
  }, [users, selectedInterests, bounds]);

  return (
    <MapContainer
      center={map.DEFAULT_POSITION}
      zoom={map.DEFAULT_ZOOM}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBoundsWatcher onBoundsChange={setBounds} bounds={bounds} />
      <MarkerClusterGroup
        iconCreateFunction={iconCreateFunction}
        eventHandlers={{
          clustermouseover: handleClusterMouseOver,
          clustermouseout: handleClusterMouseOut,
        }}
      >
        {filteredUsers.map((user) => (
          <UserMarker key={user._id} user={user} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default UsersMap;
