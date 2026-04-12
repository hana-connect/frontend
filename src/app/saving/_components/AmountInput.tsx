"use client";

import { ChevronLeft } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
// 1. 공통 Button 컴포넌트 임포트 (경로 확인 필수!)
import Button from "@/common/components/button/Button";

interface Props {
  amount: number;
  onAmountChange: (value: number) => void;
  onShowModal: () => void;
  isPadOpen: boolean;
  setIsPadOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AmountInput({
  amount,
  onAmountChange,
  onShowModal,
  isPadOpen,
  setIsPadOpen,
}: Props) {
  const handleNumberClick = (val: string) => {
    const strAmount = amount === 0 ? "" : amount.toString();
    const newAmount = parseInt(strAmount + val, 10);
    if (newAmount <= 500000) {
      onAmountChange(newAmount);
    }
  };

  const handleBackspace = () => {
    const strAmount = amount.toString();
    if (strAmount.length <= 1) {
      onAmountChange(0);
    } else {
      onAmountChange(parseInt(strAmount.slice(0, -1), 10));
    }
  };

  if (isPadOpen) {
    return (
      <div className="absolute inset-0 z-50 bg-white flex flex-col font-['Pretendard']">
        <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-center bg-white px-4 text-black shrink-0">
          <button
            type="button"
            onClick={() => setIsPadOpen(false)}
            className="absolute left-4 p-1"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[18px] font-semibold leading-none">송금하기</h1>
        </header>

        <div className="flex flex-col items-center mt-12 px-6">
          <div className="w-12 h-12 bg-violet-100 rounded-full border border-zinc-300 flex items-center justify-center overflow-hidden mb-4">
            <img src="https://placehold.co/29x43" alt="profile" />
          </div>
          <div className="text-center mb-6">
            <p className="text-[#777777] text-base font-medium">
              김채현(김채*)
            </p>
            <p className="text-[#111111] text-base font-medium">
              채현이 적금 (용돈)
            </p>
          </div>
          <div className="text-black text-4xl font-medium leading-8 mb-4">
            {amount.toLocaleString()} <span className="text-4xl">원</span>
          </div>
          <div className="bg-neutral-100 my-2 px-5 py-2 rounded-2xl text-neutral-500 text-base font-medium whitespace-nowrap">
            지갑 잔액 800,000원
          </div>
        </div>

        {/* 2. 퀵 버튼: 공통 Button (S size, gray variant) 적용 */}
        <div className="flex justify-center gap-3 mt-42 px-8">
          {[10000, 30000, 50000].map((val) => (
            <Button
              key={val}
              size="S"
              variant="gray" // 기본 틀은 유지하되 아래 className으로 덮어씁니다
              onClick={() => onAmountChange(Math.min(500000, amount + val))}
              className="flex-1 rounded-lg bg-white text-neutral-600 text-base font-medium leading-6 px-0 outline-[1.18px] outline-offset-[-1.18px] outline-gray-300"
              style={{ height: "34px" }}
            >
              + {val / 10000}만
            </Button>
          ))}
        </div>

        {/* 키패드 */}
        <div className="mt-auto grid grid-cols-3 gap-y-2 w-full px-6 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleNumberClick(n.toString())}
              className="h-16 flex items-center justify-center text-[#0A0A0A] text-2xl font-medium"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="h-16 flex items-center justify-center text-[#0A0A0A] text-2xl"
          >
            ←
          </button>
        </div>

        {/* 3. 하단 다음 버튼: 공통 Button (L size) 적용 */}
        <div className="px-6 pb-10">
          <Button
            size="L"
            variant={amount > 0 ? "active" : "disabled"} // 금액 유무에 따라 스타일 자동 변경
            onClick={() => setIsPadOpen(false)}
          >
            다음
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-6 mb-14 px-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-black text-xl font-bold leading-8">송금 금액</h2>
        <button
          type="button"
          onClick={onShowModal}
          className="text-zinc-400 text-base font-normal underline decoration-zinc-300"
        >
          [최근 송금 금액]
        </button>
      </div>
      <button
        type="button"
        onClick={() => setIsPadOpen(true)}
        className="w-full border-b border-stone-300 py-3 text-left mb-6"
      >
        <span
          className={`text-xl font-bold ${amount > 0 ? "text-black" : "text-stone-300"}`}
        >
          {amount > 0 ? `${amount.toLocaleString()}원` : "송금 금액"}
        </span>
      </button>
    </section>
  );
}
