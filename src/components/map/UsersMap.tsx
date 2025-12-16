import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { MultiValue } from "react-select";
import UserMarker from "./UserMarker";
import { iconCreateFunction } from "../../utils/donut";
import { map } from "../../constants";
import type { User } from "../../types/user";
import type { OptionType } from "../../types/select";

interface Props {
  users: User[];
  selectedInterests: MultiValue<OptionType>;
}

const UsersMap = ({ users, selectedInterests }: Props) => {
  const filteredUsers = users.filter((u) => {
    if (selectedInterests.length === 0) return true;
    return u.interests.some((ui) =>
      selectedInterests.some((si) => si.value === ui)
    );
  });

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
      <MarkerClusterGroup iconCreateFunction={iconCreateFunction}>
        {filteredUsers.map((user) => (
          <UserMarker key={user._id} user={user} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default UsersMap;
