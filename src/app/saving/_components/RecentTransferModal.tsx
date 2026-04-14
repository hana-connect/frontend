"use client";

import Button from "@/common/components/button/Button";

type RecentTransferModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RecentTransferModal({
  isOpen,
  onClose,
}: RecentTransferModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="w-72 h-52 relative bg-white rounded-[20px] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="w-64 left-4 top-7 absolute text-left">
          <h3 className="text-black text-lg font-medium font-['Pretendard'] leading-6">
            최근 송금 내역
          </h3>
          <p className="text-neutral-500 text-base font-medium font-['Pretendard'] leading-5 mt-4">
            2026년 4월 10일에 <br />
            50,000원을 송금하셨어요.
          </p>
        </div>

        <div className="absolute left-4 top-33 w-64">
          <Button
            size="L"
            variant="active"
            onClick={onClose}
            className="h-14 rounded-[20px] text-xl font-bold"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
