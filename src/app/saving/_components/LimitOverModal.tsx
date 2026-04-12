"use client";

interface Props {
  isOpen: boolean;
  type: "daily" | "saving";
  onClose: () => void;
  onRetry: () => void;
}

export default function LimitOverModal({
  isOpen,
  type,
  onClose,
  onRetry,
}: Props) {
  if (!isOpen) return null;

  const isDaily = type === "daily";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-t-[32px] p-8 animate-in slide-in-from-bottom duration-300">
        <h2 className="text-xl font-bold mb-4 leading-tight">
          {isDaily ? "일일 한도를 초과하셨어요." : "적금 한도를 초과하셨어요."}
        </h2>

        <div className="text-gray-600 text-[15px] mb-8 leading-relaxed">
          {isDaily ? (
            <>
              하루에 송금할 수 있는 금액을 초과했습니다.
              <br />
              일일 송금 한도는 50만원입니다.
              <br />
              내일 다시 시도해 주세요!
            </>
          ) : (
            <>
              이 통장은 가득 찼지만, 덕분에 채현이의
              <br />
              꿈은 더 커질 수 있었어요!
              <br />
              아이의 다른 통장을 통해 다시 마음을 전해보세요.
            </>
          )}
        </div>

        {!isDaily && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">현재 납입된 금액</span>
              <span className="font-bold">250,000 원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">입금하려는 금액</span>
              <span className="font-bold text-violet-500">+100,000원</span>
            </div>
            <div className="h-[1px] bg-gray-200" />
            <div className="flex justify-between text-sm font-bold">
              <span>적금 한도</span>
              <span>300,000원</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-violet-500 font-medium text-xs">
                초과 금액
              </span>
              <span className="text-violet-500">+50,000원</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold"
          >
            나가기
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-[2] py-4 bg-violet-500 text-white rounded-2xl font-bold"
          >
            {isDaily ? "금액 다시 입력하기" : "기존 다른 통장에 입금하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
