import { NextResponse } from "next/server";
import type { AssetSummary } from "@/app/(app)/asset-management/AssetManagementClientPage";
import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";

export async function GET() {
  try {
    const res = await serverSpringFetch<AssetSummary>("/api/assets/summary", {
      method: "GET",
      cache: "no-store",
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error("Summary Fetch Error:", error);
    return NextResponse.json(
      { message: "자산 정보를 가져오지 못했습니다." },
      { status: 500 },
    );
  }
}
