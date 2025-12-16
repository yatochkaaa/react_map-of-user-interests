import { Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMarkerRef } from "../../utils/donut";
import type { User } from "../../types/user";
import { interestsList } from "../../constants";
import Avatar from "../Avatar";

interface Props {
  user: User;
}

const UserMarker = ({ user }: Props) => {
  const avatarUrl = `https://i.pravatar.cc/150?u=${user._id}`;

  return (
    <Marker position={[user.lat, user.lon]} ref={getMarkerRef(user)}>
      <Popup>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar src={avatarUrl} alt={user.fullName} size={40} />
            <strong>{user.fullName}</strong>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginTop: 4,
            }}
          >
            {user.interests.map((interestId) => {
              const interest = interestsList.find((i) => i.id === interestId);
              if (!interest) return null;
              return (
                <div
                  key={interest.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 6px",
                    backgroundColor: interest.color,
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {interest.icon && (
                    <FontAwesomeIcon
                      icon={interest.icon}
                      style={{ fontSize: "10px" }}
                    />
                  )}
                  <span>{interest.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
