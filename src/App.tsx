import { useEffect, useState } from "react";
import type { MultiValue } from "react-select";
import UsersMap from "./components/map/UsersMap";
import type { User } from "./types/user";
import { interestsList } from "./constants";
import { getUsers } from "./api/users";
import type { OptionType } from "./types/select";
import "./App.css";
import SelectInput from "./components/SelectInput";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<
    MultiValue<OptionType>
  >([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <>
      <SelectInput
        options={interestsList.map(({ id, label }) => ({
          value: id,
          label,
        }))}
        selectedOptions={selectedInterests}
        setSelectedOptions={setSelectedInterests}
      />

      <UsersMap users={users} selectedInterests={selectedInterests} />
    </>
  );
}

export default App;
