"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import AmountInput from "./_components/AmountInput";
import LimitOverModal from "./_components/LimitOverModal";
import PasswordInput from "./_components/PasswordInput";
import RecentTransferModal from "./_components/RecentTransferModal";
import RelayHistory from "./_components/RelayHistory";
import RelayMessage from "./_components/RelayMessage";
import TransferComplete from "./_components/TransferComplete";

export default function SavingPage() {
  const router = useRouter();

  const [step, setStep] = useState<
    "input" | "password" | "complete" | "history"
  >("input");
  const [isPadOpen, setIsPadOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);
  const [limitModal, setLimitModal] = useState<{
    isOpen: boolean;
    type: "daily" | "saving";
  }>({
    isOpen: false,
    type: "daily",
  });

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
            {/* 공컴 헤더 적용 */}
            {!isPadOpen && <Header type="sub" title="송금하기" />}

            <div
              className={`flex-1 overflow-y-auto ${!isPadOpen ? "pb-40" : ""}`}
            >
              <AmountInput
                amount={amount}
                onAmountChange={setAmount}
                onShowModal={() => setIsRecentModalOpen(true)}
                isPadOpen={isPadOpen}
                setIsPadOpen={setIsPadOpen}
              />

              {!isPadOpen && (
                <RelayMessage
                  message={message}
                  onMessageChange={setMessage}
                  onShowHistory={() => setStep("history")}
                />
              )}
            </div>

            {/* 하단 송금하기 버튼 섹션 */}
            {!isPadOpen && (
              <div className="absolute bottom-10 left-0 w-full px-6 bg-white py-4 z-10">
                <Button
                  size="L"
                  variant={isSubmitDisabled ? "disabled" : "active"}
                  onClick={handleTransferSubmit}
                  disabled={isSubmitDisabled}
                  className={
                    !isSubmitDisabled
                      ? "shadow-lg active:scale-[0.98] transition-all"
                      : ""
                  }
                >
                  송금하기
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 나머지 단계 처리 */}
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

        {/* 모달들 */}
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
