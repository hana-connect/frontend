import { type NextRequest, NextResponse } from "next/server";
import type { RelayData } from "@/app/(app)/saving/_types";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetAccountId = searchParams.get("targetAccountId");
    const page = searchParams.get("page") || "0";

    if (!targetAccountId) {
      return NextResponse.json(
        { message: "targetAccountId는 필수입니다." },
        { status: 400 },
      );
    }

    const queryParams = new URLSearchParams({
      targetAccountId,
      page,
    });

    const data = await serverSpringFetch<ApiResponse<RelayData>>(
      `/api/transfer/savings/relay?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
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
