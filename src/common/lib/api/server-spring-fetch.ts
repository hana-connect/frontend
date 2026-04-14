import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_TIMEOUT_MS, SPRING_BASE_URL } from "@/common/constants/api";

type ServerSpringFetchOptions = RequestInit & {
  timeoutMs?: number;
};

export class SpringApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "SpringApiError";
    this.status = status;
    this.data = data;
  }
}

export async function serverSpringFetch<T>(
  endpoint: string,
  options: ServerSpringFetchOptions = {},
): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${SPRING_BASE_URL}${endpoint}`, {
      ...rest,
      headers: {
        ...(rest.body ? { "Content-Type": "application/json" } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const err = data as { message?: string } | null;
      throw new SpringApiError(err?.message ?? "요청 실패", res.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof SpringApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new SpringApiError("요청 시간이 초과되었습니다.", 504);
    }

    if (error instanceof TypeError) {
      throw new SpringApiError("서버에 연결할 수 없습니다.", 502);
    }

    throw new SpringApiError("서버 오류가 발생했습니다.", 500);
  } finally {
    clearTimeout(timeoutId);
  }
}
