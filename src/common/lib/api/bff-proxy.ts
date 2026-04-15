import { type NextRequest, NextResponse } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

type ProxyMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type ProxyJsonOptions = {
  endpoint: string;
  method: ProxyMethod;
};

export async function proxyJsonToSpring(
  req: NextRequest,
  { endpoint, method }: ProxyJsonOptions,
) {
  try {
    let body: string | undefined;

    if (method !== "DELETE") {
      const text = await req.text();
      body = text || undefined;
    }

    const springRes = await bffFetch(endpoint, {
      method,
      body,
    });

    return toNextResponse(springRes);
  } catch {
    return NextResponse.json(
      { message: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
