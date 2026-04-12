"use client";

import type { Dispatch, SetStateAction } from "react";

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

  // --- [Case 1] 전체 화면 숫자 패드 모드 ---
  if (isPadOpen) {
    return (
      <div className="absolute inset-0 z-50 bg-white flex flex-col font-['Pretendard']">
        <header className="h-14 flex items-center px-4 shrink-0">
          <button
            type="button"
            onClick={() => setIsPadOpen(false)}
            className="text-xl"
          >
            {"<"}
          </button>
          <h1 className="flex-1 text-center text-base font-medium text-black mr-6">
            송금하기
          </h1>
        </header>

        <div className="flex flex-col items-center mt-12 px-6">
          {" "}
          {/* 중앙 정렬이지만 여백 확보 */}
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
            {amount.toLocaleString()} <span className="text-2xl">원</span>
          </div>
          <div className="bg-neutral-100 px-5 py-2 rounded-2xl text-neutral-500 text-base font-medium">
            지갑 잔액 800,000원
          </div>
        </div>

        {/* 퀵 버튼: 디자인상 양옆 24px 여백(px-6) */}
        <div className="flex justify-center gap-3 mt-10 px-6">
          {[10000, 30000, 50000].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onAmountChange(Math.min(500000, amount + val))}
              className="flex-1 h-8 bg-white border border-gray-300 rounded-lg text-[#555555] text-sm font-medium"
            >
              +{val / 10000}만
            </button>
          ))}
        </div>

        {/* 숫자 키패드: 양옆 24px 여백 */}
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

        <div className="px-6 pb-10">
          <button
            type="button"
            onClick={() => setIsPadOpen(false)}
            className="w-full h-14 bg-violet-500 text-white rounded-[20px] text-xl font-semibold shadow-lg"
          >
            다음
          </button>
        </div>
      </div>
    );
  }

  // --- [Case 2] 메인 화면 기본 금액 표시 (isPadOpen === false) ---
  return (
    <section className="mt-6 mb-14 w-full">
      {" "}
      {/* px-6 제거: 이제 섹션이 375px 끝까지 붙습니다 */}
      {/* 텍스트 줄만 양옆 24px 여백 */}
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
      {/* 구분선(border-b)은 375px 끝까지, 텍스트만 px-6 */}
      <button
        type="button"
        onClick={() => setIsPadOpen(true)}
        className="w-full border-b border-stone-300 py-3 text-left mb-6 ㅡx-6"
      >
        <span
          className={`text-xl font-bold ${amount > 0 ? "text-black" : "text-stone-300"}`}
        >
          {amount > 0 ? `${amount.toLocaleString()}원` : "송금 금액"}
        </span>
      </button>
      {/* 하단 퀵 버튼들도 양옆 24px 여백 */}
      <div className="flex gap-2 px-6">
        {[10000, 30000, 50000].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onAmountChange(Math.min(500000, amount + val))}
            className="px-4 py-2 bg-[#F9F9F9] border border-[#DEDEDE] rounded-full text-sm font-medium text-neutral-600"
          >
            +{val / 10000}만
          </button>
        ))}
      </div>
    </section>
  );
}
