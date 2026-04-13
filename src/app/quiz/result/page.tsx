"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Drawer } from "vaul";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";

export default function QuizResultPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const choices = [
    "용돈 기록하기",
    "사진 찍기",
    "심부름 하기",
    "영상 통화하기",
  ];

  const selectedIndex = 3;
  const isCorrect = false; // 정답 여부

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
        <Header type="sub" title="퀴즈 결과" />

        <main className="flex flex-1 flex-col bg-[#FFFFFF]">
          <section className="flex flex-1 flex-col bg-[linear-gradient(180deg,#FFF3FF_0%,#F1F8FF_25%,#FFFFFF_50%)] px-5 pt-6 pb-6">
            {/* 결과 카드 */}
            <div className="relative mt-2">
              <Image
                src={isCorrect ? "/svg/ic_confetti.svg" : "/svg/rain.svg"}
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
                    className={`absolute left-0 bottom-[2px] h-6 w-[300px] ${
                      isCorrect ? "bg-fuchsia-100" : "bg-[#FDE2E4]"
                    }`}
                  />

                  {isCorrect ? (
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]">
                      <div className="h-4 w-4 rounded-full bg-white" />
                    </div>
                  ) : (
                    <Image
                      src="/svg/quizx.svg"
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
                      정답은 영상 통화하기 입니다.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* 문제 카드 */}
            <div className="relative mt-14">
              <div className="absolute -top-5 left-6 z-10">
                <div className="relative flex items-center justify-center drop-shadow-[0_6px_0_rgba(0,0,0,0.08)]">
                  <div className="flex">
                    <div className="h-[51px] w-[51px] rounded-full bg-[#B8B8B8]" />
                    <div className="-ml-4 h-[51px] w-[51px] rounded-full bg-[#B8B8B8]" />
                    <div className="-ml-4 h-[51px] w-[51px] rounded-full bg-[#B8B8B8]" />
                  </div>
                  <span className="absolute whitespace-nowrap text-[20px] font-bold leading-7 text-white">
                    QUIZ 01
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 pt-10 pb-6">
                <p className="text-[20px] font-bold leading-8 text-[#9C91B0]">
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
                  <div
                    key={choice}
                    className="flex h-20 w-full items-center justify-between rounded-2xl border border-grey-5 bg-[#FFFFFF] px-6 text-left"
                  >
                    <span className="text-[18px] font-medium leading-6 text-[#B1A8BF]">
                      {choice}
                    </span>

                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D1D5DC]">
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#D1D5DC]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 다음 버튼 */}
            <div className="mt-auto pt-6">
              <Button
                size="M"
                variant="active"
                onClick={() => setOpen(true)}
                className="h-14 rounded-[20px] text-[20px] font-semibold leading-6"
              >
                다음 퀴즈 풀기
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
                  size="M"
                  variant="disabled"
                  onClick={() => setOpen(false)}
                  className="h-12 w-full text-[18px] font-medium"
                >
                  아니요
                </Button>
              </div>

              <div className="min-w-0 flex-1">
                <Button
                  size="M"
                  variant="active"
                  onClick={() => {
                    setOpen(false);
                    router.push("/quiz/play");
                  }}
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
