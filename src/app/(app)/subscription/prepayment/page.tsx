"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubscriptionPaymentInfoResponse } from "@/app/api/subscriptions/type";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import { apiClient } from "@/common/lib/api/api-client";
import type { ApiResponse } from "@/common/lib/api/types";

export default function PrepaymentHome() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get("subscriptionId");

  const [paymentInfo, setPaymentInfo] =
    useState<SubscriptionPaymentInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handlePensionDeposit = () => {
    router.push("/wallet");
  };

  const handleSubscriptionDeposit = () => {
    if (!subscriptionId) return;
    router.push(
      `/subscription/prepayment/deposit?subscriptionId=${subscriptionId}`,
    );
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white" />
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header type="sub" title="청약 납입하기" />

      <section className="px-5 mt-10 flex flex-col items-center text-center">
        <div className="w-full max-w-37.5">
          <Image
            src="/svg/ic_house.svg"
            alt="선납 홈 집 이미지"
            width={150}
            height={150}
            priority
            className="h-auto w-full"
          />
        </div>

        <h1 className="mt-10 text-xl font-semibold leading-8 text-brand-black">
          이번 달 {paymentInfo?.displayName ?? "아이"} 청약에
          <br />
          {(paymentInfo?.alreadyPaidAmount ?? 0).toLocaleString()}원이 이미
          입금되었어요.
        </h1>

        <p className="mt-4 text-xl font-semibold text-brand-black">
          추가로 입금할까요?
        </p>
      </section>

      <section className="mt-18 px-5 flex flex-col gap-3">
        <Button size="L" variant="active" onClick={handlePensionDeposit}>
          내 연금 계좌에 넣을래요
        </Button>

        <Button
          size="L"
          variant="purpleOutline"
          onClick={handleSubscriptionDeposit}
        >
          선납할래요
        </Button>
      </section>

      <section className="mt-8 -mx-5 px-9 bg-[#F6F7F8] py-4 text-left">
        <p className="mb-3.5 mt-4 text-xl font-semibold leading-6 text-brand-black">
          납입회차는 국민주택 청약 시 순위 산정과 관련이 있습니다.
        </p>

        <ul className="space-y-2 text-base font-medium leading-6 text-[#777777]">
          <li>
            · 1회차당 납입 금액은 최저 2만원부터 최고 50만원까지 10원 단위로
            입금 가능합니다. 단, 계좌 잔액이 1,500만원에 도달할 때까지는 회차당
            최고 1,500만원까지 입금 가능합니다.
          </li>
          <li>
            · 국민주택 등에 청약 시 회차별 입금액은 25만원을 초과하여도 25만원만
            인정되며, 동일 순위 경쟁 시 회차별 입금액이 많은 계좌가 청약에
            유리합니다.
          </li>
          <li>
            · 미리 납부(선납)한 경우는 24회까지만 가능하지만 청약순위는 해당
            회차가 인정되는 일자에 도달하여야 발생합니다.
          </li>
          <li>
            · 수도권 외 지역의 일부 주택에 대해서는 시도지사의 승인이 따라 1순위
            요건이 3회로 완화되오니, 회차수 입력시 주의하시기 바랍니다. (납입
            인정회차로 인정됨)
          </li>
        </ul>
      </section>
    </main>
  );
}
