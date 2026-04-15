import { NextResponse } from "next/server";
import type { TransferExecuteResponse } from "@/app/api/transfer/type";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

type RouteContext = {
  params: Promise<{
    transferId: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { transferId } = await params;

    if (!transferId) {
      return NextResponse.json(
        { message: "transferId는 필수입니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<ApiResponse<TransferExecuteResponse>>(
      `/api/transfer/${transferId}`,
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
