"use client";

import Image from "next/image";
import { QuickAddButtons } from "./QuickAddButtons";

type AmountHeaderProps = {
  accountHolder: string;
  accountNickname: string;
  balance: number;
  amount: string;
  onQuickAdd: (amount: number) => void;
};

function formatCurrency(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function AmountHeader({
  accountHolder,
  accountNickname,
  balance,
  amount,
  onQuickAdd,
}: AmountHeaderProps) {
  return (
    <section className="flex flex-1 flex-col pt-2">
      <div className="flex flex-col items-center">
        <Image
          width={50}
          height={50}
          src="/svg/ic_child.svg"
          alt={`${accountHolder}의 프로필`}
        />

        <div className="mt-3 flex flex-col items-center text-body-16-m text-grey-6">
          <span>{accountHolder}</span>
          <span>{accountNickname}</span>
        </div>

        <div className="mt-7 text-heading-40-b text-black">
          {amount === "" ? "0" : amount}
          <span className="ml-1">원</span>
        </div>
      </div>

      <div className="mt-auto mb-6 flex flex-col items-center">
        <div className="rounded-xl bg-grey-7 px-4 py-2 text-body-16-m text-grey-6">
          지갑 잔액 {formatCurrency(balance)}원
        </div>
        <QuickAddButtons onQuickAdd={onQuickAdd} />
      </div>
    </section>
  );
}
