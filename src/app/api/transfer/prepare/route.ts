import { type NextRequest, NextResponse } from "next/server";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import type { TransferPrepareResponse } from "../type";

export async function GET(req: NextRequest) {
  try {
    const accountId = req.nextUrl.searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json(
        { message: "accountId는 필수입니다." },
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
