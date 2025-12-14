import { useEffect, useState } from "react";

interface PaymentDatePickerProps {
    onChange: (scheds: number[]) => void;
    value?: number[];
}

const PaymentDatePicker = ({ onChange, value = [] }: PaymentDatePickerProps) => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentSelection, setCurrentSelection] = useState<string>("1");

    // Generate day options 1-28 plus "End of Month"
    const dayOptions = [...Array(28)].map((_, i) => (i + 1).toString()).concat("End of Month");

    // Initialize from value prop
    useEffect(() => {
        if (value && value.length > 0) {
            const dateStrings = value.map(num => 
                num === 31 ? "End of Month" : num.toString()
            );
            setSelectedDates(dateStrings);
        }
    }, [value]);

    const addDate = () => {
        if (!selectedDates.includes(currentSelection)) {
            const newDates = [...selectedDates, currentSelection];
            setSelectedDates(newDates);
            // Convert to numbers and call onChange
            const formattedSchedules = newDates.map(date => 
                date === "End of Month" ? 31 : Number(date)
            );
            onChange(formattedSchedules);
        }
    };

    const removeDate = (date: string) => {
        const newDates = selectedDates.filter(d => d !== date);
        setSelectedDates(newDates);
        // Convert to numbers and call onChange
        const formattedSchedules = newDates.map(d => 
            d === "End of Month" ? 31 : Number(d)
        );
        onChange(formattedSchedules);
    };

    return (
        <div className="">
            <div className="flex gap-2">
                <select
                    className="bg-gray px-2 py-1 rounded-md flex-1"
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
                    className="bg-primary text-white px-2 py-1 rounded-md"
                    onClick={addDate}
                >
                    +
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
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
        </div>
    );
};

export default PaymentDatePicker;