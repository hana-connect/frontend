"use client";

import Button from "@/common/components/button/Button";

type RecentTransferModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    transactionDate: string;
    amount: number;
  } | null;
};

export default function RecentTransferModal({
  isOpen,
  onClose,
  data,
}: RecentTransferModalProps) {
  if (!isOpen) return null;

  // 날짜 포맷 (YYYYMMDD → YYYY년 M월 D일)
  const formatDate = (value: string) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="w-72 h-52 relative bg-white rounded-[20px] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="w-64 left-4 top-7 absolute text-left">
          <h3 className="text-black text-lg font-medium leading-6">
            최근 송금 내역
          </h3>

          {data ? (
            <p className="text-neutral-500 text-base font-medium leading-5 mt-4">
              {formatDate(data.transactionDate)}에 <br />
              {data.amount.toLocaleString()}원을 송금하셨어요.
            </p>
          ) : (
            <p className="text-neutral-500 text-base font-medium leading-5 mt-4">
              최근 송금 내역이 없습니다.
            </p>
          )}
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
