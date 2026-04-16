"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getTodayQuiz } from "@/app/api/quiz/quiz";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";

export default function QuizStartPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const childIdParam = searchParams.get("kidId");
  const childId =
    childIdParam &&
    Number.isInteger(Number(childIdParam)) &&
    Number(childIdParam) > 0
      ? Number(childIdParam)
      : null;

  const handleStartQuiz = async () => {
    try {
      setIsLoading(true);

      if (!childId) {
        alert("선택된 자녀 정보가 없습니다.");
        return;
      }

      const quizData = await getTodayQuiz(childId);

      const isQuizCompleted = quizData.solvedCount >= quizData.totalCount;
      const hasReadyQuestion = quizData.questions.some(
        (question) => question.status === "READY",
      );

      if (isQuizCompleted || !hasReadyQuestion) {
        router.push(`/quiz/complete?childId=${childId}`);
        return;
      }

      router.push(`/quiz/play?childId=${childId}`);
    } catch (error) {
      console.error("퀴즈 시작 처리 실패:", error);
      alert("퀴즈 정보를 불러오지 못했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
      <Header type="sub" title="퀴즈" />

      <main className="flex flex-1 flex-col bg-[#FFFFFF]">
        <section className="flex flex-1 flex-col px-[22px] pt-4 pb-8">
          <div className="mt-[6px]">
            <h1 className="text-2xl font-semibold leading-9 text-black">
              우리 아이 퀴즈
            </h1>

            <p className="mt-[2px] text-base font-medium leading-6 text-black">
              아이의 활동을 퀴즈로 맞혀보세요 😊
            </p>
          </div>

          <div className="mt-[40px] flex h-[256px] flex-col items-center justify-center rounded-2xl bg-violet-50 px-[56px]">
            <p className="text-center text-[20px] font-bold leading-[32px] text-black">
              아이의 다양한 활동을
              <br />
              보러 가세요
            </p>

            <div className="mt-2">
              <Image
                src="/svg/ic_kids_hi.svg"
                alt="아이 캐릭터"
                width={157}
                height={137}
                className="h-[137px] w-[157px]"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-100 px-5 py-5">
            <p className="text-center text-[15px] font-medium leading-[24px] text-gray-700">
              퀴즈를 풀면 연금계좌로 리워드를 드려요.
              <br />
              개인형 IRP 계좌가 리워드 계좌로 설정되어있어요.
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <Button
              size="L"
              variant="active"
              onClick={handleStartQuiz}
              disabled={isLoading}
              className="h-14 rounded-[20px] text-[18px] font-semibold leading-6"
            >
              {isLoading ? "확인 중..." : "퀴즈 시작하기"}
            </Button>

            <Button
              size="L"
              variant="purpleOutline"
              onClick={() => router.push("/wallet")}
              className="h-14 rounded-[20px] text-[18px] font-semibold leading-6"
            >
              리워드 받을 계좌 설정하러 가기
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
