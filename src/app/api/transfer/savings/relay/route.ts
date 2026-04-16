import { type NextRequest, NextResponse } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

export async function GET(req: NextRequest) {
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

  const endpoint = `/api/transfer/savings/relay?${queryParams.toString()}`;

  const springRes = await bffFetch(endpoint, { method: "GET" });
  return toNextResponse(springRes);
}
