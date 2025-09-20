function DateRange() {
  return (
    <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 items-end filter-container">
      <div className="flex items-center gap-2">
        <span>From:</span>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          min="2000-01-01"
          className="appearance-none rounded-[5px] focus:outline-none dark-calendar"
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
        />
      </div>
    </div>
  );
}

export default DateRange;
