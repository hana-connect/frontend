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

    const transferIdNumber = Number(transferId);

    if (
      !transferId ||
      !Number.isInteger(transferIdNumber) ||
      transferIdNumber <= 0
    ) {
      return NextResponse.json(
        { message: "유효한 transferId가 필요합니다." },
        { status: 400 },
      );
    }

    const data = await serverSpringFetch<ApiResponse<TransferExecuteResponse>>(
      `/api/transfer/${transferIdNumber}`,
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
