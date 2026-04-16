import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

type RouteContext = {
  params: Promise<{
    kidId: string;
  }>;
};

export async function POST(req: NextRequest, { params }: RouteContext) {
  const { kidId } = await params;

  return proxyJsonToSpring(req, {
    endpoint: `/api/kids/${kidId}/accounts`,
    method: "POST",
  });
}
