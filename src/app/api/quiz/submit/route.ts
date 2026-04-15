import { type NextRequest, NextResponse } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function POST(req: NextRequest) {
  try {
    const parsedBody = await req.json();
    const { childId, quizSetId, questionOrder, selectedIndex } = parsedBody;

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

    return proxyJsonToSpring(req, {
      endpoint: `/api/quiz/${quizSetId}/questions/${questionOrder}/answer?childId=${childId}`,
      method: "POST",
      body: { selectedIndex },
    });
  } catch (error) {
    console.error("퀴즈 답안 제출 BFF 오류:", error);

    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
