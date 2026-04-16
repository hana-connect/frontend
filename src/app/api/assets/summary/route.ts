import { NextResponse } from "next/server";
import type { AssetSummary } from "@/app/(app)/asset-management/AssetManagementClientPage";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
export async function GET() {
  try {
    const res = await serverSpringFetch<AssetSummary>("/api/assets/summary", {
      method: "GET",
      cache: "no-store",
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error("Summary Fetch Error:", error);
    if (error instanceof SpringApiError) {
      return NextResponse.json(
        { message: error.message, data: error.data ?? null },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "시스템 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
