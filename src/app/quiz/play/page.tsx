"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import { cn } from "@/common/lib/utils";

export default function QuizPlayPage() {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const choices = [
    "용돈 기록하기",
    "사진 찍기",
    "심부름 하기",
    "영상 통화하기",
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
      <Header type="sub" title="퀴즈 풀기" />

      <main className="flex flex-1 flex-col bg-[#FFFFFF]">
        <section className="flex flex-1 flex-col bg-[linear-gradient(180deg,#FFF3FF_0%,#F1F8FF_25%,#FFFFFF_50%)] px-5 pt-6 pb-6">
          <div className="relative mt-6">
            {/* QUIZ 뱃지 */}
            <div className="absolute -top-5 left-6 z-10">
              <div className="relative flex items-center justify-center drop-shadow-[0_6px_0_rgba(0,0,0,0.08)]">
                <div className="flex">
                  <div className="h-[51px] w-[51px] rounded-full bg-brand-secondary" />
                  <div className="-ml-4 h-[51px] w-[51px] rounded-full bg-brand-secondary" />
                  <div className="-ml-4 h-[51px] w-[51px] rounded-full bg-brand-secondary" />
                </div>
                <span className="absolute whitespace-nowrap text-[20px] font-bold leading-7 text-white">
                  QUIZ 01
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 pt-10 pb-6">
              <div className="text-right text-[20px] font-semibold leading-8 text-brand-black">
                1/3
              </div>

              <div className="my-3 border-t border-grey-5" />

              <p className="text-[20px] font-bold leading-8 text-brand-black">
                문제입니다.
                <br />
                지난 주에 아이와 함께 했던 활동은
                <br />
                무엇일까요?
              </p>
            </div>
          </div>

          {/* 보기 리스트 */}
          <div className="mt-5 flex flex-col gap-[14px]">
            {choices.map((choice, index) => {
              const isSelected = selectedIndex === index;

              return (
                <label
                  key={choice}
                  className={cn(
                    "flex h-20 w-full cursor-pointer items-center justify-between rounded-2xl bg-[#FFFFFF] px-6 text-left transition",
                    isSelected
                      ? "border-2 border-brand-purple-1"
                      : "border border-grey-5",
                  )}
                >
                  <input
                    type="radio"
                    name="quiz-choice"
                    value={choice}
                    checked={isSelected}
                    onChange={() => setSelectedIndex(index)}
                    className="sr-only"
                  />

                  <span className="text-[18px] font-medium leading-6 text-[#101828]">
                    {choice}
                  </span>

                  <div
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      isSelected ? "border-brand-purple-1" : "border-[#D1D5DC]",
                    )}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-purple-1" />
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          {/* 힌트 */}
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

              <Image
                src="/svg/ic_down_vector.svg"
                alt="화살표"
                width={10}
                height={6}
                className={cn(
                  "h-[6px] w-[10px] transition-transform",
                  showHint ? "rotate-0" : "rotate-180",
                )}
              />
            </div>

            {showHint && (
              <p
                id="quiz-hint-content"
                className="mt-4 text-[18px] font-medium leading-6 text-grey-2"
              >
                벚꽃 놀이를 갔다왔어요.
              </p>
            )}
          </button>

          {/* 제출 버튼 */}
          <div className="mt-auto pt-6">
            <Button
              size="M"
              variant={selectedIndex !== null ? "active" : "disabled"}
              disabled={selectedIndex === null}
              onClick={() => {
                if (selectedIndex === null) return;
                router.push("/quiz/result");
              }}
              className="h-14 rounded-[20px] text-[20px] font-semibold leading-6"
            >
              정답 제출
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
