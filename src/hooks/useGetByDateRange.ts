import { useEffect, useState } from "react";
import useGetData from "./useGetData";

export type DateRangeParams = { startDate: string | '', endDate: string }

// Each route has its own cached states
const routeCache: Record<
    string,
    {
        prevSearchParams?: string;
        prevDateRangeParams: DateRangeParams
    }
> = {};

export default function useGetByDateRange(route: string) {
    // Initialize route cache
    if (!routeCache[route]) routeCache[route] = {prevSearchParams: "", prevDateRangeParams: { endDate: '', startDate: '' }};
    
    const routeState = routeCache[route];
    const [dateRangeParams, setDateRangeParams] = useState<DateRangeParams>(routeState.prevDateRangeParams);
    const [searchParams, setSearchParams] = useState<string>('');
    const [statusParams, setStatusParams] = useState<string>('');
    const [branchParams, setBranchParams] = useState<string>('');

    const params = { ...dateRangeParams, search: searchParams, status: statusParams, branch: branchParams };
    const { data, loading, error, closeError, refetch, reload } = useGetData(route, params)

    // refetch date range params change
    useEffect(() => {
        refetch();
    }, [dateRangeParams, statusParams, branchParams]);

    // refetch search params change
    useEffect(() => {
        const paramsChanged =
            searchParams !== routeState.prevSearchParams;

        if (paramsChanged) {
            refetch();
            routeState.prevSearchParams = searchParams;
        }
    }, [searchParams]);

    return { data, loading, error, closeError, refetch, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, statusParams, setStatusParams, branchParams, setBranchParams };
}
