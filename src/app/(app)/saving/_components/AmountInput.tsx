"use client";

import { useState } from "react";
import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import TransferAmount from "@/common/components/keypad/TransferAmount";
import RecentTransferModal from "./RecentTransferModal";

type AmountInputProps = {
  amount: number;
  onAmountChange: (val: number) => void;
};

export default function AmountInput({
  amount,
  onAmountChange,
}: AmountInputProps) {
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);

  if (isKeypadVisible) {
    return (
      <div className="absolute inset-0 bg-white z-60 flex flex-col w-full max-w-93.75 mx-auto animate-in fade-in duration-300">
        <div className="flex-none">
          <RegisterStepHeader
            title="송금하기"
            onBack={() => setIsKeypadVisible(false)}
          />
        </div>
        <div className="flex-1 overflow-y-auto pt-10 pb-10">
          <TransferAmount
            accountHolder="김채현(김채*)"
            accountNickname="채현이 적금 (용돈)"
            balance={800000}
            onNext={(inputAmount) => {
              onAmountChange(inputAmount);
              setIsKeypadVisible(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="mb-14 px-6 pt-10">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-black text-xl font-bold leading-8">송금 금액</h2>
        <button
          type="button"
          onClick={() => setIsRecentModalOpen(true)}
          className="text-zinc-400 text-base font-normal underline decoration-zinc-300"
        >
          [최근 송금 금액]
        </button>
      </div>
      <button
        type="button"
        onClick={() => setIsKeypadVisible(true)}
        className="w-full border-b border-stone-300 py-3 text-left mb-6"
      >
        <span
          className={`text-xl font-bold ${amount > 0 ? "text-black" : "text-stone-300"}`}
        >
          {amount > 0 ? `${amount.toLocaleString()}원` : "송금 금액"}
        </span>
      </button>

      <RecentTransferModal
        isOpen={isRecentModalOpen}
        onClose={() => setIsRecentModalOpen(false)}
      />
    </section>
  );
}
