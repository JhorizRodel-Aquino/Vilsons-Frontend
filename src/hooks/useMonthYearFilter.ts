import { useEffect, useState } from "react";
import dayjs from "dayjs";

type FilterParams = {
  year: number;
  month?: number;
};

export default function useMonthYearFilter(
  setMonthYearParams: (params: FilterParams) => void
) {
  const options = ["Monthly", "Yearly"];
  const today = dayjs();
  const [option, setOption] = useState(options[0]);
  const [monthYear, setMonthYear] = useState(today.format("YYYY-MM"));
  const [year, setYear] = useState(today.format("YYYY"));

  useEffect(() => {
    const [yr, mo] = monthYear.split("-");
    setMonthYearParams(option === "Monthly" ? { year: +yr, month: +mo } : { year: +year });
  }, [option, monthYear, year]);

  return {
    options,
    option,
    setOption,
    monthYear,
    setMonthYear,
    year,
    setYear,
  };
}
