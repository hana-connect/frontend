"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";

export default function QuizCompletePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const _childId = searchParams.get("childId");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
      <Header type="sub" title="퀴즈" />

      <main className="flex flex-1 flex-col bg-[#FFFFFF]">
        <section className="relative flex flex-1 flex-col overflow-hidden bg-[#FFFFFF] px-5 pt-5 pb-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,rgba(246,239,255,0.8)_0%,rgba(255,255,255,0)_100%)]" />

          <div className="relative z-10 flex flex-1 flex-col">
            <div className="mt-1">
              <h1 className="text-[20px] font-bold leading-8 text-brand-black">
                오늘 퀴즈를 모두 풀었어요!
              </h1>
            </div>

            <div className="relative mt-12 flex justify-center">
              <div className="relative flex h-12 items-center justify-center">
                <div className="relative flex">
                  {Array.from({ length: 10 }, (_, i) => `bubble-${i}`).map(
                    (id, index) => (
                      <div
                        key={id}
                        className={`relative h-12 w-12 ${index !== 0 ? "-ml-5" : ""}`}
                      >
                        <div className="absolute top-[2px] left-0 h-12 w-12 rounded-full bg-brand-purple-1/30" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-brand-purple-1 bg-[#FFFFFF]" />
                      </div>
                    ),
                  )}
                </div>

                <span className="absolute whitespace-nowrap bg-[#FFFFFF] px-3 text-[20px] font-bold leading-8 text-brand-purple-1">
                  우리 아이에게 한발짝 다가갔어요
                </span>
              </div>
            </div>

            <div className="relative mt-8 flex justify-center">
              <div className="relative w-full">
                <Image
                  src="/svg/quiz/ic_quiz_friends.svg"
                  alt="퀴즈 완료 캐릭터"
                  width={268}
                  height={90}
                  className="mx-auto h-[90px] w-[268px]"
                />
              </div>
            </div>

            <br />

            <div className="mt-4 rounded-2xl bg-[#FFF2CA] break-keep p-4 text-center text-[20px] font-semibold leading-8">
              🎉 리워드 14원이
              <br />
              리워드 계좌에 지급되었어요!
              <p className="mt-4 text-center text-[20px] font-semibold leading-8">
                내일 다시 만나요!
              </p>
            </div>

            <div className="mt-auto pt-8">
              <Button
                size="L"
                variant="active"
                onClick={() => {
                  sessionStorage.removeItem("quizToday");
                  sessionStorage.removeItem("quizCurrentQuestion");
                  sessionStorage.removeItem("quizAnswerResult");
                  router.push("/");
                }}
                className="h-14 rounded-[20px] text-[20px] font-semibold leading-6"
              >
                확인
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
