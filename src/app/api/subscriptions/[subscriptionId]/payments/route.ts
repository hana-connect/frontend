import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

type RouteContext = {
  params: Promise<{
    subscriptionId: string;
  }>;
};

export async function POST(req: NextRequest, { params }: RouteContext) {
  const { subscriptionId } = await params;

  return proxyJsonToSpring(req, {
    endpoint: `/api/subscriptions/${subscriptionId}/payments`,
    method: "POST",
  });
}
