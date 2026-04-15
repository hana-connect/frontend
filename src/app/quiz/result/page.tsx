"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import type {
  QuizQuestion,
  QuizTodayResponse,
  SubmitAnswerResponse,
} from "@/app/api/quiz/types/quiz";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import QuizChoiceList from "@/common/components/quiz/QuizChoiceList";
import QuizQuestionCard from "@/common/components/quiz/QuizQuestionCard";

export default function QuizResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

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
  const [answerResult, setAnswerResult] = useState<SubmitAnswerResponse | null>(
    null,
  );

  useEffect(() => {
    const loadStoredResult = () => {
      const storedQuizToday = sessionStorage.getItem("quizToday");
      const storedCurrentQuestion = sessionStorage.getItem(
        "quizCurrentQuestion",
      );
      const storedAnswerResult = sessionStorage.getItem("quizAnswerResult");

      if (!storedQuizToday || !storedCurrentQuestion || !storedAnswerResult) {
        router.replace(childId ? `/quiz/play?childId=${childId}` : "/quiz");
        return;
      }

      try {
        const parsedQuizData: QuizTodayResponse = JSON.parse(storedQuizToday);
        const parsedCurrentQuestion: QuizQuestion = JSON.parse(
          storedCurrentQuestion,
        );
        const parsedAnswerResult: SubmitAnswerResponse =
          JSON.parse(storedAnswerResult);

        setQuizData(parsedQuizData);
        setCurrentQuestion(parsedCurrentQuestion);
        setAnswerResult(parsedAnswerResult);
      } catch (error) {
        console.error("퀴즈 결과 데이터 파싱 실패:", error);
        router.replace(childId ? `/quiz/play?childId=${childId}` : "/quiz");
      }
    };

    loadStoredResult();
  }, [router, childId]);

  const handleNext = () => {
    if (!quizData) {
      return;
    }

    const hasNextQuiz = quizData.solvedCount + 1 < quizData.totalCount;

    if (hasNextQuiz) {
      setOpen(true);
      return;
    }

    router.push(
      childId ? `/quiz/complete?childId=${childId}` : "/quiz/complete",
    );
  };

  const handleContinueQuiz = () => {
    setOpen(false);
    router.push(childId ? `/quiz/play?childId=${childId}` : "/quiz");
  };

  if (!quizData || !currentQuestion || !answerResult) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
        <Header type="sub" title="퀴즈 결과" />
        <main className="flex flex-1 items-center justify-center bg-[#FFFFFF]">
          <p className="text-[16px] font-medium text-grey-6">
            결과를 불러오는 중입니다...
          </p>
        </main>
      </div>
    );
  }

  const choices = currentQuestion.choices;
  const selectedIndex = answerResult.selectedIndex;
  const isCorrect = answerResult.isCorrect;
  const hasNextQuiz = quizData.solvedCount + 1 < quizData.totalCount;

  const quizBadgeText = `QUIZ ${String(currentQuestion.questionOrder).padStart(2, "0")}`;
  const questionText = currentQuestion.question;
  const correctChoiceText =
    currentQuestion.choices[answerResult.correctIndex] ?? "";

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
        <Header type="sub" title="퀴즈 결과" />

        <main className="flex flex-1 flex-col bg-[#FFFFFF]">
          <section className="flex flex-1 flex-col bg-[linear-gradient(180deg,#FFF3FF_0%,#F1F8FF_25%,#FFFFFF_50%)] px-5 pt-6 pb-6">
            <div className="relative mt-2">
              <Image
                src={
                  isCorrect
                    ? "/svg/quiz/ic_confetti.svg"
                    : "/svg/quiz/ic_rain.svg"
                }
                alt="결과 이미지"
                width={256}
                height={96}
                className={`absolute right-0 z-10 ${
                  isCorrect ? "top-[-60px]" : "top-[-20px]"
                } ${isCorrect ? "w-[290px]" : "w-[250px]"}`}
              />

              <div className="rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 pt-10 pb-6">
                <div className="relative flex items-center gap-3">
                  <div
                    className={`absolute bottom-[2px] left-0 h-6 w-[300px] ${
                      isCorrect ? "bg-fuchsia-100" : "bg-[#FDE2E4]"
                    }`}
                  />

                  {isCorrect ? (
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]">
                      <div className="h-4 w-4 rounded-full bg-white" />
                    </div>
                  ) : (
                    <Image
                      src="/svg/quiz/ic_quizx.svg"
                      alt="오답 아이콘"
                      width={40}
                      height={40}
                      className="relative z-10"
                    />
                  )}

                  <span className="relative z-10 text-[25px] font-bold leading-8 text-brand-black">
                    {isCorrect ? "정답이에요!" : "삐빅! 오답이에요"}
                  </span>
                </div>

                <p className="mt-8 text-[18px] font-medium leading-7 text-grey-6">
                  {isCorrect ? (
                    <>
                      정답을 맞추셨네요!!
                      <br />
                      연금계좌로 리워드가 적립되었습니다.
                      <br />
                      우리 아이를 정말 잘 알고 계시네요 😊
                    </>
                  ) : (
                    <>
                      아쉬워요 🥺
                      <br />
                      정답은 {correctChoiceText} 입니다.
                    </>
                  )}
                </p>
              </div>
            </div>

            <QuizQuestionCard
              quizBadgeText={quizBadgeText}
              questionText={questionText}
              muted
            />

            <QuizChoiceList
              choices={choices}
              selectedIndex={selectedIndex}
              disabled
              muted
              questionOrder={currentQuestion.questionOrder}
            />

            <div className="mt-auto pt-6">
              <Button
                size="L"
                variant="active"
                onClick={handleNext}
                className="h-14 rounded-[20px] text-[20px] font-semibold leading-6"
              >
                {hasNextQuiz ? "다음 퀴즈 풀기" : "퀴즈 끝내기"}
              </Button>
            </div>
          </section>
        </main>
      </div>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40" />

          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-[101] mx-auto w-full max-w-[375px] rounded-t-[32px] bg-[#FFFFFF] px-6 pt-8 pb-10 outline-none">
            <Drawer.Title className="text-[18px] font-bold leading-6 text-brand-black">
              다음 퀴즈를 진행하시겠습니까?
            </Drawer.Title>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-[86px] shrink-0">
                <Button
                  size="L"
                  variant="gray"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/quiz?childId=${childId}`);
                  }}
                  className="h-12 w-full text-[18px] font-medium"
                >
                  아니요
                </Button>
              </div>

              <div className="min-w-0 flex-1">
                <Button
                  size="L"
                  variant="active"
                  onClick={handleContinueQuiz}
                  className="h-12 w-full text-[18px] font-semibold"
                >
                  예
                </Button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
