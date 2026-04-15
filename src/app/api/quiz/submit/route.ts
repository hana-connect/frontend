import { type NextRequest, NextResponse } from "next/server";
import { proxyJsonToSpring } from "@/common/lib/api/bff-proxy";

export async function POST(req: NextRequest) {
  try {
    const parsedBody = await req.json();

    const childId = Number(parsedBody.childId);
    const quizSetId = Number(parsedBody.quizSetId);
    const questionOrder = Number(parsedBody.questionOrder);
    const selectedIndex = Number(parsedBody.selectedIndex);

    if (
      !Number.isInteger(childId) ||
      childId <= 0 ||
      !Number.isInteger(quizSetId) ||
      quizSetId <= 0 ||
      !Number.isInteger(questionOrder) ||
      questionOrder < 0 ||
      !Number.isInteger(selectedIndex) ||
      selectedIndex < 0
    ) {
      return NextResponse.json(
        { message: "잘못된 요청 값입니다." },
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
