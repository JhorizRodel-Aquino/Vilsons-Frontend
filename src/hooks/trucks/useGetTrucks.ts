import { useEffect, useState } from "react";
import { getTrucks } from "../../services/trucksService";
import handleAxiosError from "../../utils/handleAxiosError";

export type DateRangeParams = { startDate: string, endDate: string }

let cachedData: any;

export default function useGetTrucks() {
    const [data, setData] = useState<Record<string, any>>(cachedData || {});
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState<string | null>(null);
    const [dateRangeParams, setDateRangeParams] = useState<DateRangeParams>({startDate: '', endDate: ''});
    const [searchParams, setSearchParams] = useState<string>('');

    const closeError = () => setError(null)

    const fetchData = async () => {
        try {
            const params = {...dateRangeParams, search: searchParams}
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
    setLoading(true);
    if (!cachedData) fetchData();
    else setData(cachedData);
  }, []);

  // refetch when params change
  useEffect(() => {
      fetchData();
  }, [searchParams, dateRangeParams]);

    return { data, loading, error, closeError, refetch: fetchData, searchParams, setSearchParams, dateRangeParams, setDateRangeParams };
}
