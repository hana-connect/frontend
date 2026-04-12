"use client";

type AmountHeaderProps = {
  accountName: string;
  accountNumber: string;
  balance: number;
  amount: string;
  onQuickAdd: (amount: number) => void;
};

function formatCurrency(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function AmountHeader({
  accountName,
  accountNumber,
  balance,
  amount,
  onQuickAdd,
}: AmountHeaderProps) {
  return (
    <section className="pt-2">
      <p className="text-[16px] font-semibold text-gray-400">
        조부모-일반 송금하기
      </p>

      <div className="mt-6 rounded-none bg-white px-4 pb-6 pt-4">
        <div className="mx-auto flex w-fit flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-gray-500">
            IMG
          </div>

          <p className="mt-3 text-[12px] font-medium text-gray-500">
            {accountName}
          </p>
          <p className="text-[12px] font-medium text-gray-500">
            {accountNumber}
          </p>

          <div className="mt-4 text-[40px] font-bold text-black">
            {amount === "" ? "0원" : `${amount}원`}
          </div>

          <div className="mt-10 rounded-full bg-gray-100 px-4 py-2 text-[12px] font-medium text-gray-500">
            지갑 잔액 {formatCurrency(balance)}원
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-1 text-[12px] font-medium text-gray-500"
              onClick={() => onQuickAdd(10000)}
            >
              + 1만
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-1 text-[12px] font-medium text-gray-500"
              onClick={() => onQuickAdd(30000)}
            >
              + 3만
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-1 text-[12px] font-medium text-gray-500"
              onClick={() => onQuickAdd(50000)}
            >
              + 5만
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
