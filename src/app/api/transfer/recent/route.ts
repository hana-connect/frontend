import { type NextRequest, NextResponse } from "next/server";
import type { RecentTransfersResponse } from "@/app/api/transfer/savings/types";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const targetAccountId = searchParams.get("targetAccountId");

    const targetAccountIdNumber = Number(targetAccountId);

    if (
      !targetAccountId ||
      !Number.isInteger(targetAccountIdNumber) ||
      targetAccountIdNumber <= 0
    ) {
      return NextResponse.json(
        { message: "유효한 targetAccountId가 필요합니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<ApiResponse<RecentTransfersResponse>>(
      `/api/transfer/recent?targetAccountId=${targetAccountIdNumber}`,
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
