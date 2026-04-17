"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubscriptionPaymentInfoResponse } from "@/app/api/subscriptions/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/alert-dialog/AlertDialog";
import Button from "@/common/components/button/Button";
import GuideSection from "@/common/components/GuideSection";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import TransferAmount from "@/common/components/keypad/TransferAmount";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

const LIMIT_AMOUNT = 250000;

type SubscriptionPaymentDraft = {
  subscriptionId: number;
  amount: number;
  transferExcessToReward: boolean | null;
};

export default function PaymentDeposit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get("subscriptionId");

  const [paymentInfo, setPaymentInfo] =
    useState<SubscriptionPaymentInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [amount, setAmount] = useState<number | null>(null);
  const [showAmountPad, setShowAmountPad] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [moveExtraToReward, setMoveExtraToReward] = useState<boolean | null>(
    null,
  );

  const isDisabled = !amount || !paymentInfo;

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (!subscriptionId) {
        setIsLoading(false);
        return;
      }

      const subscriptionIdNumber = Number(subscriptionId);

      if (
        !Number.isInteger(subscriptionIdNumber) ||
        subscriptionIdNumber <= 0
      ) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get<
          ApiResponse<SubscriptionPaymentInfoResponse>
        >(`/api/subscriptions/${subscriptionIdNumber}/payments/info`);

        setPaymentInfo(response.data);
      } catch (error) {
        console.error("청약 납입 정보 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [subscriptionId]);

  const handleNextStep = (nextAmount: number) => {
    if (nextAmount > LIMIT_AMOUNT) {
      setPendingAmount(nextAmount);
      setShowLimitModal(true);
      return;
    }

    setAmount(nextAmount);
    setMoveExtraToReward(null);
    setShowAmountPad(false);
  };

  const handleLimitConfirm = () => {
    if (pendingAmount === null) return;

    setAmount(pendingAmount);
    setMoveExtraToReward(true);
    setPendingAmount(null);
    setShowLimitModal(false);
    setShowAmountPad(false);
  };

  const handleLimitCancel = () => {
    if (pendingAmount === null) return;

    setAmount(pendingAmount);
    setMoveExtraToReward(false);
    setPendingAmount(null);
    setShowLimitModal(false);
    setShowAmountPad(false);
  };

  const handleSubmit = () => {
    if (!amount || !subscriptionId || !paymentInfo) return;

    const subscriptionIdNumber = Number(subscriptionId);

    if (!Number.isInteger(subscriptionIdNumber) || subscriptionIdNumber <= 0) {
      return;
    }

    const transferExcessToReward =
      amount > LIMIT_AMOUNT ? moveExtraToReward : null;

    const draft: SubscriptionPaymentDraft = {
      subscriptionId: subscriptionIdNumber,
      amount,
      transferExcessToReward,
    };

    sessionStorage.setItem("subscriptionPayment", JSON.stringify(draft));
    router.push("/subscription/payment/password");
  };

  if (isLoading) {
    return null;
  }

  if (!paymentInfo) {
    return (
      <main className="flex h-dvh items-center justify-center bg-white">
        청약 납입 정보를 불러올 수 없습니다.
      </main>
    );
  }

  if (showAmountPad) {
    return (
      <>
        <TransferAmount
          accountHolder={paymentInfo.displayName}
          accountNickname={paymentInfo.accountNickname}
          balance={paymentInfo.balance}
          onNext={handleNextStep}
        />

        <AlertDialog open={showLimitModal} onOpenChange={setShowLimitModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                납입액이 25만원을 넘었어요.
                <br />
                초과분은 가점에 반영되지 않아요.
                <br />
                <br />
                {(pendingAmount
                  ? pendingAmount - LIMIT_AMOUNT
                  : 0
                ).toLocaleString()}
                원, 리워드 계좌로 옮길까요?
              </AlertDialogTitle>

              <AlertDialogDescription>
                현재 설정된 계좌:{" "}
                {paymentInfo.rewardAccountName ?? "리워드 계좌 없음"}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleLimitCancel}>
                아니요
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleLimitConfirm}>
                예
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      <div className="custom-scroll flex-1 overflow-y-auto bg-[#F6F7F8]">
        <div className="bg-white px-5 pt-6 pb-12">
          <Header type="sub" title="청약 납입하기" />

          <section className="mt-10">
            <p className="mb-6 text-xl font-bold text-brand-black">납입금액</p>

            <Input
              placeholder="금액 입력"
              value={amount ? amount.toLocaleString() : ""}
              readOnly
              onClick={() => setShowAmountPad(true)}
              className="cursor-pointer font-bold text-brand-black placeholder:text-[#CCCCCC]"
            />
          </section>
        </div>

        <div className="h-60 bg-white" />

        <section className="px-5 pb-10 pt-4">
          <GuideSection />
        </section>
      </div>

      <div className="shrink-0 bg-white px-5 pb-6 pt-3">
        <Button
          size="L"
          variant={isDisabled ? "disabled" : "active"}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>

      <style jsx>{`
        .custom-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
