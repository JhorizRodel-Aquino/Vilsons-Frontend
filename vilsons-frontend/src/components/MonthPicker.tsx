import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

export default function MonthPicker() {
  const currentYear = new Date().getFullYear();
  // Generate a list of years from 2000 to current year
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentMonth = months[new Date().getMonth()];
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [monthYear, setMonthYear] = useState(`${currentMonth}, ${currentYear}`);
  const [isYearOverlayOpen, setIsYearOverlayOpen] = useState(false);
  const [isMonthOverlayOpen, setIsMonthOverlayOpen] = useState(false);

  const yearOverlayZoneRefs = useRef<(HTMLElement | null)[]>([]);
  const monthOverlayZoneRefs = useRef<(HTMLElement | null)[]>([]);

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
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = monthOverlayZoneRefs.current.some(
        (el) => el && el.contains(event.target as Node)
      );

      if (!clickedInside) setIsMonthOverlayOpen(false);

    }

    if (isMonthOverlayOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMonthOverlayOpen]);  

  useEffect(() => {
    setMonthYear(`${month}, ${year}`)
  }, [month, year])

  const toggleYearOverlay = () => {
    setIsYearOverlayOpen(!isYearOverlayOpen);
  };

  const toggleMonthOverlay = () => {
    setIsMonthOverlayOpen(!isMonthOverlayOpen);
  };

  const selectYear = (year: number) => {
    setYear(year);
    setIsYearOverlayOpen(false);
  }

  const selectMonth = (month: string) => {
    setMonth(month);
    setIsMonthOverlayOpen(false);
  }
  
  const selectMonthYear = (month: string, year:number) => {
    setMonth(month);
    setYear(year);
    setIsMonthOverlayOpen(false);
  }

  return (
    <div className="relative flex flex-col gap-y-2 gap-x-4 items-center filter-container w-[150px]">
      <div className="flex items-center justify-between">
        <input
          type="text"
          readOnly
          value={monthYear}
          onFocus={(e) => e.target.select()}   // auto-selects on focus
          className="appearance-none rounded-[5px] focus:outline-none dark-calendar hide-spinner cursor-default caret-transparent w-full"
        />
        <button ref={(el) => { monthOverlayZoneRefs.current[0] = el }} onClick={toggleMonthOverlay}><Icon name={'calendar'} size={14} /></button>
      </div>

      <div ref={(el) => { monthOverlayZoneRefs.current[1] = el }} className={`absolute bottom-0 translate-y-[97.5%] text-black bg-white w-full p-3 border-[1px] border-[#BFBFBF]  ${isMonthOverlayOpen ? 'block' : 'hidden'}`} >
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
                key={mo}
                onClick={() => selectMonth(mo)}
                className={`text-xs p-2 cursor-default rounded-xs hover:bg-[#b2d4ff] hover:border-black
                  ${mo === month && year === currentYear ? 'bg-[#0075ff] text-white border-2 border-black'
                      : mo === currentMonth && year === currentYear ? 'text-black border-[1px] border-black'
                        : 'text-black border-[1px] border-transparent'}
                `}
              >
                {mo}
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
    </div>



  );
}