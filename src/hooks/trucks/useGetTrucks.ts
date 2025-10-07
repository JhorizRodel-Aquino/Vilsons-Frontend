import { useEffect, useState } from "react";
import { getTrucks } from "../../services/trucksService";
import handleAxiosError from "../../utils/handleAxiosError";

export type DateRangeParams = { startDate: string, endDate: string }

let cachedData: any;
let prevDateRangeParams: DateRangeParams | undefined;

export default function useGetTrucks() {
    const [data, setData] = useState<Record<string, any>>(cachedData || {});
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState<string | null>(null);
    const [dateRangeParams, setDateRangeParams] = useState<DateRangeParams>({startDate: '', endDate: ''});

    const closeError = () => setError(null)

    const fetchData = async (params: DateRangeParams = dateRangeParams) => {
        setLoading(true);
        try {
            const result = await getTrucks(params);
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
      JSON.stringify(dateRangeParams) !== JSON.stringify(prevDateRangeParams);

    if (paramsChanged && Object.keys(dateRangeParams).length > 0) {
      prevDateRangeParams = dateRangeParams;
      fetchData(dateRangeParams);
    }
  }, [dateRangeParams]);

    return { data, loading, error, closeError, refetch: fetchData, dateRangeParams, setDateRangeParams };
}
