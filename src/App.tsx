import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import type { User } from "./types/user";
import { map } from "./constants";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <MapContainer
        center={map.DEFAULT_POSITION}
        zoom={map.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user) => (
          <Marker position={[user.lat, user.lon]} key={user.id}>
            <Popup>
              <strong>{user.fullName}</strong>
              <div>Interests: {user.interests.join(", ")}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;
