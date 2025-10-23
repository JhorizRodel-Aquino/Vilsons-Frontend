import { useState } from "react";
import { get } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";

export type DateRangeParams = { startDate: string | '', endDate: string | '' }

// let cachedData: any;

// Each route has its own cached states
const cachedData: Record<string, any> = {};

export default function useGetDataWithTrigger(route: string, params?: {}) {
    // Initialize route cache
    if (!cachedData[route]) cachedData[route] = undefined
    
    const [data, setData] = useState<Record<string, any>>(cachedData[route] || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeError = () => setError(null)

    const fetchData = async () => {
        try {
            // const params = { ...dateRangeParams, search: searchParams }
            const result = await get({ route, params });
            setData(result);
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };


    return { data, loading, error, closeError, refetch: fetchData, reload: async() => cachedData[route] = await fetchData()};
}
