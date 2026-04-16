import { NextRequest } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { targetAccountId, amount, password, content } = body;

    if (
      !Number.isInteger(targetAccountId) ||
      targetAccountId <= 0 ||
      !Number.isInteger(amount) ||
      amount <= 0 ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      typeof content !== "string"
    ) {
      return new Response("요청값이 올바르지 않습니다.", { status: 400 });
    }

    return proxyJsonToSpring(
      new NextRequest(req.url, {
        method: "POST",
        headers: req.headers,
        body: JSON.stringify(body),
      }),
      {
        endpoint: "/api/transfer/savings",
        method: "POST",
      },
    );
  } catch (error) {
    // JSON 파싱 에러(클라이언트 잘못)인 경우 400 반환
    if (error instanceof SyntaxError) {
      return new Response("올바른 JSON 형식이 아닙니다.", { status: 400 });
    }

    // 진짜 서버 내부에서 터진 경우만 500 반환
    console.error("BFF 서버 에러:", error);
    return new Response("요청 처리 중 오류가 발생했습니다.", { status: 500 });
  }
}
