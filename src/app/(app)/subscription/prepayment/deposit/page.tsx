"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubscriptionPaymentInfoResponse } from "@/app/api/subscriptions/type";
import Button from "@/common/components/button/Button";
import GuideSection from "@/common/components/GuideSection";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";
import TransferAmount from "@/common/components/keypad/TransferAmount";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";
import PaymentRoundSelect from "./_components/PaymentRoundSelect";

export default function PrepaymentDeposit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get("subscriptionId");

  const [paymentInfo, setPaymentInfo] =
    useState<SubscriptionPaymentInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [amount, setAmount] = useState<number | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [showAmountPad, setShowAmountPad] = useState(false);

  const isDisabled = !amount || !round || !paymentInfo;

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
    setAmount(nextAmount);
    setShowAmountPad(false);
  };

  const handleSubmit = () => {
    if (!amount || !round || !subscriptionId || !paymentInfo) return;

    sessionStorage.setItem(
      "prepayment",
      JSON.stringify({
        subscriptionId: Number(subscriptionId),
        amount,
        prepaymentCount: round,
      }),
    );

    router.push("/subscription/prepayment/password");
  };

  if (isLoading) {
    return (
      <main className="flex h-dvh items-center justify-center bg-white">
        로딩 중...
      </main>
    );
  }

  if (!paymentInfo) {
    return (
      <main className="flex h-dvh items-center justify-center bg-white">
        납입 정보를 불러올 수 없습니다.
      </main>
    );
  }

  if (showAmountPad) {
    return (
      <TransferAmount
        accountHolder={paymentInfo?.displayName ?? "청약 납입"}
        accountNickname={paymentInfo?.accountNickname ?? "청약 계좌"}
        balance={paymentInfo?.balance ?? 0}
        onNext={handleNextStep}
      />
    );
  }

  return (
    <main className="flex h-dvh flex-col bg-[#F6F7F8]">
      <div className="flex-1 overflow-y-auto">
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

          <section className="mt-10">
            <PaymentRoundSelect value={round} onChange={setRound} />
          </section>

          <section className="mt-10">
            <p className="text-xl font-bold text-brand-black">
              납입회차 입력 안내
            </p>

            <ul className="mt-4 space-y-2 text-base font-medium leading-5 text-[#5E6976]">
              <li>
                · 50만원을 입금하면서 월 10만원씩 5회차로 나누어 입금을 원하는
                경우 납입회차를 ‘5회’로 입력해 주세요.
              </li>
              <li>
                · 최종납입회차가 2회일 경우 납입회차로 5회로 납입하면
                최종납입회차는 7회가 됩니다.
              </li>
            </ul>
          </section>
        </div>

        <section className="px-5 pt-4 pb-4">
          <GuideSection />
        </section>

        <div className="h-28" />
      </div>

      <div className="shrink-0 bg-[#F6F7F8] px-5 pb-6 pt-3">
        <Button
          size="L"
          variant={isDisabled ? "disabled" : "active"}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </main>
  );
}
