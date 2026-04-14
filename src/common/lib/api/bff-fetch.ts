import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SPRING_BASE_URL = process.env.SPRING_BASE_URL!;
const DEFAULT_TIMEOUT_MS = 5000;
type BffFetchOptions = RequestInit & {
  timeoutMs?: number;
};

/**
 * BFF Route Handler 안에서 Spring으로 요청하는 공통 fetch
 * - 쿠키에서 accessToken 자동으로 꺼내서 Authorization 헤더에 주입
 * - 타임아웃, 에러 처리 공통화
 * */

export async function bffFetch(
  endpoint: string,
  options: BffFetchOptions = {},
): Promise<Response> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${SPRING_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...fetchOptions.headers,
      },
      cache: "no-store",
      signal: controller.signal,
    });
    return res;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { message: "요청 시간이 초과되었습니다." },
        { status: 504 },
      ) as unknown as Response;
    }
    if (error instanceof TypeError) {
      return NextResponse.json(
        { message: "서버에 연결할 수 없습니다." },
        { status: 502 },
      ) as unknown as Response;
    }
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    ) as unknown as Response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Spring 응답을 Next.js Response로 변환하는 헬퍼
 */
export async function toNextResponse(
  springRes: Response,
): Promise<NextResponse> {
  let data: unknown = null;
  try {
    data = await springRes.json();
  } catch {
    data = null;
  }
  if (!springRes.ok) {
    const errData = data as { message?: string } | null;
    return NextResponse.json(
      { message: errData?.message ?? "요청 실패" },
      { status: springRes.status },
    );
  }
  return NextResponse.json(data, { status: springRes.status });
}
