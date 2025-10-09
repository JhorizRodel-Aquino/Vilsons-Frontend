import { useState } from "react";
import { post } from "../services/apiService";
import handleAxiosError from "../utils/handleAxiosError";
import { toast } from "react-hot-toast";

export default function usePostData(route: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeError = () => setError(null)

    const postData = async (formData: {}) => {
        try {
            const result = await post({ route, formData });
            console.log('result:', result)
            toast.success(result.message || 'Successful')
            return result
        } catch (err: unknown) {
            setError(handleAxiosError(err))
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, closeError, postData };
}
