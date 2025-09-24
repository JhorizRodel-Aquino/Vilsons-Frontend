import { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useRole, FloatingFocusManager, useInteractions } from "@floating-ui/react";
import Icon from "./Icon";
import InputBox from "./InputBox";

type MonthYearPickerProps = {
  value?: string;
  onChange?: (monthYear: string) => void; // notify parent
  minYear?: number;
  className?: string;
};


export default function MonthYearPicker({ value, onChange, minYear = 2000, className }: MonthYearPickerProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 6, crossAxis: 8 }),
      flip(),  
      shift(),  
    ],
    placement: "bottom-end",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context,  { ancestorScroll: true });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);


  const currentYear = String(new Date().getFullYear());
  
  const years = Array.from(
    { length: +currentYear - minYear + 1 },
    (_, i) => String(+currentYear - i)
  );

  const months = [
    { name: "Jan", number: "01" },
    { name: "Feb", number: "02" },
    { name: "Mar", number: "03" },
    { name: "Apr", number: "04" },
    { name: "May", number: "05" },
    { name: "Jun", number: "06" },
    { name: "Jul", number: "07" },
    { name: "Aug", number: "08" },
    { name: "Sep", number: "09" },
    { name: "Oct", number: "10" },
    { name: "Nov", number: "11" },
    { name: "Dec", number: "12" },
  ];

  const formatDisplay = (value: string) => {
    const [yr, mo] = value.split("-");
    const found = months.find((m) => m.number === mo);
    return found ? `${found.name}, ${yr}` : value;
  };

  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex].number

  const [year, setYear] = useState(value ? value.split('-')[0] : currentYear);
  const [monthYear, setMonthYear] = useState(value ?? `${currentYear}-${currentMonth}`);
  const [isYearOverlayOpen, setIsYearOverlayOpen] = useState(false);

  const yearOverlayZoneRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = yearOverlayZoneRefs.current.some(
        (el) => el && el.contains(event.target as Node)
      );

      if (!clickedInside) setIsYearOverlayOpen(false);

    }

    if (isYearOverlayOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isYearOverlayOpen]);

  useEffect(() => {
    if (value) {
      setMonthYear(value);
      const [yr] = value.split('-')
      console.log(yr)
    }
  }, [value]);

  const selectYear = (year: string) => {
    setYear(year);
    setIsYearOverlayOpen(false);
  }

  const selectMonthYear = (month: string, year:string) => {
    !value && setMonthYear(`${year}-${month}`);
    onChange?.(`${year}-${month}`);
    setOpen(false);
  }
  
  const toggleYearOverlay = () => {
    setIsYearOverlayOpen(!isYearOverlayOpen);
  };

  return (
    <InputBox className={`w-[150px] ${className || ''}`}>
      <div className='filter-input'>
        <div className="flex items-center justify-between">
          <input
            type="text"
            readOnly
            value={formatDisplay(monthYear)}
            onFocus={(e) => e.target.select()}   // auto-selects on focus
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar hide-spinner cursor-default caret-transparent w-full"
          />
          <button ref={refs.setReference} {...getReferenceProps()} ><Icon name={'calendar'} size={14} /></button>
        </div>

       {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='text-black bg-white w-[150px] p-3 border-[1px] border-[#BFBFBF]' >
            <div ref={(el) => { yearOverlayZoneRefs.current[0] = el }} className="year-selection relative items-center bg-[#EFEFEF]">
              <input
                id="year"
                type="number"
                readOnly
                value={year}
                onClick={toggleYearOverlay}
                className="appearance-none focus:outline-none rounded-xs dark-calendar hide-spinner cursor-default caret-transparent w-full px-2 py-[3px] text-xs"
              />

              <ul className={`absolute top-0 overflow-y-auto h-[120px] thin-scrollbar mb-5 w-full bg-[#EFEFEF] ${isYearOverlayOpen ? 'block' : 'hidden'}`} >
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

            </div>

            <div className="month-selection">
              <ul className={`grid grid-cols-3`}>
                {months.map((mo) => (
                  <li
                    key={mo.number}
                    onClick={() => selectMonthYear(mo.number, year)}
                    className={`text-xs p-2 cursor-default rounded-xs hover:bg-[#b2d4ff] hover:border-black
                      ${`${year}-${mo.number}` === monthYear ? 'bg-[#0075ff] text-white border-2 border-black'
                          : mo.number === currentMonth && year === currentYear ? 'text-black border-[1px] border-black'
                            : 'text-black border-[1px] border-transparent'}
                    `}
                  >
                    {mo.name}
                  </li>
                ))}
              </ul>
            </div>

            <span className="flex justify-end items-center mt-5">
              <p
                className="text-xs text-[#2f7ed9] cursor-default border-[1px] 
                border-transparent pt-[2px] hover:bg-[#b2d4ff] hover:border-black"
                onClick={() => selectMonthYear(currentMonth, currentYear)}
              >
                This month
              </p>
            </span>
          </div>
        </FloatingFocusManager>
       )}
      </div>
    </InputBox>
  );
}