export type ApiResponse<T> = {
  status: number;
  data: T;
  message: string;
};

export type ApiError = Error & {
  status?: number;
  data?: unknown;
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}
