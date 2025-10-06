// src/hooks/useOtherIncome.ts
import { useEffect, useState } from "react";
import { getOtherIncome } from "../../services/otherIncomeService";
import axios from "axios";

let cachedData: any;

export default function useGetOtherIncome() {
    const [data, setData] = useState<Record<string, any>>(cachedData || {});
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getOtherIncome();
            cachedData = result; // update cache
            setData(result);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.code === "ERR_NETWORK") setError("Cannot connect to server.");
                else setError(err.response?.data?.message || "Something went wrong.");
            } else if (err instanceof Error) setError(err.message);
            else setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!cachedData) {
            fetchData();
        } else {
            setData(cachedData);
        }
    }, []);

    return { data, loading, error, refetch: fetchData };
}
