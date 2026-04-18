"use client";

import { useState } from "react";
import RegisterStepHeader from "@/common/components/header/RegisterStepHeader";
import TransferAmount from "@/common/components/keypad/TransferAmount";
import RecentTransferModal from "./RecentTransferModal";

type AmountInputProps = {
  amount: number;
  onAmountChange: (val: number) => void;
  onCheckLimit: (val: number) => boolean;
  onShowRecentTransfer: () => void;
  recentTransfer: {
    transactionDate: string;
    amount: number;
  } | null;
  isRecentOpen: boolean;
  onCloseRecent: () => void;
  accountHolder: string;
  accountNickname: string;
  balance: number;
};

export default function AmountInput({
  amount,
  onAmountChange,
  onCheckLimit,
  onShowRecentTransfer,
  recentTransfer,
  isRecentOpen,
  onCloseRecent,
  accountHolder,
  accountNickname,
  balance,
}: AmountInputProps) {
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);

  if (isKeypadVisible) {
    return (
      <div className="absolute inset-0 bg-white z-60 flex flex-col w-full max-w-93.75 mx-auto animate-in fade-in duration-300">
        <div className="flex-none">
          <RegisterStepHeader
            title="송금하기"
            onBack={() => setIsKeypadVisible(false)}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          {" "}
          <TransferAmount
            accountHolder={accountHolder}
            accountNickname={accountNickname}
            balance={balance}
            onNext={(inputAmount) => {
              if (onCheckLimit(inputAmount)) {
                onAmountChange(inputAmount);
                setIsKeypadVisible(false);
              }
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
          onClick={onShowRecentTransfer}
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
          className={`text-xl font-bold ${
            amount > 0 ? "text-black" : "text-stone-300"
          }`}
        >
          {amount > 0 ? `${amount.toLocaleString()}원` : "송금 금액"}
        </span>
      </button>

      <RecentTransferModal
        isOpen={isRecentOpen}
        onClose={onCloseRecent}
        data={recentTransfer}
      />
    </section>
  );
}
