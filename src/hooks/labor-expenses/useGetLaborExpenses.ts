import { useEffect, useState } from "react";
import { getLaborExpenses } from "../../services/laborExpensesService";
import handleAxiosError from "../../utils/handleAxiosError";

export type MonthYearParams = { month?: number, year?: number }

let cachedData: any;
let prevMonthYearParams: MonthYearParams | undefined;

export default function useGetLaborExpenses() {
    const [data, setData] = useState<Record<string, any>>(cachedData || {});
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState<string | null>(null);
    const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>({month: +dayjs().format("MM"), year: +dayjs().format("YYYY")});

    const closeError = () => setError(null)

    const fetchData = async (params: MonthYearParams = monthYearParams) => {
        setLoading(true);
        try {
            const result = await getLaborExpenses(params);
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

    return { data, loading, error, closeError, refetch: fetchData, setMonthYearParams };
}
