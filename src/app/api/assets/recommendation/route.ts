import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function GET(req: NextRequest) {
  return await proxyJsonToSpring(req, {
    endpoint: "/api/assets/recommendation",
    method: "GET" as any,
  });
}
