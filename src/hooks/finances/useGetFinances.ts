import { useEffect, useState } from "react";
import { getFinances } from "../../services/financesService";
import axios from "axios";

export type MonthYearParams = { month?: number, year?: number }

let cachedData: any;
let prevMonthYearParams: MonthYearParams | undefined;

export default function useGetFinances() {
  const [data, setData] = useState<Record<string, any>>(cachedData || {});
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);
  const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>({});

  const fetchData = async (params: MonthYearParams = monthYearParams) => {
    setLoading(true);
    try {
      const result = await getFinances(params);
      setData(result);
      cachedData = result;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") setError("Cannot connect to server.");
        else setError(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (!cachedData) fetchData();
    else setData(cachedData);
  }, []);

  // refetch when params change
  useEffect(() => {
    const paramsChanged =
      JSON.stringify(monthYearParams) !== JSON.stringify(prevMonthYearParams);

    if (paramsChanged && Object.keys(monthYearParams).length > 0) {
      prevMonthYearParams = monthYearParams;
      fetchData(monthYearParams);
    }
  }, [monthYearParams]);

  return { data, loading, error, refetch: fetchData, setMonthYearParams };
}
