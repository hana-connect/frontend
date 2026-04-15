// src/app/api/assets/summary/route.ts
import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function GET(req: NextRequest) {
  return await proxyJsonToSpring(req, {
    endpoint: "/api/assets/summary",
    method: "GET" as any,
  });
}
