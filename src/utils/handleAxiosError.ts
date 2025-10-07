import axios from "axios";

export default function handleAxiosError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === "ERR_NETWORK") {
      return "Cannot connect to server.";
    }

    if (err.response) {
      const { status, data } = err.response;

      switch (status) {
        case 400:
          return "Bad request. Please check your input.";
        case 404:
          return "Resource not found.";
        case 500:
          return "Server error. Please try again later.";
        default:
          return data?.message || "Something went wrong.";
      }
    }

    return "Unexpected request error.";
  }

  if (err instanceof Error) return err.message;
  return "An unexpected error occurred.";
}