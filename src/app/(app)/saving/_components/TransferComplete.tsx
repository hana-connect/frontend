"use client";

import Image from "next/image";
import Bubble from "@/common/components/bubble/Bubble";
import Button from "@/common/components/button/Button";

type TransferCompleteProps = {
  amount: number;
  message: string;
  onConfirm: () => void;
};

export default function TransferComplete({
  amount,
  message,
  onConfirm,
}: TransferCompleteProps) {
  const today = "2026.04.11";

  const parentProfile = {
    src: "/svg/ic_mom2.svg",
    alt: "엄마 프로필",
  };

  return (
    <div className="absolute inset-0 bg-white z-80 flex flex-col w-full max-w-93.75 mx-auto animate-in fade-in duration-500 font-['Pretendard'] overflow-y-auto">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

        <h2 className="text-body-20-m text-brand-black mt-6">
          송금이 완료되었어요!
        </h2>

        <div className="w-full h-[0.8px] bg-grey-5 mt-12" aria-hidden="true" />

        <div className="w-full mt-6 space-y-4">
          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>송금 계좌번호</span>
            <span className="text-brand-black">1002158055957</span>
          </div>

          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>송금 금액</span>
            <span className="text-brand-black">
              {amount.toLocaleString()}원
            </span>
          </div>

          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>송금일</span>
            <span className="text-brand-black">{today}</span>
          </div>
        </div>

        {/* 메시지 버블 영역 */}
        <div className="w-full mt-10">
          <Bubble message={message} parentProfile={parentProfile} />
        </div>
      </div>

      <div className="w-full px-6 pb-9 mt-10">
        <Button
          size="L"
          variant="active"
          onClick={onConfirm}
          className="w-full"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
