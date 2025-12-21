import { useEffect, useState } from "react";
import { get } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";

export type DateRangeParams = { startDate: string | '', endDate: string | '' }

// let cachedData: any;

// Each route has its own cached states
const cachedData: Record<string, any> = {};

export const invalidateCache = (key?: string) => {
    if (key) {
        delete cachedData[key];
    } else {
        // Clear ALL cache
        Object.keys(cachedData).forEach(k => delete cachedData[k]);
    }
};

export default function useGetData(route: string, params?: {}) {
    // Initialize route cache
    if (!cachedData[route]) cachedData[route] = undefined

    const [data, setData] = useState<Record<string, any>>(cachedData[route] || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [branchParams, setBranchParams] = useState<string>('');

    const closeError = () => setError(null)

    const fetchData = async () => {
        try {
            // const params = { ...dateRangeParams, search: searchParams }
            const result = await get({ route, params: { ...params, ...(branchParams ? { branch: branchParams } : {}) } });
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
            if (route === '/api/activity-logs' || route === '/api/approval-logs') {
                cachedData[route] = await fetchData();
            }
            else if (!cachedData[route]) {
                setLoading(true);
                cachedData[route] = await fetchData();
            }
            else setData(cachedData[route]);
        }
        loadCache()
    }, []);

    useEffect(() => {
        // Update data when cache changes
        console.log("CACHED:", cachedData);
    }, [cachedData]);

    useEffect(() => {
        const refetch = async () => await fetchData();
        refetch()
    }, [branchParams]);

    return { data, loading, error, closeError, refetch: fetchData, reload: async () => cachedData[route] = await fetchData(), branchParams, setBranchParams };
}
