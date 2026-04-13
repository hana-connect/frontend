"use client";

import Button from "@/common/components/button/Button";

type LimitOverModalProps = {
  isOpen: boolean;
  type: "daily" | "saving";
  onClose: () => void;
  onRetry: () => void;
};

export default function LimitOverModal({
  isOpen,
  type,
  onClose,
  onRetry,
}: LimitOverModalProps) {
  if (!isOpen) return null;

  const isDaily = type === "daily";

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/50 font-['Pretendard']">
      <div className="w-full max-w-93.75 h-135.75 bg-white rounded-t-[30px] px-6 pt-8 pb-10 flex flex-col animate-in slide-in-from-bottom duration-300">
        <h2 className="text-[#1A1C3D] text-xl font-semibold leading-8 mb-4">
          {isDaily ? "일일 한도를 초과하셨어요." : "적금 한도를 초과하셨어요."}
        </h2>

        <div className="text-[#1A1C3D] text-lg font-medium leading-7 mb-8">
          {isDaily ? (
            <p>
              하루에 송금할 수 있는 금액을 초과했습니다.
              <br />
              내일 다시 시도해 주세요!
            </p>
          ) : (
            <>
              <p>
                이 통장은 가득 찼지만, 덕분에 채현이의
                <br />
                꿈은 더 커질 수 있었어요!
              </p>
              <p className="mt-4">
                아이의 다른 통장을 통해
                <br />
                다시 마음을 전해보세요.
              </p>
            </>
          )}
        </div>

        {!isDaily && (
          <div className="flex flex-col mb-8 px-2">
            <div className="flex justify-between py-3">
              <span className="text-gray-600 text-base">현재 납입된 금액</span>
              <span className="text-[#0A0A0A] text-base font-semibold font-['Inter']">
                250,000 원
              </span>
            </div>
            <div className="flex justify-between py-3 border-t-[1.18px] border-gray-200">
              <span className="text-gray-600 text-base">입금하려는 금액</span>
              <span className="text-success text-base font-semibold font-['Inter']">
                +100,000원
              </span>
            </div>
            <div className="flex justify-between py-3 border-t-[1.18px] border-gray-200">
              <span className="text-gray-600 text-base">적금 한도</span>
              <span className="text-[#0A0A0A] text-base font-semibold font-['Inter']">
                300,000원
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-neutral-300">
              <span className="text-gray-700 text-base font-semibold">
                초과 금액
              </span>
              <span className="text-success text-lg font-semibold font-['Inter']">
                +50,000원
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-28 h-14 bg-neutral-100 text-[#1A1C3D] rounded-[20px] text-xl font-medium"
          >
            나가기
          </button>
          <Button
            size="L"
            variant="active"
            onClick={onRetry}
            className="flex-1 text-[18px] sm:text-[18px]"
          >
            {isDaily ? "금액 다시 입력하기" : "기존 다른 통장에 입금하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
