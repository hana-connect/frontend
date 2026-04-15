import type { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function POST(req: NextRequest) {
  return proxyJsonToSpring(req, {
    endpoint: "/api/transfer",
    method: "POST",
  });
}
