import { type NextRequest, NextResponse } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

// GET /api/wallet  →  Spring GET /api/wallet/{memberId}
export async function GET(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json(
      { message: "memberId는 필수입니다." },
      { status: 400 },
    );
  }

  const springRes = await bffFetch(`/api/wallet/${memberId}`, {
    method: "GET",
  });

  return toNextResponse(springRes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const springRes = await bffFetch("/api/wallet/transfer", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return toNextResponse(springRes);
}
