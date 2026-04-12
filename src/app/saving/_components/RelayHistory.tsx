"use client";

interface Props {
  onBack: () => void;
}

// 깡통 데이터 (실제로는 API나 부모의 props에서 받아오게 됩니다)
const MOCK_HISTORY = [
  { id: 1, date: "2026.04.10", amount: 50000, message: "우리 예쁜 손주" },
  { id: 2, date: "2026.04.05", amount: 30000, message: "생일축하해~" },
  { id: 3, date: "2026.03.28", amount: 100000, message: "맛있는 거 사먹으렴" },
  { id: 4, date: "2026.03.15", amount: 20000, message: "파이팅!" },
];

export default function RelayHistory({ onBack }: Props) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더: 뒤로가기 버튼 포함 */}
      <header className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-xl p-2 -ml-2 text-gray-600"
        >
          {"<"}
        </button>
        <h1 className="text-lg font-bold">지난 작성 내역</h1>
      </header>

      {/* 내역 리스트 영역 */}
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {MOCK_HISTORY.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">{item.date}</span>
                <span className="text-sm font-bold text-violet-600">
                  {item.amount.toLocaleString()}원 송금
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>

        {/* 데이터가 없을 경우 예외 처리 (선택 사항) */}
        {MOCK_HISTORY.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-sm">
            아직 작성된 메시지가 없어요.
          </div>
        )}
      </main>

      {/* 하단 닫기 버튼 */}
      <footer className="mt-8">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-4 rounded-2xl font-bold bg-gray-100 text-gray-600"
        >
          돌아가기
        </button>
      </footer>
    </div>
  );
}
