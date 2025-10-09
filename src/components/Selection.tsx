import Icon from "./Icon";
import InputBox from "./InputBox";

export type SelectionOptions = {value: string, label: string}

type SelectionProps = {
  options?: SelectionOptions[];
  value?: string; // 👈 controlled value
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export default function Selection({ options, value, onChange, className }: SelectionProps) {
  return (
    <InputBox className={className || ""}>
      <div className="relative">
        <select
          name="status"
          id="status"
          value={value} // 👈 controlled
          onChange={onChange}
          className="hide-select-icon w-full pr-8 input capitalize"
        >
          {options?.map((option, i) => (
            <option key={i} value={option.value} className="capitalize">
              {option.label}
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
