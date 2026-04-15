import { type NextRequest, NextResponse } from "next/server";
import { bffFetch, toNextResponse } from "@/common/lib/api/bff-fetch";

type ProxyMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type ProxyJsonOptions = {
  endpoint: string;
  method: ProxyMethod;
  body?: unknown;
};

export async function proxyJsonToSpring(
  req: NextRequest,
  { endpoint, method, body }: ProxyJsonOptions,
) {
  try {
    let requestBody: string | undefined;

    if (method !== "DELETE") {
      if (body !== undefined) {
        requestBody = JSON.stringify(body);
      } else {
        const text = await req.text();
        requestBody = text || undefined;
      }
    }

    const springRes = await bffFetch(endpoint, {
      method,
      body: requestBody,
    });

    return toNextResponse(springRes);
  } catch (error) {
    console.error("proxyJsonToSpring 오류:", error);

    return NextResponse.json(
      { message: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
