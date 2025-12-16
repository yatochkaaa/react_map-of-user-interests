import { Marker, Popup } from "react-leaflet";
import { getMarkerRef } from "../../utils/donut";
import type { User } from "../../types/user";

interface Props {
  user: User;
}

const UserMarker = ({ user }: Props) => {
  return (
    <Marker position={[user.lat, user.lon]} ref={getMarkerRef(user)}>
      <Popup>
        <strong>{user.fullName}</strong>
        <div>Interests: {user.interests.join(", ")}</div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
