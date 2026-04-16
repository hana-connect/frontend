import { NextResponse } from "next/server";
import type { AssetAIRecommendation } from "@/app/(app)/asset-management/AssetManagementClientPage";
import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";

export async function GET() {
  try {
    const res = await serverSpringFetch<AssetAIRecommendation>(
      "/api/assets/recommendation",
      {
        method: "GET",
        cache: "no-store",
      },
    );
    return NextResponse.json(res);
  } catch (_error) {
    return NextResponse.json({ error: "데이터 로드 실패" }, { status: 500 });
  }
}
