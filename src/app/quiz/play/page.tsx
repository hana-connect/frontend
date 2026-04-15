"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTodayQuiz, submitQuizAnswer } from "@/app/api/quiz/quiz";
import type {
  QuizQuestion,
  QuizTodayResponse,
  SubmitAnswerResponse,
} from "@/app/api/quiz/types/quiz";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import QuizChoiceList from "@/common/components/quiz/QuizChoiceList";
import QuizQuestionCard from "@/common/components/quiz/QuizQuestionCard";
import { cn } from "@/common/lib/utils";

export default function QuizPlayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const childIdParam = searchParams.get("childId");
  const childId =
    childIdParam &&
    Number.isInteger(Number(childIdParam)) &&
    Number(childIdParam) > 0
      ? Number(childIdParam)
      : null;

  const [quizData, setQuizData] = useState<QuizTodayResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveQuizResult = (
    quiz: QuizTodayResponse,
    question: QuizQuestion,
    answer: SubmitAnswerResponse,
  ) => {
    sessionStorage.setItem("quizToday", JSON.stringify(quiz));
    sessionStorage.setItem("quizCurrentQuestion", JSON.stringify(question));
    sessionStorage.setItem("quizAnswerResult", JSON.stringify(answer));
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!childId) {
          alert("선택된 자녀 정보가 없습니다.");
          router.replace("/quiz");
          return;
        }

        const data = await getTodayQuiz(childId);
        const nextQuestion =
          data.questions.find((question) => question.status === "READY") ??
          null;

        if (!nextQuestion) {
          router.replace(`/quiz/complete?childId=${childId}`);
          return;
        }

        setQuizData(data);
        setCurrentQuestion(nextQuestion);
        setSelectedIndex(null);
        setShowHint(false);
      } catch (error) {
        console.error("퀴즈 조회 실패:", error);
        alert("퀴즈 정보를 불러오지 못했습니다. 다시 시도해주세요.");
      }
    };

    fetchQuiz();
  }, [router, childId]);

  const handleSubmitAnswer = async () => {
    if (!childId || !quizData || !currentQuestion || selectedIndex === null) {
      return;
    }

    try {
      setIsSubmitting(true);

      const answerResult = await submitQuizAnswer({
        childId,
        quizSetId: quizData.quizSetId,
        questionOrder: currentQuestion.questionOrder,
        body: {
          selectedIndex,
        },
      });

      saveQuizResult(quizData, currentQuestion, answerResult);
      router.push(`/quiz/result?childId=${childId}`);
    } catch (error) {
      console.error("답 제출 실패:", error);
      alert("정답 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quizData || !currentQuestion) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
        <Header type="sub" title="퀴즈 풀기" />
        <main className="flex flex-1 items-center justify-center bg-[#FFFFFF]">
          <p className="text-[16px] font-medium text-grey-6">
            퀴즈를 불러오는 중입니다...
          </p>
        </main>
      </div>
    );
  }

  const choices = currentQuestion.choices;
  const progressText = `${quizData.solvedCount + 1}/${quizData.totalCount}`;
  const quizBadgeText = `QUIZ ${String(currentQuestion.questionOrder).padStart(2, "0")}`;
  const questionText = currentQuestion.question;
  const hintText = currentQuestion.hint;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
      <Header type="sub" title="퀴즈 풀기" />

      <main className="flex flex-1 flex-col bg-[#FFFFFF]">
        <section className="flex flex-1 flex-col bg-[linear-gradient(180deg,#FFF3FF_0%,#F1F8FF_25%,#FFFFFF_50%)] px-5 pt-6 pb-6">
          <QuizQuestionCard
            quizBadgeText={quizBadgeText}
            questionText={questionText}
            progressText={progressText}
          />

          <QuizChoiceList
            choices={choices}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            questionOrder={currentQuestion.questionOrder}
          />

          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            aria-expanded={showHint}
            aria-controls="quiz-hint-content"
            className="mt-6 w-full rounded bg-grey-9 px-5 py-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[7px]">
                <Image
                  src="/svg/ic_speech_bubble.svg"
                  alt="힌트 아이콘"
                  width={23}
                  height={23}
                  className="h-[23px] w-[23px]"
                />
                <span className="text-[16px] font-bold leading-6 text-brand-black">
                  힌트보기
                </span>
              </div>

              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 text-grey-2 transition-transform duration-200",
                  showHint ? "rotate-0" : "rotate-180",
                )}
              />
            </div>

            {showHint && (
              <p
                id="quiz-hint-content"
                className="mt-4 text-[18px] font-medium leading-6 text-grey-2"
              >
                {hintText}
              </p>
            )}
          </button>

          <div className="mt-auto pt-6">
            <Button
              size="L"
              variant={
                selectedIndex !== null && !isSubmitting ? "active" : "disabled"
              }
              disabled={selectedIndex === null || isSubmitting}
              onClick={handleSubmitAnswer}
              className="h-14 rounded-[20px] text-[20px] font-semibold leading-6"
            >
              {isSubmitting ? "제출 중..." : "정답 제출"}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
