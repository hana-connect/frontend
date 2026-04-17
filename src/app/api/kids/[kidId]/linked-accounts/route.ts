import type { NextRequest } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ kidId: string }> },
) {
  const { kidId } = await params;
  const endpoint = `/api/kids/${encodeURIComponent(kidId)}/linked-accounts`;
  const springRes = await bffFetch(endpoint, { method: "GET" });
  return toNextResponse(springRes);
}
