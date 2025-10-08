import InputBox from './InputBox';

type DateRange = {
  startDate: string;
  endDate: string;
};

let monthYear = { startMonthYear: '', endMonthYear: '' }

export default function DateRange({ dateRange, setDateRange }: { dateRange: DateRange, setDateRange: (dateRange: DateRange) => void }) {
  const handleChange = (key: "startDate" | "endDate", value: string) => {
    const currentDate = key === "startDate" ? dateRange.startDate : dateRange.endDate;
    const currentDay = currentDate.slice(-2);
    const currentMonthYear = currentDate.slice(0, 7);
    const newDay = value.slice(-2);
    const newMonthYear = value.slice(0, 7);

    if (key === "startDate") {
      if (newMonthYear !== monthYear.startMonthYear && !monthYear.startMonthYear) {
        currentDay !== newDay && setDateRange({ ...dateRange, startDate: value })
        monthYear = { ...monthYear, startMonthYear: newMonthYear }
      }
      else if (currentMonthYear !== monthYear.startMonthYear) setDateRange({ ...dateRange, startDate: value })
      else currentDay !== newDay && setDateRange({ ...dateRange, startDate: value })
    } 
    
    else {
      if (newMonthYear !== monthYear.endMonthYear) {
        currentDay !== newDay && setDateRange({ ...dateRange, endDate: value })
        monthYear = { ...monthYear, endMonthYear: newMonthYear }
      }
      else if (currentMonthYear !== monthYear.endMonthYear) setDateRange({ ...dateRange, endDate: value })
      else currentDay !== newDay && setDateRange({ ...dateRange, endDate: value })
    }
  };

  return (
    <InputBox>
      <div className="flex flex-row gap-y-2 gap-x-4 items-end input">
        <div className="flex items-center gap-2">
          <span>From:</span>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            min="2000-01-01"
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar"
            value={dateRange.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}

          />
        </div>

        <div className="flex items-center gap-2">
          <span>To:</span>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            min="2000-01-01"
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar"
            value={dateRange.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
      </div>
    </InputBox>
  );
}