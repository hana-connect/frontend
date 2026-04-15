import { type NextRequest, NextResponse } from "next/server";
import type { TerminatedDetailData } from "@/app/(app)/wallet/saving-letter/[accountId]/_types";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> },
) {
  try {
    const { accountId } = await params;
    const { searchParams } = new URL(req.url);

    const rawPage = searchParams.get("page") || "0";
    const page = Number.isNaN(Number(rawPage)) ? "0" : rawPage;

    const senderId = searchParams.get("senderId");

    const queryParams = new URLSearchParams({ page });
    if (senderId) {
      queryParams.set("senderId", senderId);
    }

    const url = `/api/accounts/terminated-savings/${encodeURIComponent(accountId)}?${queryParams.toString()}`;

    const data = await serverSpringFetch<ApiResponse<TerminatedDetailData>>(
      url,
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
