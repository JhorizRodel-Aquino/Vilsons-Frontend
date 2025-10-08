import { useEffect, useState } from "react";
import { getMaterialExpenses } from "../../services/materialExpensesService";
import handleAxiosError from "../../utils/handleAxiosError";
import dayjs from "dayjs";

export type MonthYearParams = { month?: number, year?: number }

let cachedData: any;
let prevMonthYearParams: MonthYearParams | undefined;

export default function useGetMaterialExpenses() {
  const [data, setData] = useState<Record<string, any>>(cachedData || {});
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);
  const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>({month: +dayjs().format("MM"), year: +dayjs().format("YYYY")});
  const [searchParams, setSearchParams] = useState<string>('');

  const closeError = () => setError(null)

  const fetchData = async () => {
    try {
      const params = { ...monthYearParams, search: searchParams }
      const result = await getMaterialExpenses(params);
      cachedData = result; // update cache
      setData(result);
    } catch (err: unknown) {
      setError(handleAxiosError(err))
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (!cachedData) {
      setLoading(true);
      fetchData();
    }
    else setData(cachedData);
  }, []);

  // refetch when params change
  useEffect(() => {
    const paramsChanged =
      JSON.stringify(monthYearParams) !== JSON.stringify(prevMonthYearParams);

    if (paramsChanged && Object.keys(monthYearParams).length > 0) {
      prevMonthYearParams = monthYearParams;
      fetchData();
    }
  }, [monthYearParams]);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return { data, loading, error, closeError, refetch: fetchData, setMonthYearParams, searchParams, setSearchParams };
}
