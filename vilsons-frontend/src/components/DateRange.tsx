function DateRange() {
  return (
    <div className="flex gap-4 items-center filter-container">
      <div className="">
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          className="rounded-[5px] bg-gray px-2 py-1 text-dark placeholder:text-dark focus:outline-none"
        />
      </div>

      <div className="">
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          className="rounded-[5px] bg-gray px-2 py-1 text-dark placeholder:text-dark focus:outline-none"
        />
      </div>
    </div>
  );
}

export default DateRange;