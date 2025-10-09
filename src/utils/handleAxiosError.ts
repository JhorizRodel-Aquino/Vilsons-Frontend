import axios from "axios";
import { toast } from "react-hot-toast";

export default function handleAxiosError(err: unknown): string | null {
  if (axios.isAxiosError(err)) {
    if (err.code === "ERR_NETWORK") {
      return "Cannot connect to server.";
    }

    if (err.response) {
      const { status, data } = err.response;

      switch (status) {
        case 404:
          return "Resource not found.";
        case 500:
          return "Server error. Please try again later.";
        default:
          toast.error(data?.message || "Something went wrong.")
          return null;
      }
    }

    return "Unexpected request error.";
  }

  if (err instanceof Error) return err.message;
  return "An unexpected error occurred.";
}