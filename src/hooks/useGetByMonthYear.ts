import { useEffect, useState } from "react";
import { getData } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";
import dayjs from "dayjs";

export type MonthYearParams = { month?: number, year?: number }

// let cachedData: any;
// let prevMonthYearParams: MonthYearParams | undefined;
// let prevSearchParams: string = '';


// Each route has its own cached states
const routeCache: Record<
    string,
    {
        cachedData?: any;
        prevSearchParams?: string;
        prevMonthYearParams?: MonthYearParams;
    }
> = {};

export default function useGetByMonthYear(route: string, noSearch: boolean = false) {
    // Initialize route cache
    if (!routeCache[route]) {
        routeCache[route] = {
            cachedData: undefined,
            prevSearchParams: "",
            prevMonthYearParams: undefined,
        };
    }

    const routeState = routeCache[route];
    const monthYearToday: MonthYearParams = { year: +dayjs().format("YYYY"), month: +dayjs().format("MM") }

    const [data, setData] = useState<Record<string, any>>(routeState.cachedData || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>(monthYearToday);
    const [searchParams, setSearchParams] = useState<string>('');

    const closeError = () => setError(null)

    const fetchData = async () => {
        try {
            const params = { ...monthYearParams, ...(!noSearch && { search: searchParams }) }
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

    // refetch when month-year params change
    useEffect(() => {
        const paramsChanged =
            JSON.stringify(monthYearParams) !== JSON.stringify(routeState.prevMonthYearParams);

        if (paramsChanged && Object.keys(monthYearParams).length > 0) {
            fetchData();
            routeState.prevMonthYearParams = monthYearParams;
        }
    }, [monthYearParams]);

    // refetch date range params change
    useEffect(() => {
        const paramsChanged =
            searchParams !== routeState.prevSearchParams;

        if (paramsChanged) {
            fetchData();
            routeState.prevSearchParams = searchParams;
        }
    }, [searchParams]);

    return { data, loading, error, closeError, refetch: fetchData, searchParams, setSearchParams, setMonthYearParams };
}
