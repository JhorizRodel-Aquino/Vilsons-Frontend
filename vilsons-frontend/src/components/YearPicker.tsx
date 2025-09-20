import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

export default function YearPicker() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
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

  const toggleYearOverlay = () => {
    setIsYearOverlayOpen(!isYearOverlayOpen);
  };

  const selectYear = (year: number) => {
    setYear(year);
    setIsYearOverlayOpen(false);
  }

  // Generate a list of years from 2000 to current year
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  return (
    <div className="relative flex flex-col gap-y-2 gap-x-4 items-center filter-container w-[150px]">
      <div className="flex items-center justify-between">
        <input
          id="year"
          type="number"
          readOnly
          value={year}
          onFocus={(e) => e.target.select()}
          className="appearance-none rounded-[5px] focus:outline-none dark-calendar hide-spinner cursor-default caret-transparent w-full"
        />
        <button ref={(el) => { yearOverlayZoneRefs.current[0] = el }} onClick={toggleYearOverlay}><Icon name={'calendar'} size={14} /></button>
      </div>

      <div ref={(el) => { yearOverlayZoneRefs.current[1] = el }} className={`absolute bottom-0 translate-y-[97.5%] text-black bg-white p-3 w-full border-[1px] border-[#BFBFBF] ${isYearOverlayOpen ? 'block' : 'hidden'}`} >
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
    </div>



  );
}