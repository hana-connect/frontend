import { type NextRequest, NextResponse } from "next/server";
import type { QuizTodayResponse } from "@/app/api/quiz/types/quiz";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";

export async function GET(req: NextRequest) {
  try {
    const childId = req.nextUrl.searchParams.get("childId");

    if (!childId) {
      return NextResponse.json(
        { message: "childId는 필수입니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<QuizTodayResponse>(
      `/api/quiz/today?childId=${childId}`,
      {
        method: "GET",
        cache: "no-store",
        timeoutMs: 10000,
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof SpringApiError) {
      return NextResponse.json(
        { message: error.message, data: error.data ?? null },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
