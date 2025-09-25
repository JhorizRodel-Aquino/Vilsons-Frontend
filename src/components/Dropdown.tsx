import Icon from "./Icon";
import InputBox from "./InputBox";

type DropdownProps = {
  options: string[];
  value: string; // 👈 controlled value
  setValue: (value: string) => void;
  className?: string;
};

export default function Dropdown({ options, value, setValue, className }: DropdownProps) {
  return (
    <InputBox className={className || ""}>
      <div className="relative">
        <select
          name="status"
          id="status"
          value={value} // 👈 controlled
          onChange={(e) => setValue(e.target.value)}
          className="hide-select-icon w-full pr-8 filter-input"
        >
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="chev-down"
          color="dark"
          className="pointer-events-none absolute -mx-[5px] right-2 top-1/2 -translate-y-1/2 w-4 h-4"
        />
      </div>
    </InputBox>
  );
}
