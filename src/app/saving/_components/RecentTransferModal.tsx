"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentTransferModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-white w-full max-w-[300px] rounded-[32px] p-8 flex flex-col items-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-base font-bold text-gray-800 mb-6 w-full text-left">
          최근 송금 내역
        </h3>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed w-full text-left">
          <span className="font-bold">2026년 4월 10일</span>에 <br />
          <span className="text-violet-600 font-bold">50,000원</span>을
          송금하셨어요.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 bg-violet-500 text-white rounded-2xl font-bold text-base hover:bg-violet-600 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
