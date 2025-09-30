import Icon from "./Icon";
import type { ReactNode } from "react";
import InputBox from './InputBox'

type DropdownProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
};

export default function Dropdown({ value, onChange, children, className }: DropdownProps) {
  return (
    <InputBox className={`${className || ''}`}>
      <div className='relative'>
        <select
          name="status"
          id="status"
          value={value}
          onChange={onChange}
          className="hide-select-icon w-full pr-8 input"
        >
          {children}
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
