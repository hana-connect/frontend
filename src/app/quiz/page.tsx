"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";

export default function QuizStartPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-[#FFFFFF]">
      <Header type="sub" title="퀴즈" />

      <main className="flex flex-1 flex-col bg-[#FFFFFF]">
        <section className="flex flex-1 flex-col px-[22px] pt-4 pb-8">
          {/* 제목 */}
          <div className="mt-[6px]">
            <h1 className="text-2xl font-semibold leading-9 text-black">
              우리 아이 퀴즈
            </h1>

            <p className="mt-[2px] text-base font-medium leading-6 text-black">
              아이의 활동를 퀴즈로 맞혀보세요 😊
            </p>
          </div>

          {/* 메인 카드 */}
          <div className="mt-[40px] flex h-[256px] flex-col items-center justify-center rounded-2xl bg-violet-50 px-[56px]">
            <p className="text-center text-[20px] font-bold leading-[32px] text-black">
              아이의 다양한 활동을
              <br />
              보러 가세요
            </p>

            <div className="mt-2">
              <Image
                src="/svg/quizestart.svg"
                alt="아이 캐릭터"
                width={157}
                height={137}
                className="h-[137px] w-[157px]"
              />
            </div>
          </div>

          {/* 안내 배너 */}
          <div className="mt-6 rounded-2xl bg-amber-100 px-5 py-5">
            <p className="text-center text-[15px] font-medium leading-[24px] text-gray-700">
              퀴즈를 풀면 연금계좌로 리워드를 드려요.
              <br />
              개인형 IRP 계좌가 리워드 계좌로 설정되어있어요.
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="mt-auto flex flex-col gap-4 pt-8">
            <Button
              size="M"
              variant="active"
              onClick={() => router.push("/quiz/play")}
              className="h-14 rounded-[20px] text-[18px] font-semibold leading-6"
            >
              퀴즈 시작하기
            </Button>

            <Button
              size="M"
              variant="purpleOutline"
              onClick={() => router.push("/")}
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
