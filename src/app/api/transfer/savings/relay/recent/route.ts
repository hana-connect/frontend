import type { NextRequest } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const targetAccountId = searchParams.get("targetAccountId");

  if (!targetAccountId) {
    return new Response(
      JSON.stringify({ message: "필수 파라미터가 없습니다." }),
      { status: 400 },
    );
  }

  const query = new URLSearchParams({ targetAccountId });

  const springRes = await bffFetch(
    `/api/transfer/savings/relay/recent?${query.toString()}`,
    {
      method: "GET",
    },
  );

  return toNextResponse(springRes);
}
