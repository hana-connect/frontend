import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { accountId: string } },
) {
  const { accountId } = params;

  return proxyJsonToSpring(req, {
    endpoint: `/api/accounts/reward/${accountId}`,
    method: "PATCH",
  });
}
