import { useState, useEffect } from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useRole, FloatingFocusManager, useInteractions } from "@floating-ui/react";
import Icon from "./Icon";
import InputBox from "./InputBox";


type YearPickerProps = {
  value?: string;
  onChange?: (year: string) => void; // notify parent
  minYear?: number;
  className?: string;
};

export default function YearPicker({ value, onChange, minYear = 2000, className }: YearPickerProps) {
  const [open, setOpen] = useState(false);

  // Setup floating-ui with positioning middlewares
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 6, crossAxis: 8 }), // add spacing between button and popover; mainAxis = vertical, crossAxis = horizontal
      flip(),    // flip to opposite side if not enough space
      shift(),   // shift into view if clipped
    ],
    placement: "bottom-end", // where it should appear by default
  });

  // Handle interactions (click to open/close, dismiss on outside click, etc.)
  const click = useClick(context);
  const dismiss = useDismiss(context, { ancestorScroll: true });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);


  const currentYear = String(new Date().getFullYear());

  // Generate a list of years from minimum year to current year
  const years = Array.from(
    { length: +currentYear - minYear + 1 },
    (_, i) => String(+currentYear - i)
  );

  const [year, setYear] = useState(value ?? currentYear);

  useEffect(() => {
    value && setYear(value)
  }, [value]);

  const selectYear = (year: string) => {
    !value && setYear(year);
    onChange?.(year);
    setOpen(false); // <-- close the popover when a year is clicked
  }

  return (
    <InputBox className={`w-[150px] ${className || ''}`}>
      <div className='input'>
        <div className="flex items-center justify-between">
          <input
            id="year"
            type="number"
            readOnly
            value={year}
            onFocus={(e) => e.target.select()}
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar hide-spinner cursor-default caret-transparent w-full"
          />
          {/* Trigger Button */}
          <button ref={refs.setReference} {...getReferenceProps()}><Icon name={'calendar'} size={14} /></button>
        </div>

        {/* Floating Popover */}
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='text-black bg-white p-3 w-[150px] border-[1px] border-[#BFBFBF] z-50' >
              <ul className="overflow-y-auto h-[150px] thin-scrollbar">
                {years.map((yr) => (
                  <li 
                    key={yr} 
                    onClick={() => selectYear(yr)}
                    className={`text-xs px-2 py-[3px] cursor-default rounded-xs hover:bg-[#b2d4ff] hover:border-black
                    ${yr === year ? 'bg-[#0075ff] text-white border-2 border-black' 
                      : yr === currentYear ? 'bg-[#EFEFEF] text-black border-[1px] border-black' 
                        : 'bg-[#EFEFEF] text-black border-b-[1px] border-b-gray-200 border-[1px] border-transparent'}
                    `} 
                  >
                    {yr}
                  </li>
                ))}
              </ul>

              <span className="flex justify-end items-center mt-5">
                <p 
                  className="text-xs text-[#2f7ed9] cursor-default border-[1px] 
                  border-transparent pt-[2px] hover:bg-[#b2d4ff] hover:border-black" 
                  onClick={() => selectYear(currentYear)}
                >
                  This year
                </p>
              </span>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </InputBox>


  );
}