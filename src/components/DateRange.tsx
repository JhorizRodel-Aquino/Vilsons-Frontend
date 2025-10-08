import InputBox from './InputBox';

type DateRange = {
  startDate: string;
  endDate: string;
};

export default function DateRange({ dateRange, setDateRange }: { dateRange: DateRange, setDateRange: (dateRange: DateRange) => void }) {
  return (
    <InputBox>
      <div className="flex flex-row gap-y-2 gap-x-4 items-end input">
        <div className="flex items-center gap-2">
          <span>From:</span>
          <input
            type="date"
            id="startDate"
            name="startDate"
            min="2000-01-01"
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}

          />
        </div>

        <div className="flex items-center gap-2">
          <span>To:</span>
          <input
            type="date"
            id="endDate"
            name="endDate"
            min="2000-01-01"
            className="appearance-none rounded-[5px] focus:outline-none dark-calendar"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
      </div>
    </InputBox>
  );
}