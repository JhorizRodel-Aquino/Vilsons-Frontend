import { useState } from "react";
import { post, put } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";
import { toast } from "react-hot-toast";

export default function usePostPutData(route: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeError = () => setError(null)

    const postData = async (formData: {}, specify: string = "") => {
        setLoading(true);
        try {
            const result = await post({ route: `${route}/${specify}`, formData });
            console.log('result:', result)
            toast.success(result.message || 'Successful')
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };

    const putData = async (id?: string, formData?: {}) => {
        setLoading(true);
        try {
            const result = await put({ route: `${route}/${id}`, formData });
            console.log('result:', result)
            toast.success(result.message || 'Edited successfully')
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, closeError, postData, putData };
}
