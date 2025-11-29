import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useGetData from "./useGetData";

export type MonthYearParams = { month?: number, year?: number }

// Each route has its own cached states
const routeCache: Record<
    string,
    {
        prevSearchParams?: string;
        prevMonthYearParams?: MonthYearParams;
    }
> = {};

export default function useGetByMonthYear(route: string, noSearch: boolean = false) {
    // Initialize route cache
    if (!routeCache[route]) routeCache[route] = {prevSearchParams: "", prevMonthYearParams: undefined,};

    const routeState = routeCache[route];
    const monthYearToday: MonthYearParams = { year: +dayjs().format("YYYY"), month: +dayjs().format("MM") }
    const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>(monthYearToday);
    const [searchParams, setSearchParams] = useState<string>('');
    const [branchParams, setBranchParams] = useState<string>('');

    const params = { ...monthYearParams, ...(!noSearch && { search: searchParams }), branch: branchParams };
    const { data, loading, error, closeError, refetch, reload } = useGetData(route, params)


    // refetch when month-year params change
    useEffect(() => {
        const paramsChanged =
            JSON.stringify(monthYearParams) !== JSON.stringify(routeState.prevMonthYearParams);

        if (paramsChanged && Object.keys(monthYearParams).length > 0) {
            refetch();
            routeState.prevMonthYearParams = monthYearParams;
        }
    }, [monthYearParams]);

    // refetch date range params change
    useEffect(() => {
        const paramsChanged =
            searchParams !== routeState.prevSearchParams;

        if (paramsChanged) {
            refetch();
            routeState.prevSearchParams = searchParams;
        }
    }, [searchParams]);

    useEffect(() => {
        refetch();
    }, [branchParams]);

    return { data, loading, error, closeError, refetch, reload, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams };
}
