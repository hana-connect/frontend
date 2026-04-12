"use client";

interface TransferCompleteProps {
  amount: number;
  message: string;
  onConfirm: () => void;
}

export default function TransferComplete({
  amount,
  message,
  onConfirm,
}: TransferCompleteProps) {
  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col p-6 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* 완료 체크 아이콘 */}
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-violet-500"
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

        <h2 className="text-xl font-bold mb-10">입금이 완료되었어요!</h2>

        {/* 상세 내역 섹션 */}
        <div className="w-full border-t border-gray-100 py-6 space-y-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">입금 계좌번호</span>
            <span className="font-semibold text-gray-700">1002158055957</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">송금 금액</span>
            <span className="font-bold text-gray-900 text-lg">
              {amount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">송금일</span>
            <span className="font-semibold text-gray-700">2026.04.11</span>
          </div>
        </div>

        {/* 릴레이 메시지 말풍선 (캐릭터 이미지 포함) */}
        <div className="w-full mt-8 flex items-end gap-3 px-2">
          <div className="flex-1 bg-violet-50 rounded-2xl rounded-br-none p-5 relative shadow-sm">
            <p className="text-violet-600 font-bold leading-relaxed">
              {message || "너를 늘 응원하고 있단다"}
            </p>
          </div>
          {/* 캐릭터 프로필 영역 */}
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md mb-[-4px]">
            {/* <Image src="/path/to/character.png" ... /> */}
            <div className="w-full h-full bg-violet-200" />
          </div>
        </div>
      </div>

      {/* 하단 확인 버튼 */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full py-4 bg-violet-500 text-white rounded-2xl font-bold text-lg mb-4 shadow-lg active:bg-violet-600 transition-colors"
      >
        확인
      </button>
    </div>
  );
}
