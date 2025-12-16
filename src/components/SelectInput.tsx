import Select, { type ActionMeta, type MultiValue } from "react-select";
import type { OptionType } from "../types/select";

interface Props {
  options: OptionType[];
  selectedOptions: MultiValue<OptionType>;
  setSelectedOptions: (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
}

const FilterInput = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        zIndex: 1000,
      }}
    >
      <Select<OptionType, true>
        isMulti
        options={options}
        placeholder="Filter by interest..."
        value={selectedOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={setSelectedOptions}
      />
    </div>
  );
};

export default FilterInput;
