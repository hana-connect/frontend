import { type NextRequest, NextResponse } from "next/server";

const SPRING_BASE_URL = process.env.SPRING_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { childId, quizSetId, questionOrder, selectedIndex } = body;

    if (
      !childId ||
      !quizSetId ||
      questionOrder === undefined ||
      selectedIndex === undefined
    ) {
      return NextResponse.json(
        { message: "필수 값이 누락되었습니다." },
        { status: 400 },
      );
    }

    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "인증 토큰이 없습니다." },
        { status: 401 },
      );
    }

    const springRes = await fetch(
      `${SPRING_BASE_URL}/api/quiz/${quizSetId}/questions/${questionOrder}/answer?childId=${childId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ selectedIndex }),
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
