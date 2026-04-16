"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import AmountInput from "./_components/AmountInput";
import LimitOverModal from "./_components/LimitOverModal";
import PasswordInput from "./_components/PasswordInput";
import RelayHistory from "./_components/RelayHistory";
import RelayMessage from "./_components/RelayMessage";
import TransferComplete from "./_components/TransferComplete";

type TransferStep = "input" | "password" | "complete" | "history";
type LimitInfo = {
  currentSaving: number;
  inputAmount: number;
  savingLimit: number;
};

export default function SavingPage() {
  const router = useRouter();

  const [step, setStep] = useState<TransferStep>("input");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const [limitInfo, setLimitInfo] = useState<LimitInfo | null>(null);

  const isTransferReady = amount > 0 && message.trim().length > 0;

  const checkLimit = (inputAmount: number): boolean => {
    const currentSaving = 250000;
    const savingLimit = 300000;

    if (currentSaving + inputAmount > savingLimit) {
      setLimitInfo({ currentSaving, inputAmount, savingLimit });
      return false;
    }
    return true;
  };

  const handleTransferSubmit = () => {
    if (checkLimit(amount)) {
      setStep("password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <main className="w-full max-w-93.75 h-screen bg-white relative flex flex-col font-['Pretendard'] overflow-hidden">
        {/* 1. 금액 + 메시지 입력 */}
        {step === "input" && (
          <div className="flex flex-col h-full relative">
            <div className="flex-none border-b border-gray-100">
              <Header type="sub" title="송금하기" />
            </div>

            <div className="flex-1 overflow-y-auto pb-40">
              <AmountInput
                amount={amount}
                onAmountChange={setAmount}
                onCheckLimit={checkLimit}
              />

              <RelayMessage
                targetAccountId={2}
                message={message}
                onMessageChange={setMessage}
                onShowHistory={() => setStep("history")}
              />

              <div className="mt-20 left-0 w-full px-6 bg-white py-4 z-10">
                <Button
                  size="L"
                  variant={isTransferReady ? "active" : "disabled"}
                  onClick={handleTransferSubmit}
                  disabled={!isTransferReady}
                >
                  송금하기
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 2. 릴레이 메시지 지난 작성 내역 */}
        {step === "history" && (
          <div className="flex flex-col h-full bg-white z-50">
            <RelayHistory
              targetAccountId={2} // TODO: 실제 받아오는 계좌로 교체
              onBack={() => setStep("input")}
            />
          </div>
        )}

        {/* 3. 간편비밀번호 입력 */}
        {step === "password" && (
          <PasswordInput
            onBack={() => setStep("input")}
            onSuccess={() => setStep("complete")}
          />
        )}

        {/* 4. 송금 완료 */}
        {step === "complete" && (
          <TransferComplete
            amount={amount}
            message={message}
            onConfirm={() => router.push("/")}
          />
        )}

        {/* 한도 초과 모달 */}
        <LimitOverModal
          isOpen={!!limitInfo}
          limitData={limitInfo}
          onClose={() => {
            setLimitInfo(null);
          }}
          onRetry={() => {
            setLimitInfo(null);
          }}
        />
      </main>
    </div>
  );
}
