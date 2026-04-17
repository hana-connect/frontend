"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  RecentRelayMessage,
  RecentRelayMessagesResponse,
  RecentTransfersResponse,
  SavingTransferRequest,
  SavingTransferResponse,
} from "@/app/api/transfer/savings/types";
import type { TransferPrepareResponse } from "@/app/api/transfer/type";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";
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
  const searchParams = useSearchParams();

  const accountId = searchParams.get("accountId");
  const accountIdNumber = Number(accountId);

  const isValidAccountId =
    accountId !== null &&
    Number.isInteger(accountIdNumber) &&
    accountIdNumber > 0;

  const [step, setStep] = useState<TransferStep>("input");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [limitInfo, setLimitInfo] = useState<LimitInfo | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentRelayMessage[]>(
    [],
  );
  const [recentTransfer, setRecentTransfer] =
    useState<RecentTransfersResponse | null>(null);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [prepareData, setPrepareData] =
    useState<TransferPrepareResponse | null>(null);
  const [completedAccountNumber, setCompletedAccountNumber] = useState("");

  const isTransferReady = amount > 0 && message.trim().length > 0;

  useEffect(() => {
    if (!isValidAccountId) {
      alert("유효하지 않은 접근입니다.");
      router.back();
      return;
    }

    const fetchInitialData = async () => {
      try {
        const [prepareResult, relayResult] = await Promise.all([
          apiClient.get<ApiResponse<TransferPrepareResponse>>(
            `/api/transfer/prepare?accountId=${accountIdNumber}`,
          ),
          apiClient.get<ApiResponse<RecentRelayMessagesResponse>>(
            `/api/transfer/savings/relay/recent?targetAccountId=${accountIdNumber}`,
          ),
        ]);

        setPrepareData(prepareResult.data);
        setRecentMessages(relayResult.data.history);
      } catch (error) {
        console.error("적금 송금 초기 데이터 조회 실패", error);
      }
    };

    fetchInitialData();
  }, [isValidAccountId, accountIdNumber, router]);

  const handleShowRecentTransfer = async () => {
    try {
      const result = await apiClient.get<ApiResponse<RecentTransfersResponse>>(
        `/api/transfer/recent?targetAccountId=${accountIdNumber}`,
      );

      setRecentTransfer(result.data);
      setIsRecentOpen(true);
    } catch (error) {
      console.error("최근 송금 금액 조회 실패", error);
    }
  };

  const checkLimit = (inputAmount: number): boolean => {
    const currentSaving = prepareData?.currentSaving ?? 250000;
    const savingLimit = prepareData?.savingLimit ?? 300000;

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

  const handleSavingTransfer = async (password: string) => {
    try {
      const payload: SavingTransferRequest = {
        targetAccountId: accountIdNumber,
        amount,
        password,
        content: message,
      };

      const response = await apiClient.post<
        ApiResponse<SavingTransferResponse>
      >("/api/transfer/savings", payload);

      setStep("complete");
      setCompletedAccountNumber(response.data.toAccountNumber);

      return true;
    } catch (error) {
      console.error("적금 송금 실패", error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <main className="w-full max-w-93.75 h-screen bg-white relative flex flex-col font-['Pretendard'] overflow-hidden">
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
                onShowRecentTransfer={handleShowRecentTransfer}
                recentTransfer={recentTransfer}
                isRecentOpen={isRecentOpen}
                onCloseRecent={() => setIsRecentOpen(false)}
                accountHolder={prepareData?.displayName ?? ""}
                accountNickname={prepareData?.accountAlias ?? ""}
                balance={prepareData?.balance ?? 0}
              />

              <RelayMessage
                message={message}
                onMessageChange={setMessage}
                onShowHistory={() => setStep("history")}
                recentMessages={recentMessages}
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

        {step === "history" && (
          <div className="flex flex-col h-full bg-white z-50">
            <RelayHistory
              targetAccountId={accountIdNumber}
              onBack={() => setStep("input")}
            />
          </div>
        )}

        {step === "password" && (
          <PasswordInput
            onBack={() => setStep("input")}
            onComplete={handleSavingTransfer}
          />
        )}

        {step === "complete" && (
          <TransferComplete
            amount={amount}
            message={message}
            accountNumber={completedAccountNumber}
            onConfirm={() => router.push("/")}
          />
        )}

        <LimitOverModal
          isOpen={!!limitInfo}
          targetName={prepareData?.displayName ?? "아이"}
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
