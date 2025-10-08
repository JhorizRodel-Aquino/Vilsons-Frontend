import { useEffect, useState } from "react";
import { getData } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";

export type DateRangeParams = { startDate: string | '', endDate: string }

// let cachedData: any;

// Each route has its own cached states
const routeCache: Record<
    string,
    {
        cachedData?: any;
        prevSearchParams?: string;
        prevDateRangeParams: DateRangeParams
    }
> = {};

export default function useGetByDateRange(route: string) {
    // Initialize route cache
    if (!routeCache[route]) {
        routeCache[route] = {
            cachedData: undefined,
            prevSearchParams: "",
            prevDateRangeParams: { endDate: '', startDate: '' }
        };
    }

    const routeState = routeCache[route];

    const [data, setData] = useState<Record<string, any>>(routeState.cachedData || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dateRangeParams, setDateRangeParams] = useState<DateRangeParams>(routeState.prevDateRangeParams);
    const [searchParams, setSearchParams] = useState<string>('');

    const closeError = () => setError(null)

    const fetchData = async () => {
        try {
            const params = { ...dateRangeParams, search: searchParams }
            const result = await getData({ route, params });
            setData(result);
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };

    // initial load
    useEffect(() => {
        const loadCache = async () => {
            if (!routeState.cachedData) {
                setLoading(true);
                routeState.cachedData = await fetchData();
            }
            else setData(routeState.cachedData);
        }
        loadCache()
    }, []);

    // refetch date range params change
    useEffect(() => {
        fetchData();
    }, [dateRangeParams]);

    // refetch search params change
    useEffect(() => {
        const paramsChanged =
            searchParams !== routeState.prevSearchParams;

        if (paramsChanged) {
            fetchData();
            routeState.prevSearchParams = searchParams;
        }
    }, [searchParams]);

    return { data, loading, error, closeError, refetch: fetchData, searchParams, setSearchParams, dateRangeParams, setDateRangeParams };
}
