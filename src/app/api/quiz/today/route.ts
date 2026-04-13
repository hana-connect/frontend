import { type NextRequest, NextResponse } from "next/server";

const SPRING_BASE_URL = process.env.SPRING_BASE_URL ?? "http://localhost:8080";

export async function GET(req: NextRequest) {
  try {
    const childId = req.nextUrl.searchParams.get("childId");

    if (!childId) {
      return NextResponse.json(
        { message: "childId는 필수입니다." },
        { status: 400 },
      );
    }

    const springRes = await fetch(
      `${SPRING_BASE_URL}/api/quiz/today?childId=${childId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const resultText = await springRes.text();

    return new NextResponse(resultText, {
      status: springRes.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
