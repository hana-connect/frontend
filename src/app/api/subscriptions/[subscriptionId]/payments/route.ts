import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

type RouteContext = {
  params: Promise<{
    subscriptionId: string;
  }>;
};

export async function POST(req: NextRequest, { params }: RouteContext) {
  const { subscriptionId } = await params;

  const subscriptionIdNumber = Number(subscriptionId);

  if (
    !subscriptionId ||
    !Number.isInteger(subscriptionIdNumber) ||
    subscriptionIdNumber <= 0
  ) {
    return new Response("유효한 subscriptionId가 필요합니다.", { status: 400 });
  }

  return proxyJsonToSpring(req, {
    endpoint: `/api/subscriptions/${subscriptionIdNumber}/payments`,
    method: "POST",
  });
}
