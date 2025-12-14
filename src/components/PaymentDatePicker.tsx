import { useState } from "react";

const PaymentDatePicker = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("1");

  // Generate day options 1-28 plus "End of Month"
  const dayOptions = [...Array(28)].map((_, i) => (i + 1).toString()).concat("End of Month");

  const addDate = () => {
    if (!selectedDates.includes(currentSelection)) {
      setSelectedDates([...selectedDates, currentSelection]);
    }
  };

  const removeDate = (date: string) => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Select Payment Dates</h2>

      <div className="flex gap-2 mb-4">
        <select
          className="border px-2 py-1 rounded flex-1"
          value={currentSelection}
          onChange={(e) => setCurrentSelection(e.target.value)}
        >
          {dayOptions.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addDate}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedDates.map((date) => (
          <div
            key={date}
            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
          >
            {date}
            <button
              type="button"
              className="text-red-500 font-bold"
              onClick={() => removeDate(date)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <pre className="mt-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(selectedDates, null, 2)}
      </pre>
    </div>
  );
};

export default PaymentDatePicker;
