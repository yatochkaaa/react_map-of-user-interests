import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { type MultiValue } from "react-select";
import type { User } from "./types/user";
import { map, interestsList } from "./constants";
import { iconCreateFunction } from "./utils/donut";
import { getUsers } from "./api/users";
import UserMarker from "./components/UserMarker";
import FilterInput from "./components/FilterInput";
import type { OptionType } from "./types/ui";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<
    MultiValue<OptionType>
  >([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter((u) => {
    if (selectedInterests.length === 0) return true;
    return u.interests.some((ui) =>
      selectedInterests.some((si) => si.value === ui)
    );
  });

  return (
    <>
      <FilterInput
        options={interestsList.map(({ id, label }) => ({
          value: id,
          label,
        }))}
        selectedOptions={selectedInterests}
        setSelectedOptions={setSelectedInterests}
      />

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
    </>
  );
}

export default App;
