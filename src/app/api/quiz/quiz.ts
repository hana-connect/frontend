import type {
  QuizTodayResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from "./types/quiz";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

// 오늘 퀴즈 조회
export const getTodayQuiz = async (childId: number) => {
  const res = await fetch(`/api/quiz/today?childId=${childId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("퀴즈 조회 실패", res.status, errorText);
    throw new Error(`퀴즈 조회 실패 (${res.status})`);
  }

  const result: ApiResponse<QuizTodayResponse> = await res.json();
  return result.data;
};

// 답 제출
export const submitQuizAnswer = async ({
  childId,
  quizSetId,
  questionOrder,
  body,
}: {
  childId: number;
  quizSetId: number;
  questionOrder: number;
  body: SubmitAnswerRequest;
}) => {
  const res = await fetch(`/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      childId,
      quizSetId,
      questionOrder,
      selectedIndex: body.selectedIndex,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("답 제출 실패", res.status, errorText);
    throw new Error(`답 제출 실패 (${res.status})`);
  }

  const result: ApiResponse<SubmitAnswerResponse> = await res.json();
  return result.data;
};
