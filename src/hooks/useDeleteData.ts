import { useState } from "react";
import { remove } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";
import { toast } from "react-hot-toast";

export default function useDeleteData(route: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeError = () => setError(null)

    const deleteData = async (id?: string, formData?: {}) => {
        setLoading(true);
        try {
            const result = await remove({ route: `${route}/${id}`, formData });
            console.log('result:', result)
            toast.success(result.message || 'Deleted successfully')
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, closeError, deleteData };
}
