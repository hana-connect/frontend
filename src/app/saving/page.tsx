"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AmountInput from "./_components/AmountInput";
import LimitOverModal from "./_components/LimitOverModal";
import PasswordInput from "./_components/PasswordInput";
import RecentTransferModal from "./_components/RecentTransferModal";
import RelayHistory from "./_components/RelayHistory";
import RelayMessage from "./_components/RelayMessage";
import TransferComplete from "./_components/TransferComplete";

export default function SavingPage() {
  const router = useRouter();

  // 단계 관리
  const [step, setStep] = useState<
    "input" | "password" | "complete" | "history"
  >("input");

  // [중요] 금액 입력 패드 오픈 여부
  const [isPadOpen, setIsPadOpen] = useState(false);

  // 데이터 상태
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  // 모달 제어
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);
  const [limitModal, setLimitModal] = useState<{
    isOpen: boolean;
    type: "daily" | "saving";
  }>({
    isOpen: false,
    type: "daily",
  });

  // 버튼 활성화 조건
  const isSubmitDisabled = amount <= 0 || message.trim().length === 0;

  const handleTransferSubmit = () => {
    const currentSaving = 250000;
    const savingLimit = 300000;

    if (amount > 500000) {
      setLimitModal({ isOpen: true, type: "daily" });
      return;
    }

    if (currentSaving + amount > savingLimit) {
      setLimitModal({ isOpen: true, type: "saving" });
      return;
    }

    setStep("password");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <main className="w-full max-w-[375px] min-h-screen bg-white relative flex flex-col font-['Pretendard'] overflow-hidden">
        {step === "input" && (
          <div className="flex flex-col h-full relative">
            {/* [수정] 패드가 열리지 않았을 때만 메인 헤더 표시 */}
            {!isPadOpen && (
              <header className="h-14 flex items-center px-4 shrink-0 border-b border-gray-50">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-xl mr-4"
                >
                  {"<"}
                </button>
                <h1 className="flex-1 text-center text-base font-medium text-black mr-6">
                  송금하기
                </h1>
              </header>
            )}

            <div
              className={`flex-1 overflow-y-auto ${!isPadOpen ? "pb-40" : ""}`}
            >
              {/* 금액 입력 섹션 */}
              <AmountInput
                amount={amount}
                onAmountChange={setAmount}
                onShowModal={() => setIsRecentModalOpen(true)}
                isPadOpen={isPadOpen}
                setIsPadOpen={setIsPadOpen}
              />

              {/* [수정] 패드가 열리지 않았을 때만 메시지 입력창 표시 */}
              {!isPadOpen && (
                <RelayMessage
                  message={message}
                  onMessageChange={setMessage}
                  onShowHistory={() => setStep("history")}
                />
              )}
            </div>

            {/* [수정] 패드가 열리지 않았을 때만 하단 송금하기 버튼 표시 */}
            {!isPadOpen && (
              <div className="absolute bottom-10 left-0 w-full px-6 bg-white py-4 z-10">
                <button
                  type="button"
                  disabled={isSubmitDisabled}
                  onClick={handleTransferSubmit}
                  className={`w-full h-14 rounded-[20px] text-xl font-semibold transition-all ${
                    isSubmitDisabled
                      ? "bg-[#DEDEDE] text-white cursor-not-allowed"
                      : "bg-violet-500 text-white shadow-lg active:scale-[0.98]"
                  }`}
                >
                  송금하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- 나머지 단계들 --- */}
        {step === "history" && <RelayHistory onBack={() => setStep("input")} />}
        {step === "password" && (
          <PasswordInput
            onCorrect={() => setStep("complete")}
            onBack={() => setStep("input")}
          />
        )}
        {step === "complete" && (
          <TransferComplete
            amount={amount}
            message={message}
            onConfirm={() => router.push("/")}
          />
        )}

        {/* 모달 */}
        <RecentTransferModal
          isOpen={isRecentModalOpen}
          onClose={() => setIsRecentModalOpen(false)}
        />
        <LimitOverModal
          isOpen={limitModal.isOpen}
          type={limitModal.type}
          onClose={() => setLimitModal((prev) => ({ ...prev, isOpen: false }))}
          onRetry={() => {
            setLimitModal((prev) => ({ ...prev, isOpen: false }));
            setAmount(0);
          }}
        />
      </main>
    </div>
  );
}
