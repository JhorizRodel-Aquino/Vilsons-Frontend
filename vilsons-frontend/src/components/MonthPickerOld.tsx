export default function MonthPicker() {
  return (
    <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 items-end filter-container">
      <input id="month" type="month" name="month" min="2000-01" className="appearance-none rounded-[5px] focus:outline-none dark-calendar hide-calendar-clear" />
    </div>
  );
}
