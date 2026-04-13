// 문제 1개
export interface QuizQuestion {
  questionOrder: number;
  question: string;
  choices: string[];
  hint: string;

  // 상태
  status: "READY" | "CORRECT" | "WRONG";

  // 사용자가 이전에 선택한 값 (없으면 null)
  selectedIndex: number | null;
}

// 오늘 퀴즈 세트 조회
export interface QuizTodayResponse {
  quizSetId: number;
  quizDate: string;

  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

  solvedCount: number;
  totalCount: number;

  questions: QuizQuestion[];
}

// 답 제출 요청
export interface SubmitAnswerRequest {
  selectedIndex: number;
}

// 답 제출 응답
export interface SubmitAnswerResponse {
  questionOrder: number;

  isCorrect: boolean;
  questionStatus: "CORRECT" | "WRONG";

  selectedIndex: number;
  correctIndex: number;
  correctAnswer: string;

  solvedCount: number;

  quizSetStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  hasNextQuestion: boolean;
}
