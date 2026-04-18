"use client";

import Image from "next/image";
import Bubble from "@/common/components/bubble/Bubble";
import Button from "@/common/components/button/Button";

type TransferCompleteProps = {
  amount: number;
  message: string;
  onConfirm: () => void;
  accountNumber: string;
  transferDate?: string;
};

export default function TransferComplete({
  amount,
  message,
  onConfirm,
  accountNumber,
  transferDate,
}: TransferCompleteProps) {
  const parentProfile = {
    src: "/svg/ic_mom2.svg",
    alt: "엄마 프로필",
  };

  const formatAccountNumber = (value?: string) => {
    if (!value) return "-";
    return value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const formatTransferDate = (value?: string) => {
    const target = value ?? new Date().toISOString();

    const date = new Date(target);

    if (Number.isNaN(date.getTime())) return target;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="absolute inset-0 bg-white z-80 flex flex-col w-full max-w-93.75 mx-auto animate-in fade-in duration-500 overflow-y-auto">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />

        <h2 className="text-body-20-m text-brand-black mt-6">
          입금이 완료되었어요!
        </h2>

        <div className="w-full h-[0.8px] bg-grey-5 mt-12" aria-hidden="true" />

        <div className="w-full mt-6 space-y-4">
          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>입금 계좌번호</span>
            <span className="text-brand-black">
              {formatAccountNumber(accountNumber)}
            </span>
          </div>

          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>송금 금액</span>
            <span className="text-brand-black">
              {amount.toLocaleString()}원
            </span>
          </div>

          <div className="flex justify-between text-body-16-m text-grey-6">
            <span>송금일</span>
            <span className="text-brand-black">
              {formatTransferDate(transferDate)}
            </span>
          </div>
        </div>

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
