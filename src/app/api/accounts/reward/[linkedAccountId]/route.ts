import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ linkedAccountId: string }> },
) {
  const { linkedAccountId } = await context.params;

  if (!linkedAccountId) {
    return NextResponse.json(
      { message: "linkedAccountId가 없습니다." },
      { status: 400 },
    );
  }

  return proxyJsonToSpring(req, {
    endpoint: `/api/accounts/reward/${linkedAccountId}`,
    method: "PATCH",
  });
}
