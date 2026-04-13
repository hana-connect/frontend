"use client";

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
  return (
    <div className="fixed inset-0 bg-[var(--color-white)] z-[80] flex flex-col p-6 animate-in fade-in duration-500 font-['Pretendard']">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-[#9C6FFE]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
            role="img"
            aria-labelledby="success-title"
          >
            <title id="success-title">입금 완료 아이콘</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-[var(--color-foreground)] text-xl font-bold mb-10">
          입금이 완료되었어요!
        </h2>

        <div className="w-full border-t border-[var(--color-background-dim)] py-6 space-y-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[var(--color-foreground)] opacity-40">
              입금 계좌번호
            </span>
            <span className="font-semibold text-[var(--color-foreground)] opacity-80">
              1002158055957
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[var(--color-foreground)] opacity-40">
              송금 금액
            </span>
            <span className="font-bold text-[var(--color-foreground)] text-lg">
              {amount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[var(--color-foreground)] opacity-40">
              송금일
            </span>
            <span className="font-semibold text-[var(--color-foreground)] opacity-80">
              2026.04.11
            </span>
          </div>
        </div>

        <div className="w-full mt-8 flex items-end gap-3 px-2">
          <div className="flex-1 bg-violet-50 rounded-2xl rounded-br-none p-5 relative shadow-sm border border-violet-100">
            <p className="text-[#9C6FFE] font-bold leading-relaxed">
              {message || "너를 늘 응원하고 있단다"}
            </p>
          </div>
          <div className="w-12 h-12 bg-[var(--color-background-dim)] rounded-full overflow-hidden border-2 border-white shadow-md mb-[-4px] shrink-0">
            <div className="w-full h-full bg-violet-200" />
          </div>
        </div>
      </div>

      <div className="pb-4">
        <Button
          size="L"
          variant="active"
          onClick={onConfirm}
          className="w-full rounded-[20px] shadow-lg active:scale-[0.98] transition-all"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
