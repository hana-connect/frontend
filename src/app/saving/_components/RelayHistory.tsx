"use client";

import { ChevronLeft } from "lucide-react";

type RelayHistoryProps = {
  onBack: () => void;
};

type HistoryItem = {
  id: number;
  date: string;
  amount: number;
  message: string;
};

const MOCK_HISTORY: HistoryItem[] = [
  { id: 1, date: "2026.04.10", amount: 50000, message: "우리 예쁜 손주" },
  { id: 2, date: "2026.04.05", amount: 30000, message: "생일축하해~" },
  { id: 3, date: "2026.03.28", amount: 100000, message: "맛있는 거 사먹으렴" },
  { id: 4, date: "2026.03.15", amount: 20000, message: "파이팅!" },
];

export default function RelayHistory({ onBack }: RelayHistoryProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--color-white)] font-['Pretendard']">
      <header className="flex items-center h-15 px-4 mb-4 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-[var(--color-foreground)]"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--color-foreground)] ml-2">
          지난 작성 내역
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6">
        <div className="space-y-4 pb-10">
          {MOCK_HISTORY.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-[20px] bg-[var(--color-background-dim)] border border-[var(--color-background-dim)] transition-transform active:scale-[0.98]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[var(--color-foreground)] opacity-40 font-medium">
                  {item.date}
                </span>
                <span className="text-sm font-bold text-[#9C6FFE]">
                  {item.amount.toLocaleString()}원 송금
                </span>
              </div>
              <p className="text-base text-[var(--color-foreground)] font-medium leading-relaxed">
                "{item.message}"
              </p>
            </div>
          ))}

          {MOCK_HISTORY.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 text-[var(--color-foreground)] opacity-40 text-sm">
              아직 작성된 메시지가 없어요.
            </div>
          )}
        </div>
      </main>

      <footer className="p-6">
        <button
          type="button"
          onClick={onBack}
          className="w-full h-14 rounded-[20px] font-bold bg-[var(--color-background-dim)] text-[var(--color-foreground)] text-lg"
        >
          돌아가기
        </button>
      </footer>
    </div>
  );
}
