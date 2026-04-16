import { type NextRequest, NextResponse } from "next/server";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import type { TransferPrepareResponse } from "../type";

export async function GET(req: NextRequest) {
  try {
    const accountIdParam = req.nextUrl.searchParams.get("accountId");

    const accountId = Number(accountIdParam);

    if (!accountIdParam || !Number.isInteger(accountId) || accountId <= 0) {
      return NextResponse.json(
        { message: "유효한 accountId가 필요합니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<ApiResponse<TransferPrepareResponse>>(
      `/api/transfer/prepare?accountId=${accountId}`,
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
