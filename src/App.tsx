import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { User } from "./types/user";
import { map } from "./constants";
import { iconCreateFunction } from "./utils/donut";
import { getUsers } from "./api/users";
import UserMarker from "./components/UserMarker";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
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
        <MarkerClusterGroup iconCreateFunction={iconCreateFunction}>
          {users.map((user) => (
            <UserMarker key={user.id} user={user} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default App;
