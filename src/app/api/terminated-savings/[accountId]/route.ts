import type { NextRequest } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> },
) {
  const { accountId } = await params;
  const { searchParams } = new URL(req.url);

  const rawPage = searchParams.get("page") || "0";
  const page = Number.isNaN(Number(rawPage)) ? "0" : rawPage;

  const senderId = searchParams.get("senderId");

  const queryParams = new URLSearchParams({ page });
  if (senderId) {
    queryParams.set("senderId", senderId);
  }

  const endpoint = `/api/accounts/terminated-savings/${encodeURIComponent(accountId)}?${queryParams.toString()}`;

  const springRes = await bffFetch(endpoint, { method: "GET" });
  return toNextResponse(springRes);
}
