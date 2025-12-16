import Select, {
  components,
  type ActionMeta,
  type MultiValue,
  type OptionProps,
  type MultiValueGenericProps,
} from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const Option = (props: OptionProps<OptionType, true>) => (
    <components.Option {...props}>
      {props.data.icon && (
        <FontAwesomeIcon
          icon={props.data.icon}
          color={props.data.color}
          style={{ marginRight: 8 }}
        />
      )}
      {props.label}
    </components.Option>
  );

  const MultiValueLabel = (props: MultiValueGenericProps<OptionType>) => (
    <components.MultiValueLabel {...props}>
      {props.data.icon && (
        <FontAwesomeIcon
          icon={props.data.icon}
          color={props.data.color}
          style={{ marginRight: 4 }}
        />
      )}
      {props.data.label}
    </components.MultiValueLabel>
  );

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
        components={{ Option, MultiValueLabel }}
        onChange={setSelectedOptions}
      />
    </div>
  );
};

export default FilterInput;
